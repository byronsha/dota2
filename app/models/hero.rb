class Hero < ActiveRecord::Base
  has_many :players

  def abilities
    name = self.name == "Anti-Mage" ? "Antimage" : self.name
    Ability.where("full_name LIKE ?", "#{name}%")
  end

  def winrate
    ((radiant_wins + dire_wins).to_f / games_played.to_f * 100).to_s[0..4]
  end

  def radiant_wins
    Match.hero_won_side(self.id, "radiant").count
  end

  def dire_wins
    Match.hero_won_side(self.id, "dire").count
  end

  def games_played
    Match.has_hero(self.id).count
  end
end
