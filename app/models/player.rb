class Player < ActiveRecord::Base
  belongs_to :match
  belongs_to :hero
  has_many :player_items
  has_many :items, through: :player_items, source: :item
  has_many :player_abilities
  has_many :units
end
