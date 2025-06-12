# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

user = User.last

feelings = %w[JoyFul Down Anxious Calm Excited Frustrated
              Lonely Grateful Overwhelmed Motivated Irritable
              Peaceful Tired Hopeful Confident Stressed Content
              Disappointed Optimistic Restless]

feelings.each do |feeling|
  Feeling.create(name: feeling)
end

db_feelings = Feeling.all

Checkin.create!(
  user: user,
  mood: :happy,
  sleep: :seven_eight,
  reflection: 'Felt productive and calm today',
  feeling_ids: [db_feelings.sample.id, db_feelings.sample.id, db_feelings.sample.id],
  created_at: Time.zone.yesterday,
  updated_at: Time.zone.yesterday
)

Checkin.create!(
  user: user,
  mood: :sad,
  sleep: :zero_two,
  reflection: 'Feeling week today',
  feeling_ids: [db_feelings.sample.id, db_feelings.sample.id, db_feelings.sample.id]
)
