class Checkin < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :feelings

  enum :mood, {
    very_happy: 0,
    happy: 1,
    neutral: 2,
    sad: 3,
    very_sad: 4
  }

  enum :sleep, {
    nine_plus: 0,
    seven_eight: 1,
    five_six: 2,
    three_four: 3,
    zero_two: 4
  }

  validates :mood, :sleep, presence: true
  validate :feelings_count_within_limit
  validate :valid_mood
  validate :valid_sleep

  private

  def feelings_count_within_limit
    if feelings.empty?
      errors.add(:feelings, 'must select at least 1 feeling')
    elsif feelings.size > 3
      errors.add(:feelings, 'cannot have more than 3 selected')
    end
  end

  def valid_mood
    return if mood.in?(Checkin.moods.keys)

    errors.add(:mood, 'is not a valid mood')
  end

  def valid_sleep
    return if sleep.in?(Checkin.sleeps.keys)

    errors.add(:sleep, 'is not a valid sleep')
  end
end
