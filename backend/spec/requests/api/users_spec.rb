require 'rails_helper'

RSpec.describe 'Api::Users', type: :request do
  describe 'PATCH /profile' do
    let(:user) { create(:user) }

    it 'updates user profile with avatar' do
      patch '/api/profile',
            params: {
              name: 'John Doe',
              avatar: fixture_file_upload(
                Rails.root.join('spec/fixtures/files/avatar.png'),
                'image/png'
              )
            },
            headers: auth_headers(user)

      expect(response).to have_http_status(:ok)

      json = response.parsed_body

      expect(json['user']['name']).to eq('John Doe')
    end

    it 'does not update profile if user is not authenticated' do
      patch '/api/profile',
            params: {
              name: 'John Doe'
            }

      expect(response).to have_http_status(:unauthorized)
    end
  end
end
