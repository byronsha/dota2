class Match < ActiveRecord::Base
  has_many :players

  def self.find_by_filters(filters)
    mode = filters["mode"] == "0" ? nil : filters["mode"].to_i

    hero_ids = filters["heroes"].map(&:to_i)
    radiant_ids = filters["radiant"].map(&:to_i)
    dire_ids = filters["dire"].map(&:to_i)

    match = Match

    if mode
      match = match.where('mode_id = ?', mode)
    end

    if !hero_ids.empty?
      radiant_match_ids = self.fetch_ids(hero_ids, "radiant")
      dire_match_ids = self.fetch_ids(hero_ids, "dire")
      match = match.where('id IN (?)', radiant_match_ids + dire_match_ids)
    end

    match
  end

  def self.fetch_ids(hero_ids, side)
    player_match_ids = []

    hero_ids.each do |id|
      players = Player.where('team = ? AND hero_id = ?', side, id)
      player_match_ids << players.map { |player| player.match_id }
    end

    i = 1
    match_ids = player_match_ids[0]

    while i < player_match_ids.length
      match_ids = match_ids & player_match_ids[i]
      i += 1
    end

    match_ids
  end

  def self.hero_won_side(hero_id, side)
    player_match_ids = []

    players = Player.where('team = ? AND hero_id = ?', side, hero_id)
    players.each do |player|
      if player.match.winner == player.team
        player_match_ids << player.match_id
      end
    end

    player_match_ids.uniq
  end

  def self.has_hero(hero_id)
    players = Player.where('hero_id = ?', hero_id)
    players.map { |player| player.match_id }
  end

  def radiant_hero_ids
    radiant.map { |player| player.hero_id }
  end

  def dire_hero_ids
    dire.map { |player| player.hero_id }
  end

  def radiant
    players = self.players.where("team = 'radiant'")
    players.sort_by { |player| player.hero.name }
  end

  def dire
    players = self.players.where("team = 'dire'")
    players.sort_by { |player| player.hero.name }
  end

  def self.fetch_from_api
    api = Dota.api

    matches = api.matches(mode_id: 1, skill_level: 3, min_players: 10, limit: 100)
    @match_ids = []
    @match_details = []

    matches.each do |match|
      @match_ids << match.id
    end

    @match_ids.each do |match_id|
      @match_details << api.get("IDOTA2Match_570", "GetMatchDetails", match_id: match_id)["result"]
    end

    @match_details.each do |match_detail|
      if Match.find_by_steam_match_id(match_detail["match_id"]).nil?
        unless match_detail["players"].any? { |player| player["hero_id"] == 0 }
          @new_match = Match.create(
            steam_match_id: match_detail["match_id"],
            league_id: match_detail["leagueid"],
            match_type: Dota::API::Match::TYPES[match_detail["lobby_type"]],
            type_id: match_detail["lobby_type"],
            mode: Dota::API::Match::MODES[match_detail["game_mode"]],
            mode_id: match_detail["game_mode"],
            sequence: match_detail["match_seq_num"],
            season: "6.86",
            cluster: match_detail["cluster"],
            starts_at: Time.at(match_detail["start_time"]),
            first_blood: match_detail["first_blood_time"],
            duration: match_detail["duration"],
            winner: match_detail["radiant_win"] ? "radiant" : "dire",
            positive_votes: match_detail["positive_votes"],
            negative_votes: match_detail["negative_votes"],
            players_count: match_detail["human_players"]
          )

          match_detail["players"].each do |player|
            @new_player = Player.create(
              steam_id: player["account_id"],
              match_id: @new_match.id,
              hero_id: player["hero_id"],
              team: player["player_slot"] > 100 ? "dire" : "radiant",
              slot: player["player_slot"],
              level: player["level"],
              kills: player["kills"],
              deaths: player["deaths"],
              assists: player["assists"],
              last_hits: player["last_hits"],
              denies: player["denies"],
              gold: player["gold"],
              gpm: player["gold_per_min"],
              xpm: player["xp_per_min"],
              status: player["leaver_status"],
              gold_spent: player["gold_spent"],
              hero_damage: player["hero_damage"],
              tower_damage: player["tower_damage"],
              hero_healing: player["hero_healing"]
            )

            PlayerItem.create(player_id: @new_player.id, item_id: player["item_0"])
            PlayerItem.create(player_id: @new_player.id, item_id: player["item_1"])
            PlayerItem.create(player_id: @new_player.id, item_id: player["item_2"])
            PlayerItem.create(player_id: @new_player.id, item_id: player["item_3"])
            PlayerItem.create(player_id: @new_player.id, item_id: player["item_4"])
            PlayerItem.create(player_id: @new_player.id, item_id: player["item_5"])

            if player["ability_upgrades"]
              player["ability_upgrades"].each do |ability|
                PlayerAbility.create(player_id: @new_player.id, ability_id: ability["ability"], time: ability["time"], level: ability["level"])
              end
            end

            if player["additional_units"]
              player["additional_units"].each do |unit|
                @new_unit = Unit.create(player_id: @new_player.id, name: unit["unitname"])

                UnitItem.create(unit_id: @new_unit.id, item_id: unit["item_0"])
                UnitItem.create(unit_id: @new_unit.id, item_id: unit["item_1"])
                UnitItem.create(unit_id: @new_unit.id, item_id: unit["item_2"])
                UnitItem.create(unit_id: @new_unit.id, item_id: unit["item_3"])
                UnitItem.create(unit_id: @new_unit.id, item_id: unit["item_4"])
                UnitItem.create(unit_id: @new_unit.id, item_id: unit["item_5"])
              end
            end
          end

          p '+++++ ' + match_detail["match_id"].to_s + ' saved +++++'
        end
      else
        p '----- ' + match_detail["match_id"].to_s + ' skipped -----'
      end
    end
  end
end
