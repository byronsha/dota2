json.array! @matches do |match|
  json.id match.id
  json.steam_match_id match.steam_match_id
  json.league match.league_id
  json.match_type match.match_type
  json.mode match.mode
  json.sequence match.sequence
  json.season match.season
  json.cluster match.cluster
  json.start_time match.starts_at
  json.first_blood match.first_blood
  json.duration match.duration
  json.winner match.winner

  json.players match.players do |player|
    json.id player.id
    json.steam_id player.steam_id
    json.hero_id player.hero_id

    json.hero_name player.hero.name
    json.hero_image_url player.hero.image_url

    json.team player.team
    json.slot player.slot
    json.level player.level
    json.kills player.kills
    json.deaths player.deaths
    json.assists player.assists
    json.last_hits player.last_hits
    json.denies player.denies
    json.gold player.gold
    json.gpm player.gpm
    json.xpm player.xpm
    json.status player.status
    json.gold_spent player.gold_spent
    json.hero_damage player.hero_damage
    json.tower_damage player.tower_damage
    json.hero_healing player.hero_healing

    # json.items player.items do |item|
    #   json.id item.id
    #   json.name item.name
    #   json.image_url item.image_url
    # end
    #
    # if player.units
    #   json.units player.units do |unit|
    #     json.name unit.name
    #
    #     json.items unit.items do |item|
    #       json.id item.id
    #       json.name item.name
    #       json.image_url item.image_url
    #     end
    #   end
    # end
  end

  # json.dire match.dire do |player|
  #   json.steam_id player.steam_id
  #   json.hero_id player.hero_id
  #
  #   json.hero_name player.hero.name
  #   json.hero_image_url player.hero.image_url
  #
  #   json.team player.team
  #   json.slot player.slot
  #   json.level player.level
  #   json.kills player.kills
  #   json.deaths player.deaths
  #   json.assists player.assists
  #   json.last_hits player.last_hits
  #   json.denies player.denies
  #   json.gold player.gold
  #   json.gpm player.gpm
  #   json.xpm player.xpm
  #   json.status player.status
  #   json.gold_spent player.gold_spent
  #   json.hero_damage player.hero_damage
  #   json.tower_damage player.tower_damage
  #   json.hero_healing player.hero_healing
  #
  #   json.items player.items do |item|
  #     json.id item.id
  #     json.name item.name
  #     json.image_url item.image_url
  #   end
  #
  #   if player.units
  #     json.units player.units do |unit|
  #       json.name unit.name
  #
  #       json.items unit.items do |item|
  #         json.id item.id
  #         json.name item.name
  #         json.image_url item.image_url
  #       end
  #     end
  #   end
  # end
end
