class AddBioToUsers < ActiveRecord::Migration
  def change
    add_column :users, :bio, :text, default: "No bio yet"
  end
end
