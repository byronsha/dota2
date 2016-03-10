class Hero < ActiveRecord::Base
  has_many :players

  def abilities
    name = self.name == "Anti-Mage" ? "Antimage" : self.name
    Ability.where("full_name LIKE ?", "#{name}%")
  end
end
