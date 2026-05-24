require 'rails_helper'

RSpec.describe 'Api::Checkins', type: :request do
  let(:user) { create(:user) }
  let(:token) { auth_headers(user) }

  describe 'POST /api/checkins' do
    it 'creates a checkin with valid params' do
      mood = Checkin.moods.keys.first
      sleep = Checkin.sleeps.keys.first
      feelings = create_list(:feeling, 2).map(&:name)

      post '/api/checkins',
           params: {
             checkin: {
               mood: mood,
               sleep: sleep,
               reflection: 'Feeling good',
               feelings: feelings
             }
           },
           headers: token,
           as: :json

      expect(response).to have_http_status(:created)

      json = response.parsed_body

      expect(json['checkin']['mood']).to eq(mood)
      expect(json['checkin']['sleep']).to eq(sleep)
      expect(json['checkin']['feelings'].length).to eq(2)
    end

    it 'returns 400 when mood is missing' do
      post '/api/checkins',
           params: {
             checkin: {
               sleep: 'nine_plus',
               reflection: 'No mood',
               feelings: []
             }
           },
           headers: token,
           as: :json

      expect(response).to have_http_status(:bad_request)
    end

    it 'returns 400 when sleep is missing' do
      post '/api/checkins',
           params: {
             checkin: {
               mood: 'neutral',
               reflection: 'No sleep',
               feelings: []
             }
           },
           headers: token,
           as: :json

      expect(response).to have_http_status(:bad_request)
    end

    it 'returns 422 when feelings are invalid' do
      post '/api/checkins',
           params: {
             checkin: {
               sleep: 'nine_plus',
               mood: 'happy',
               reflection: 'Test',
               feelings: [123, true]
             }
           },
           headers: token,
           as: :json

      expect(response).to have_http_status(:unprocessable_entity)

      json = response.parsed_body
      expect(json['errors']).to be_present
    end

    it 'rejects unauthenticated user' do
      post '/api/checkins',
           params: {
             checkin: {
               sleep: 'nine_plus',
               mood: 'happy',
               reflection: 'No auth',
               feelings: []
             }
           },
           as: :json

      expect(response).to have_http_status(:unauthorized)
    end
  end
end
