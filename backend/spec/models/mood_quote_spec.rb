require 'rails_helper'

RSpec.describe MoodQuote do
  it 'is valid with a mood' do
    mood_quote = build(:mood_quote)
    expect(mood_quote).to be_valid
  end

  it 'is invalid without a mood' do
    mood_quote = build(:mood_quote, mood: '')
    expect(mood_quote).not_to be_valid
  end
end
