class Hero < ActiveRecord::Base
  has_many :players

  def abilities
    name = self.name == "Anti-Mage" ? "Antimage" : self.name
    Ability.where("full_name LIKE ?", "#{name}%")
  end

  def winrate(patch)
    ((radiant_wins(patch) + dire_wins(patch)).to_f / games_played(patch).to_f * 100).round(2)
  end

  def radiant_wins(patch)
    wins_on_team("radiant", patch)
  end

  def dire_wins(patch)
    wins_on_team("dire", patch)
  end

  def wins_on_team(team, patch)
    query = "
      SELECT p.id
      FROM players p
      JOIN matches m
      ON p.match_id = m.id
      WHERE p.team = ?
      AND p.hero_id = ?
      AND m.winner = ?
    "

    if patch != "All"
      query += " AND m.season = ?"
      wins = Player.find_by_sql([query, team, self.id, team, patch]).count
    else
      wins = Player.find_by_sql([query, team, self.id, team]).count
    end
    wins
  end

  def games_played(patch)
    Player.find_by_sql(["
      SELECT m.id
      FROM players p
      JOIN matches m ON p.match_id = m.id
      WHERE p.hero_id = ?
        AND m.season = ?", self.id, patch
    ]).count
  end

  def allied_wins(patch)
    query = "
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
    "

    if patch != "All"
      query += " AND m.season = \'" + patch + "\'"
    end

    query += "
      GROUP BY h1.name, h2.name
      ORDER BY wins DESC
    "

    wins = Player.find_by_sql([query, self.id])

    wins_hash = {}
    wins.each do |win|
      wins_hash[win["name"]] = win["wins"]
    end
    wins_hash
  end

  def allied_losses(patch)
    query = "
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
    "

    if patch != "All"
      query += " AND m.season = \'" + patch + "\'"
    end

    query += "
      GROUP BY h1.name, h2.name
      ORDER BY losses DESC
    "

    losses = Player.find_by_sql([query, self.id])

    losses_hash = {}
    losses.each do |loss|
      losses_hash[loss["name"]] = loss["losses"]
    end
    losses_hash
  end

  def allied_win_loss(patch)
    wins = allied_wins(patch)
    losses = allied_losses(patch)
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

  def versus_wins(patch)
    query = "
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
    "

    if patch != "All"
      query += " AND m.season = \'" + patch + "\'"
    end

    query += "
      GROUP BY h1.name, h2.name
      ORDER BY wins DESC
    "

    wins = Player.find_by_sql([query, self.id])

    wins_hash = {}
    wins.each do |win|
      wins_hash[win["name"]] = win["wins"]
    end
    wins_hash
  end

  def versus_losses(patch)
    query = "
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
    "

    if patch != "All"
      query += " AND m.season = \'" + patch + "\'"
    end

    query += "
      GROUP BY h1.name, h2.name
      ORDER BY losses DESC
    "

    losses = Player.find_by_sql([query, self.id])

    losses_hash = {}
    losses.each do |loss|
      losses_hash[loss["name"]] = loss["losses"]
    end
    losses_hash
  end

  def versus_win_loss(patch)
    wins = versus_wins(patch)
    losses = versus_losses(patch)
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
