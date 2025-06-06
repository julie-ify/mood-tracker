class CreateMoodQuotes < ActiveRecord::Migration[7.1]
  def change
    create_table :mood_quotes do |t|
      t.integer :mood, null: false
      t.text :quote
      t.string :author
      t.timestamps
    end
  end
end
