FactoryBot.define do
  factory :mood_quote do
    mood { MoodQuote.moods.keys.sample }
  end
end
