class CreatePassages < ActiveRecord::Migration
  def change
    create_table :passages do |t|
      t.references :deck
      t.references :user
      t.text :content
      t.timestamps null: false
    end
  end
end
