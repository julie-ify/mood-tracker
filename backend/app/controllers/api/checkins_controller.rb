class Api::CheckinsController < ApplicationController
  before_action :authenticate_user!

  api :GET, '/checkins', 'Returns a list of check-ins for the current user.'
  example ApipieExamples.load_example('checkins_index.yml')

  def index
    render json: { user: Api::AuthSerializer.new(current_user) }, status: :ok
  end

  api :GET, '/checkins/:id', 'Get a single check-in for the current user'
  param :id, :number, desc: 'ID of the check-in', required: true
  example ApipieExamples.load_example('checkins_show.yml')

  def show
    checkin = current_user.checkins.find_by(id: params[:id])

    if checkin
      render json: checkin, status: :ok
    else
      render json: { error: { message: 'Checkin not found' } }, status: :not_found
    end
  end

  api :POST, '/checkins', 'Create a new check-in for the current user'
  param :checkin, Hash, desc: 'Check-in attributes', required: true do
    param :mood, Checkin.moods.keys, desc: 'Mood for the check-in', required: true
    param :sleep, Checkin.sleeps.keys, desc: 'Sleep quality for the check-in', required: true
    param :reflection, String, desc: 'Reflection for the check-in', required: false
    param :feelings, Array, of: String, in: Feeling.pluck(:name),
                            desc: 'Atmost 3 names of feelings associated with the check-in', required: false
  end
  example ApipieExamples.load_example('checkins_show.yml')

  def create
    unless checkin_params[:mood].present? && checkin_params[:sleep].present?
      render json: {
        error: 'Mood and sleep are required fields'
      }, status: :bad_request and return
    end

    validator = FeelingsValidator.new(checkin_params[:feelings])

    unless validator.valid?
      render json: {
        errors: validator.errors
      }, status: :unprocessable_entity and return
    end

    checkin = current_user.checkins.new(checkin_params.except(:feelings))

    checkin.feelings = Feeling.where(name: validator.normalized_feelings)

    if checkin.save
      render json: checkin, status: :created
    else
      render json: {
        errors: checkin.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private

  def checkin_params
    params.require(:checkin).permit(:mood, :sleep, :reflection, feelings: [])
  end
end
