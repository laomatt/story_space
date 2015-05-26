class AddArchetypeToCards < ActiveRecord::Migration
  def change
  archs = ['Lead Male', 'Lead Female', 'Comedian', 'Villain', 'Hero', 'Crusader', 'Weasel', 'Coward', 'Old-Master', 'Wiseman','Kid','Romantic','Sap','Geek','Loner','Omega','Bully']
    add_column :cards, :archetype, :string, default: archs.sample
  end
end
