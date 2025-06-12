module Authentication
  extend ActiveSupport::Concern

  included do
    rescue_from AuthenticationService::UnauthorizedError, with: :unauthorized_response
  end

  def current_user
    @current_user ||= AuthenticationService.current_user(request)
  end

  def authenticate_user!
    AuthenticationService.authenticate_user!(request)
  end

  private

  def unauthorized_response
    render json: { error: 'Unauthorized' }, status: :unauthorized
  end
end
