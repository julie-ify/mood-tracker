class User < ApplicationRecord
  has_secure_password
  has_many :checkins, dependent: :destroy

  before_validation :downcase_email, :normalize_name

  validates :name, presence: true, length: { minimum: 3 }
  validates :password, presence: true, length: { in: 6..20 }, on: :create
  validates :email, presence: true, uniqueness: { case_sensitive: false },
                    format: { with: URI::MailTo::EMAIL_REGEXP } # Built-in regex for valid email structure

  private

  def downcase_email
    self.email = email.downcase if email.present?
  end

  def normalize_name
    return if name.blank?

    self.name = name.squish.titleize
  end
end
