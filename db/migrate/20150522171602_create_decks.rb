class CreateDecks < ActiveRecord::Migration
  def change
    create_table :decks do |t|
      t.string :name
      t.text :story
      t.string :category
      t.string :setting
      t.references :user
      t.timestamps null: false
    end
  end
end
