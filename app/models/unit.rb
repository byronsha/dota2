class Unit < ActiveRecord::Base
  belongs_to :player
  has_many :unit_items
  has_many :items, through: :unit_items, source: :item
end
