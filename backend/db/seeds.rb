# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

puts "Started seeding ..."

User.create(
  name: "Mary Smith",
  email: "mary@m.com",
  password_digest: 'marysmith',
)


feelings = ['JoyFul', 'Down', 'Anxious', 'Calm', 'Excited', 'Frustrated',
  'Lonely', 'Grateful', 'Overwhelmed', 'Motivated', 'Irritable',
    'Peaceful', 'Tired', 'Hopeful', 'Confident', 'Stressed', 'Content', 
      'Disappointed', 'Optimistic', 'Restless' ]

feelings.each do |feeling|
  Feeling.create(name: feeling);
end


feeling1 = Feeling.find_by(name: "Anxious")
feeling2 = Feeling.find_by(name: "Excited")
feeling3 = Feeling.find_by(name: "Optimistic")


Checkin.create!(
  user: User.find(1),
  mood: :happy,
  sleep: :seven_eight,
  reflection: "Felt productive and calm today",
  feeling_ids: [feeling1.id, feeling2.id, feeling3.id]
)


puts "Finished seeding ..."