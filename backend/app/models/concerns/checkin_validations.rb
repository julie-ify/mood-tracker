module CheckinValidations
  extend ActiveSupport::Concern

  included do
    validate :feelings_must_exist
    validate :feelings_count_within_limit
    validate :only_one_checkin_per_day
    validate :feelings_exit_in_database
  end

  private

  def feelings_must_exist
    return unless feelings.empty?

    errors.add(:feelings, :feelings_under_limit)
  end

  def feelings_exit_in_database
    return if feelings.all? { |feeling| Feeling.exists?(name: feeling.name) }

    errors.add(:feelings, :invalid_feelings)
  end

  def feelings_count_within_limit
    return unless feelings.size > 3

    errors.add(:feelings, :feelings_over_limit)
  end

  def only_one_checkin_per_day
    return if user_id.blank?

    existing = Checkin
      .where(user_id: user_id)
      .where.not(id: id)
      .exists?(['DATE(created_at) = ?', Time.zone.today])

    return unless existing

    errors.add(:created_at, :checkin_per_day)
  end
end
