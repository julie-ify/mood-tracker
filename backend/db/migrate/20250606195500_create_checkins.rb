class CreateCheckins < ActiveRecord::Migration[7.1]
  def change
    create_table :checkins do |t|
      t.integer :mood, null: false
      t.integer :sleep, null: false
      t.text :reflection
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
