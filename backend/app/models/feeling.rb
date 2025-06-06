class Feeling < ApplicationRecord
  has_and_belongs_to_many :checkins, join_table: :checkins_feelings
end
