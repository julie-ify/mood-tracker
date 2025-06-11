FEELING_NAMES = %w[
  JoyFul Down Anxious Calm Excited Frustrated
  Lonely Grateful Overwhelmed Motivated Irritable
  Peaceful Tired Hopeful Confident Stressed Content
  Disappointed Optimistic Restless
].freeze
FactoryBot.define do
  factory :feeling do
    name { FEELING_NAMES.sample }
  end
end
