class PlayerAbility < ActiveRecord::Base
  belongs_to :player
  belongs_to :ability
end
