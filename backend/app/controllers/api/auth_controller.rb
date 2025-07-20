class Api::AuthController < ApplicationController
  api :POST, '/signup', 'Register a new user'
  param :name, String, desc: "User's full name", required: true
  param :email, String, desc: 'Email address', required: true
  param :password, String, desc: 'Password', required: true
  param :avatar, ActionDispatch::Http::UploadedFile, desc: 'User avatar', required: false
  example ApipieExamples.load_example('auth.yml')
  def signup
    user = User.new(user_params.except(:avatar))

    if user.save
      token = AuthenticationService.encode({ user_id: user.id })
      if params[:avatar].present?
        upload = AvatarUploadService.upload(io: params[:avatar], user: user)
        user.update(avatar_url: upload['secure_url'], avatar_public_id: upload['public_id'])
      end

      render json: { user: Api::AuthSerializer.new(user), token: token }, status: :created
    else
      render json: { errors: user.errors }, status: :unprocessable_entity
    end
  end

  api :POST, '/login', 'Login a user'
  param :email, String, desc: 'Email address', required: true
  param :password, String, desc: 'Password', required: true
  example ApipieExamples.load_example('auth.yml')
  def login
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      token = AuthenticationService.encode({ user_id: user.id })

      render json: { user: Api::AuthSerializer.new(user), token: token }, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  private

  def user_params
    params.permit(:email, :name, :password, :avatar)
  end
end
