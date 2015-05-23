class Card < ActiveRecord::Base
  belongs_to :deck
  has_many :card_relationships
  has_many :comments
end
