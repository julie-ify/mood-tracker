class CreateJoinTableCheckinsFeelings < ActiveRecord::Migration[7.1]
  def change
    create_join_table :checkins, :feelings do |t|
      t.index [:checkin_id, :feeling_id], unique: true
      t.index [:feeling_id, :checkin_id]
    end
  end
end
