FEELING_NAMES = %w[
  joyful down anxious calm excited frustrated
  lonely grateful overwhelmed motivated irritated
  peaceful tired hopeful confident stressed content
  disappointed optimistic restless
].freeze

FactoryBot.define do
  factory :feeling do
    name { FEELING_NAMES.sample }
  end
end
