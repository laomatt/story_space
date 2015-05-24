class Deck < ActiveRecord::Base
  belongs_to :user
  has_many :cards
  has_many :passages
end
