class Api::CheckinsController < ApplicationController
  before_action :authenticate_user!
  def index
    checkins = current_user.checkins.includes(:feelings)
    render json: checkins, each_serializer: Api::CheckinSerializer, status: :ok
  end

  def show
    checkin = current_user.checkins.find_by(id: params[:id])

    if checkin
      render json: checkin, status: :ok
    else
      render json: { error: 'Checkin not found' }, status: :not_found
    end
  end
end
