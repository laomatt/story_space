class CreateCardRelationships < ActiveRecord::Migration
  def change
    create_table :card_relationships do |t|
      t.string :type_of_relation
      t.text :optional_description
      t.timestamps null: false
    end
  end
end
