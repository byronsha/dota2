class PlayerItem < ActiveRecord::Base
  belongs_to :match
  belongs_to :player
  belongs_to :item
end
