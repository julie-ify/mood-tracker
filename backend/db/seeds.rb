user = User.create(name: 'Jane', email: 'j@j.com', password: 'test1234')

feelings = %w[JoyFul Down Anxious Calm Excited Frustrated
              Lonely Grateful Overwhelmed Motivated Irritable
              Peaceful Tired Hopeful Confident Stressed Content
              Disappointed Optimistic Restless]

feelings.each do |feeling|
  Feeling.create(name: feeling)
end

db_feelings = Feeling.all

random_feelings = -> { db_feelings.sample(3).map(&:id) }

Checkin.create!(
  user: user,
  mood: :very_happy,
  sleep: :nine_plus,
  reflection: 'Feeling great today',
  feeling_ids: random_feelings.call
)

Checkin.create!(
  user: user,
  mood: :very_happy,
  sleep: :nine_plus,
  reflection: 'Feeling great today',
  feeling_ids: random_feelings.call,
  created_at: 1.day.ago,
  updated_at: 1.day.ago
)

Checkin.create!(
  user: user,
  mood: :very_happy,
  sleep: :nine_plus,
  reflection: 'Feeling great today',
  feeling_ids: random_feelings.call,
  created_at: 2.days.ago,
  updated_at: 2.days.ago
)

Checkin.create!(
  user: user,
  mood: :very_sad,
  sleep: :zero_two,
  reflection: 'Feeling very low today',
  feeling_ids: random_feelings.call,
  created_at: 3.days.ago,
  updated_at: 3.days.ago
)
Checkin.create!(
  user: user,
  mood: :happy,
  sleep: :seven_eight,
  reflection: 'Felt productive and calm today',
  feeling_ids: random_feelings.call,
  created_at: 4.days.ago,
  updated_at: 4.days.ago
)

Checkin.create!(
  user: user,
  mood: :sad,
  sleep: :three_four,
  reflection: 'Feeling week today',
  feeling_ids: random_feelings.call,
  created_at: 5.days.ago,
  updated_at: 5.days.ago
)
Checkin.create!(
  user: user,
  mood: :very_sad,
  sleep: :five_six,
  reflection: 'I slept well but feeling sad',
  feeling_ids: random_feelings.call,
  created_at: 6.days.ago,
  updated_at: 6.days.ago
)
