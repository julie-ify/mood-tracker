class Api::UsersController < ApplicationController
  before_action :authenticate_user!

  api :PATCH, '/profile', 'Update user profile'
  param :name, String, desc: "User's full name", required: false
  param :avatar, ActionDispatch::Http::UploadedFile, desc: 'User avatar', required: false
  example ApipieExamples.load_example('profile_update.yml')

  def update
    attributes = {
      name: params[:name]
    }

    if params[:avatar].present?
      result = AvatarUploadService.upload(
        io: params[:avatar],
        user: current_user
      )

      unless result[:success]
        render json: { error: { message: result[:error] } }, status: :unprocessable_entity and return
      end

      upload = result[:data]

      attributes[:avatar_url] = upload['secure_url']
      attributes[:avatar_public_id] = upload['public_id']
    end

    if current_user.update(attributes.compact)
      render json: { user: Api::AuthSerializer.new(current_user) }, status: :ok
    else
      render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
