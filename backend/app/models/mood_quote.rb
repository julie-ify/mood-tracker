class MoodQuote < ApplicationRecord
  enum mood: {
    very_happy: 0,
    happy: 1,
    neutral: 2,
    sad: 3,
    very_sad: 4
  }

  validates :mood, presence: true
end
