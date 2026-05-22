module Support
  module AuthHelpers
    def auth_headers(user)
      token = AuthenticationService.encode(user_id: user.id)

      {
        'Authorization' => "Bearer #{token}"
      }
    end
  end
end
