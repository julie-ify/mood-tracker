class MoodQuote < ApplicationRecord
  MOODS = {
    very_happy: 0,
    happy: 1,
    neutral: 2,
    sad: 3,
    very_sad: 4
  }.freeze

  enum :mood, MOODS
  validates :mood, presence: true
end
