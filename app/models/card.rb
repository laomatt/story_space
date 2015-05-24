class Card < ActiveRecord::Base
  belongs_to :deck
  belongs_to :user
  has_many :card_relationships
  has_many :comments
end
