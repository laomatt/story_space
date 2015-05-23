class Comment < ActiveRecord::Base
  belongs_to :card
  validates :user_id_hardcoded, {:presence=>true}
end
