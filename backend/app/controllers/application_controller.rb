class ApplicationController < ActionController::API
  include Authentication
  include ApipieExamples

  rescue_from ArgumentError, with: :handle_invalid_enum

  private

  def handle_invalid_enum(exception)
    raise exception unless exception.message.match?(/is not a valid/)

    render json: { error: exception.message }, status: :unprocessable_entity
  end
end
