class User < ApplicationRecord
  has_many :checkins, dependent: :destroy

  before_validation :downcase_email

  validates :name, presence: true
  validates :password_digest, presence: true, length: { in: 6..20 }, on: :create
  validates :email, presence: true, uniqueness: { case_sensitive: false },
                    format: { with: URI::MailTo::EMAIL_REGEXP } # Built-in regex for valid email structure

  private

  def downcase_email
    self.email = email.downcase if email.present?
  end
end
