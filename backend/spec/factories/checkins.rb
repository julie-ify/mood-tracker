FactoryBot.define do
  factory :checkin do
    user
    mood { Checkin.moods.keys.sample } # e.g., "happy", "sad"
    sleep { Checkin.sleeps.keys.sample } # e.g., "five_six"
    reflection { Faker::Lorem.sentence }
  end
end
