class UnitItem < ActiveRecord::Base
  belongs_to :player
  belongs_to :item
end
