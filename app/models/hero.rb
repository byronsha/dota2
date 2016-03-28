class Hero < ActiveRecord::Base
  has_many :players

  def abilities
    name = self.name == "Anti-Mage" ? "Antimage" : self.name
    Ability.where("full_name LIKE ?", "#{name}%")
  end

  def winrate
    ((radiant_wins + dire_wins).to_f / games_played.to_f * 100).round(2)
  end

  def radiant_wins
    wins_on_team("radiant")
  end

  def dire_wins
    wins_on_team("dire")
  end

  def wins_on_team(team)
    wins = Player.find_by_sql(["
      SELECT p.id
      FROM players p
      JOIN matches m
      ON p.match_id = m.id
      WHERE p.team = ?
      AND p.hero_id = ?
      AND m.winner = ?",
      team, self.id, team
    ]).count
  end

  def games_played
    Match.has_hero(self.id).count
  end

  def allied_wins
    wins = Player.find_by_sql(["
      SELECT h2.name, COUNT(*) as wins
      FROM players p1
      JOIN players p2 ON p1.match_id = p2.match_id
      JOIN matches m ON p1.match_id = m.id
      JOIN heros h1 ON p1.hero_id = h1.id
      JOIN heros h2 ON p2.hero_id = h2.id
      WHERE h1.id = ?
        AND p1.team = p2.team
        AND p1.id <> p2.id
        AND m.winner = p1.team
      GROUP BY h1.name, h2.name
      ORDER BY wins DESC",
      self.id
    ])

    wins_hash = {}
    wins.each do |win|
      wins_hash[win["name"]] = win["wins"]
    end
    wins_hash
  end

  def allied_losses
    losses = Player.find_by_sql(["
      SELECT h2.name, COUNT(*) as losses
      FROM players p1
      JOIN players p2 ON p1.match_id = p2.match_id
      JOIN matches m ON p1.match_id = m.id
      JOIN heros h1 ON p1.hero_id = h1.id
      JOIN heros h2 ON p2.hero_id = h2.id
      WHERE h1.id = ?
        AND p1.team = p2.team
        AND p1.id <> p2.id
        AND m.winner <> p1.team
      GROUP BY h1.name, h2.name
      ORDER BY losses DESC",
      self.id
    ])

    losses_hash = {}
    losses.each do |loss|
      losses_hash[loss["name"]] = loss["losses"]
    end
    losses_hash
  end

  def allied_win_loss
    wins = allied_wins
    losses = allied_losses
    heroes = wins.keys & losses.keys
    win_loss = []

    heroes.each do |hero|
      win_count = wins[hero] || 0
      loss_count = losses[hero] || 0
      win_loss << {
        hero: hero,
        wins: win_count,
        losses: loss_count,
        games: win_count + loss_count,
        winrate: (win_count.to_f / (win_count + loss_count).to_f * 100).round(2)
      }
    end

    win_loss.sort_by { |ally| ally[:winrate] }.reverse
  end

  def versus_wins
    wins = Player.find_by_sql(["
      SELECT h2.name, COUNT(*) as wins
      FROM players p1
      JOIN players p2 ON p1.match_id = p2.match_id
      JOIN matches m ON p1.match_id = m.id
      JOIN heros h1 ON p1.hero_id = h1.id
      JOIN heros h2 ON p2.hero_id = h2.id
      WHERE h1.id = ?
        AND p1.team <> p2.team
        AND p1.id <> p2.id
        AND m.winner = p1.team
      GROUP BY h1.name, h2.name
      ORDER BY wins DESC",
      self.id
    ])

    wins_hash = {}
    wins.each do |win|
      wins_hash[win["name"]] = win["wins"]
    end
    wins_hash
  end

  def versus_losses
    losses = Player.find_by_sql(["
      SELECT h2.name, COUNT(*) as losses
      FROM players p1
      JOIN players p2 ON p1.match_id = p2.match_id
      JOIN matches m ON p1.match_id = m.id
      JOIN heros h1 ON p1.hero_id = h1.id
      JOIN heros h2 ON p2.hero_id = h2.id
      WHERE h1.id = ?
        AND p1.team <> p2.team
        AND p1.id <> p2.id
        AND m.winner = p2.team
      GROUP BY h1.name, h2.name
      ORDER BY losses DESC",
      self.id
    ])

    losses_hash = {}
    losses.each do |loss|
      losses_hash[loss["name"]] = loss["losses"]
    end
    losses_hash
  end

  def versus_win_loss
    wins = versus_wins
    losses = versus_losses
    heroes = wins.keys & losses.keys
    win_loss = []

    heroes.each do |hero|
      win_count = wins[hero] || 0
      loss_count = losses[hero] || 0
      win_loss << {
        hero: hero,
        wins: win_count,
        losses: loss_count,
        games: win_count + loss_count,
        winrate: (win_count.to_f / (win_count + loss_count).to_f * 100).round(2)
      }
    end

    win_loss.sort_by { |ally| ally[:winrate] }.reverse
  end
end
