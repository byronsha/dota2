class Api::StatisticsController < ApplicationController
  def index
    @statistics = {}
    patch = params[:patch]

    hero_games_hash = hero_games(patch)
    heroes = hero_games_hash.keys
    @statistics["games_played"] = []
    heroes.each do |hero|
      @statistics["games_played"] << {
        hero: hero,
        games: hero_games_hash[hero]
      }
    end

    hero_wins_hash = hero_wins(patch)
    heroes = hero_wins_hash.keys
    @statistics["winrates"] = []
    heroes.each do |hero|
      @statistics["winrates"] << {
        hero: hero,
        wins: hero_wins_hash[hero],
        losses: hero_games_hash[hero] - hero_wins_hash[hero],
        winrate: (hero_wins_hash[hero].to_f / hero_games_hash[hero].to_f * 100).round(2)
      }
    end

    @statistics["winrates"] = @statistics["winrates"].sort_by { |hero| hero[:winrate] }.reverse
  end

  def show
    @hero = Hero.find(params[:id])
    @statistics = {}

    @statistics["id"] = params[:id].to_i
    @statistics["name"] = @hero.name
    @statistics["radiant_wins"] = @hero.radiant_wins(params[:patch])
    @statistics["dire_wins"] = @hero.dire_wins(params[:patch])
    @statistics["games_played"] = @hero.games_played(params[:patch])
    @statistics["winrate"] = @hero.winrate(params[:patch])
    @statistics["allied_win_loss"] = @hero.allied_win_loss(params[:patch])
    @statistics["versus_win_loss"] = @hero.versus_win_loss(params[:patch])
  end

  def hero_games(patch)
    query = "
      SELECT h.name, COUNT(*) as games
      FROM players p
      JOIN heros h ON p.hero_id = h.id
      JOIN matches m on p.match_id = m.id
    "

    if patch != "All"
      query += " WHERE m.season = \'" + patch + "\'"
    end

    query += "
      GROUP BY p.hero_id, h.name
      ORDER BY games DESC
    "

    heroes = Player.find_by_sql([query])

    heroes_hash = {}
    heroes.each do |hero|
      heroes_hash[hero["name"]] = hero["games"]
    end
    heroes_hash
  end

  def hero_wins(patch)
    query = "
      SELECT h.name, COUNT(*) as wins
      FROM players p
      JOIN heros h ON p.hero_id = h.id
      JOIN matches m ON p.match_id = m.id
      WHERE p.team = m.winner
    "

    if patch != "All"
      query += " AND m.season = \'" + patch + "\'"
    end

    query += "
      GROUP BY p.hero_id, h.name
      ORDER BY wins DESC
    "

    heroes = Player.find_by_sql([query])

    heroes_hash = {}
    heroes.each do |hero|
      heroes_hash[hero["name"]] = hero["wins"]
    end
    heroes_hash
  end
end
