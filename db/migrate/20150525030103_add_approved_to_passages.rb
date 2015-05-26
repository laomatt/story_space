class AddApprovedToPassages < ActiveRecord::Migration
  def change
    add_column :passages, :approved, :boolean, default: false
  end
end
