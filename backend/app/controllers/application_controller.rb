class ApplicationController < ActionController::API
  rescue_from ArgumentError, with: :handle_invalid_enum

  private

  def handle_invalid_enum(exception)
    raise exception unless exception.message.match?(/is not a valid/)

    render json: { error: exception.message }, status: :unprocessable_entity

    # re-raise other ArgumentErrors
  end
end
