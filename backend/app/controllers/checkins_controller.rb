class CheckinsController < ApplicationController
  def index
    checkins = Checkin.where(user_id: 1)
    render json: checkins, status: :ok
  end

  def show
    checkin = Checkin.find_by(id: params[:id])

    if checkin
      render json: checkin, status: :ok
    else
      render json: { error: 'Checkin not found' }, status: :not_found
    end
  end
end
