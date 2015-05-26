class AddPublicToDecks < ActiveRecord::Migration
  def change
    add_column :decks, :public, :boolean, default: false
  end
end
