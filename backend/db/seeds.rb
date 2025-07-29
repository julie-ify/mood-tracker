# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

user = User.first

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
  mood: :very_happy,
  sleep: :nine_plus,
  reflection: 'Feeling great today',
  feeling_ids: [db_feelings.sample.id, db_feelings.sample.id, db_feelings.sample.id],
)

# Checkin.create!(
#   user: user,
#   mood: :very_happy,
#   sleep: :nine_plus,
#   reflection: 'Feeling great today',
#   feeling_ids: [db_feelings.sample.id, db_feelings.sample.id, db_feelings.sample.id],
#   created_at: 1.day.ago,
#   updated_at: 1.day.ago
# )

# Checkin.create!(
#   user: user,
#   mood: :very_happy,
#   sleep: :nine_plus,
#   reflection: 'Feeling great today',
#   feeling_ids: [db_feelings.sample.id, db_feelings.sample.id, db_feelings.sample.id],
#   created_at: 2.days.ago,
#   updated_at: 2.days.ago
# )

# Checkin.create!(
#   user: user,
#   mood: :very_sad,
#   sleep: :zero_two,
#   reflection: 'Feeling very low today',
#   feeling_ids: [db_feelings.sample.id, db_feelings.sample.id, db_feelings.sample.id],
#   created_at: 3.days.ago,
#   updated_at: 3.days.ago
# )
# Checkin.create!(
#   user: user,
#   mood: :happy,
#   sleep: :seven_eight,
#   reflection: 'Felt productive and calm today',
#   feeling_ids: [db_feelings.sample.id, db_feelings.sample.id, db_feelings.sample.id],
#   created_at: 4.days.ago,
#   updated_at: 4.days.ago
# )

# Checkin.create!(
#   user: user,
#   mood: :sad,
#   sleep: :three_four,
#   reflection: 'Feeling week today',
#   feeling_ids: [db_feelings.sample.id, db_feelings.sample.id, db_feelings.sample.id],
#   created_at: 5.days.ago,
#   updated_at: 5.days.ago
# )
# Checkin.create!(
#   user: user,
#   mood: :neutral,
#   sleep: :five_six,
#   reflection: 'Felt neutral today, not too bad',
#   feeling_ids: [db_feelings.sample.id, db_feelings.sample.id, db_feelings.sample.id],
#   created_at: 6.days.ago,
#   updated_at: 6.days.ago
# )
