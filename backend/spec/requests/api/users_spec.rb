require 'rails_helper'

RSpec.describe 'Api::Users', type: :request do
  describe 'PATCH /api/profile' do
    let(:user) { create(:user) }

    before do
      allow(Cloudinary::Uploader).to receive(:upload).and_return({
                                                                   'secure_url' => 'http://test.com/avatar.png',
                                                                   'public_id' => 'user_2_avatar'
                                                                 })
    end

    it 'updates user profile with avatar' do
      avatar = Rack::Test::UploadedFile.new(
        Rails.root.join('spec/fixtures/files/avatar.png'),
        'image/png'
      )

      patch '/api/profile',
            params: {
              name: 'John Doe',
              avatar: avatar
            },
            headers: auth_headers(user),
            as: :multipart

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
