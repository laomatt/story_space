class AddAvatarToCards < ActiveRecord::Migration
  def change
    add_column :cards, :avatar, :string, default: "http://images.clipartpanda.com/sad-girl-stick-figure-image.png"
  end
end
