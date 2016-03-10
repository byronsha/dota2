class Item < ActiveRecord::Base
  has_many :player_items
  has_many :unit_items
end
