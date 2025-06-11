# app/models/concerns/checkin_validations.rb
module CheckinValidations
  extend ActiveSupport::Concern

  included do
    validate :feelings_count_within_limit
    validate :only_one_checkin_per_day
  end

  private

  def feelings_count_within_limit
    if feelings.empty?
      errors.add(:feelings, :feelings_under_limit)
    elsif feelings.size > 3
      errors.add(:feelings, :feelings_over_limit)
    end
  end

  def only_one_checkin_per_day
    existing = Checkin.where(user_id: user_id)
      .exists?(['DATE(created_at) = ?', Time.zone.today])

    return unless existing

    errors.add(:created_at, :checkin_per_day)
  end
end
