class Api::StatisticsController < ApplicationController
  def index
    @statistics = {}

    heroes = hero_games.keys
    @statistics["games_played"] = []
    heroes.each do |hero|
      @statistics["games_played"] << {
        hero: hero,
        games: hero_games[hero]
      }
    end

    heroes = hero_wins.keys
    @statistics["winrates"] = []
    heroes.each do |hero|
      @statistics["winrates"] << {
        hero: hero,
        wins: hero_wins[hero],
        losses: hero_games[hero] - hero_wins[hero],
        winrate: (hero_wins[hero].to_f / hero_games[hero].to_f * 100).round(2)
      }
    end

    @statistics["winrates"] = @statistics["winrates"].sort_by { |hero| hero[:winrate] }.reverse
  end

  def hero_games
    heroes = Player.find_by_sql(["
      SELECT h.name, COUNT(*) as games
      FROM players p
      JOIN heros h ON p.hero_id = h.id
      GROUP BY p.hero_id, h.name
      ORDER BY games DESC"
    ])

    heroes_hash = {}
    heroes.each do |hero|
      heroes_hash[hero["name"]] = hero["games"]
    end
    heroes_hash
  end

  def hero_wins
    heroes = Player.find_by_sql(["
      SELECT h.name, COUNT(*) as wins
      FROM players p
      JOIN heros h ON p.hero_id = h.id
      JOIN matches m ON p.match_id = m.id
      WHERE p.team = m.winner
      GROUP BY p.hero_id, h.name
      ORDER BY wins DESC"
    ])

    heroes_hash = {}
    heroes.each do |hero|
      heroes_hash[hero["name"]] = hero["wins"]
    end
    heroes_hash
  end
end
