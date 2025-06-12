class Api::AuthController < ApplicationController
  def signup
    user = User.new(user_params.except(:avatar))

    if user.save
      token = AuthenticationService.encode({ user_id: user.id })
      if params[:avatar].present?
        upload = AvatarUploadService.upload(io: params[:avatar], user: user)
        user.update(avatar_url: upload['secure_url'], avatar_public_id: upload['public_id'])
      end

      render json: { user: user, token: token }, status: :created
    else
      render json: { errors: user.errors }, status: :unprocessable_entity
    end
  end

  def login
    user = User.find_by(email: params[:email])

    Rails.logger.debug user

    if user&.authenticate(params[:password])
      token = AuthenticationService.encode({ user_id: user.id })

      render json: { user: user, token: token }
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  private

  def user_params
    params.permit(:email, :name, :password, :avatar)
  end
end
