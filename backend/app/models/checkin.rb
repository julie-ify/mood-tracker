class Checkin < ApplicationRecord
  include CheckinValidations

  belongs_to :user
  has_and_belongs_to_many :feelings

  MOODS = {
    very_happy: 0,
    happy: 1,
    neutral: 2,
    sad: 3,
    very_sad: 4
  }.freeze

  SLEEP_RANGES = {
    nine_plus: 0,
    seven_eight: 1,
    five_six: 2,
    three_four: 3,
    zero_two: 4
  }.freeze

  enum :mood, MOODS
  enum :sleep, SLEEP_RANGES

  validates :mood, inclusion: { in: moods.keys, message: :mood_invalid }
  validates :sleep, inclusion: { in: sleeps.keys, message: :sleep_invalid }
end
