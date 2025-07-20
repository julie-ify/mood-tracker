class Api::CheckinsController < ApplicationController
  before_action :authenticate_user!

  api :GET, '/checkins', 'Get all check-ins for the current user'
  description 'Returns a list of check-ins for the current user.'
  example ApipieExamples.load_example('checkins_index.yml')
  def index
    checkins = current_user.checkins.includes(:feelings)
    render json: checkins, each_serializer: Api::CheckinSerializer, status: :ok
  end

  api :GET, '/checkins/:id', 'Get a single check-in for the current user'
  param :id, :number, desc: 'ID of the check-in', required: true
  example ApipieExamples.load_example('checkins_show.yml')
  def show
    checkin = current_user.checkins.find_by(id: params[:id])

    if checkin
      render json: checkin, status: :ok
    else
      render json: { error: 'Checkin not found' }, status: :not_found
    end
  end
end
