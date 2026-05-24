class Feeling < ApplicationRecord
  has_and_belongs_to_many :checkins, through: 'checkins_feelings'

  validates :name, presence: true
end
