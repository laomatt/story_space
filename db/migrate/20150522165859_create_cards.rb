class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :name
      t.string :bio
      t.string :setting
      t.string :tag_line
      t.integer :creator
      t.references :deck
      t.string :stories
      t.timestamps null: false
    end
  end
end
