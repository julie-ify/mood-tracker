class Feeling < ApplicationRecord
  has_and_belongs_to_many :checkins

  validates :name, presence: true
end
