class AuthenticationService
  SECRET_KEY = ENV.fetch('JWT_SECRET_KEY', nil)

  def self.encode(payload, exp = 2.minutes.from_now.to_i)
    payload[:exp] = exp.to_i
    JWT.encode(payload, SECRET_KEY)
  end

  def self.decode(token)
    body = JWT.decode(token, SECRET_KEY, true, algorithm: 'HS256')[0]

    # Implements a hash where keys :foo and "foo" are considered to be the same.
    ActiveSupport::HashWithIndifferentAccess.new(body)
  rescue JWT::DecodeError
    nil
  end

  def self.current_user(request)
    header = request.headers['Authorization']
    return nil unless header&.starts_with?('Bearer ')

    token = header.split.last
    decoded = decode(token)
    return nil unless decoded

    User.find_by(id: decoded[:user_id])
  end

  def self.authenticate_user!(request)
    user = current_user(request)
    raise UnauthorizedError, 'You must be logged in' unless user

    user
  end

  class UnauthorizedError < StandardError; end
end
