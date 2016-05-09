# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

api = Dota.api

key = "D4D36275652E46A3909DE1A8FB759901"
#
#
# Hero.destroy_all
# heroes_url = URI.parse("https://api.steampowered.com/IEconDOTA2_570/GetHeroes/v0001/?key=" + key + "&language=en_us")
# heroes_response = Net::HTTP::get(heroes_url)
# heroes = JSON.load(heroes_response)['result']['heroes']
#
# heroes.each do |hero|
#   Hero.create(id: hero["id"], name: hero["localized_name"], image_url: hero["name"][14..-1])
# end
#
#
Item.destroy_all
ActiveRecord::Base.connection.reset_pk_sequence!('items')
items_url = URI.parse("https://api.steampowered.com/IEconDOTA2_570/GetGameItems/V001/?key=" + key + "&language=en")
items_response = Net::HTTP::get(items_url)
items = JSON.load(items_response)['result']['items']

items.each do |item|
  Item.create(id: item["id"], name: item["localized_name"], cost: item["cost"], secret_shop: item["secret_shop"], side_shop: item["side_shop"], recipe: item["recipe"], image_url: item["name"][5..-1])
end


Ability.destroy_all
ActiveRecord::Base.connection.reset_pk_sequence!('abilities')
abilities = api.abilities

abilities.each do |ability|
  Ability.create(id: ability.id, name: ability.name, full_name: ability.full_name, image_url: ability.image_url)
end
#
#

# Match.delete_all
# Player.delete_all
# PlayerItem.delete_all
# PlayerAbility.delete_all
# Unit.delete_all
# UnitItem.delete_all

# matches = api.matches(mode_id: 1, skill_level: 3, min_players: 10, limit: 100)
# @match_ids = []
# @match_details = []
#
# matches.each do |match|
#   @match_ids << match.id
# end
#
# @match_ids.each do |match_id|
#   @match_details << api.get("IDOTA2Match_570", "GetMatchDetails", match_id: match_id)["result"]
#   # @match_details << api.matches(match_id)
# end
#
# # p @match_details
#
# @match_details.each do |match_detail|
#   if Match.find_by_steam_match_id(match_detail["match_id"]).nil?
#     unless match_detail["players"].any? { |player| player["hero_id"] == 0 }
#       @new_match = Match.create(
#         steam_match_id: match_detail["match_id"],
#         league_id: match_detail["leagueid"],
#         match_type: Dota::API::Match::TYPES[match_detail["lobby_type"]],
#         type_id: match_detail["lobby_type"],
#         mode: Dota::API::Match::MODES[match_detail["game_mode"]],
#         mode_id: match_detail["game_mode"],
#         sequence: match_detail["match_seq_num"],
#         season: "6.86",
#         cluster: match_detail["cluster"],
#         starts_at: match_detail["start_time"],
#         first_blood: match_detail["first_blood_time"],
#         duration: match_detail["duration"],
#         winner: match_detail["radiant_win"] ? "radiant" : "dire",
#         positive_votes: match_detail["positive_votes"],
#         negative_votes: match_detail["negative_votes"],
#         players_count: match_detail["human_players"]
#       )
#
#       match_detail["players"].each do |player|
#         @new_player = Player.create(
#           steam_id: player["account_id"],
#           match_id: @new_match.id,
#           hero_id: player["hero_id"],
#           team: player["player_slot"] > 100 ? "dire" : "radiant",
#           slot: player["player_slot"],
#           level: player["level"],
#           kills: player["kills"],
#           deaths: player["deaths"],
#           assists: player["assists"],
#           last_hits: player["last_hits"],
#           denies: player["denies"],
#           gold: player["gold"],
#           gpm: player["gold_per_min"],
#           xpm: player["xp_per_min"],
#           status: player["leaver_status"],
#           gold_spent: player["gold_spent"],
#           hero_damage: player["hero_damage"],
#           tower_damage: player["tower_damage"],
#           hero_healing: player["hero_healing"]
#         )
#
#         PlayerItem.create(player_id: @new_player.id, item_id: player["item_0"])
#         PlayerItem.create(player_id: @new_player.id, item_id: player["item_1"])
#         PlayerItem.create(player_id: @new_player.id, item_id: player["item_2"])
#         PlayerItem.create(player_id: @new_player.id, item_id: player["item_3"])
#         PlayerItem.create(player_id: @new_player.id, item_id: player["item_4"])
#         PlayerItem.create(player_id: @new_player.id, item_id: player["item_5"])
#
#         if player["ability_upgrades"]
#           player["ability_upgrades"].each do |ability|
#             PlayerAbility.create(player_id: @new_player.id, ability_id: ability["ability"], time: ability["time"], level: ability["level"])
#           end
#         end
#
#         if player["additional_units"]
#           player["additional_units"].each do |unit|
#             @new_unit = Unit.create(player_id: @new_player.id, name: unit["unitname"])
#
#             UnitItem.create(unit_id: @new_unit.id, item_id: unit["item_0"])
#             UnitItem.create(unit_id: @new_unit.id, item_id: unit["item_1"])
#             UnitItem.create(unit_id: @new_unit.id, item_id: unit["item_2"])
#             UnitItem.create(unit_id: @new_unit.id, item_id: unit["item_3"])
#             UnitItem.create(unit_id: @new_unit.id, item_id: unit["item_4"])
#             UnitItem.create(unit_id: @new_unit.id, item_id: unit["item_5"])
#           end
#         end
#       end
#
#
#       p '+++++ ' + match_detail["match_id"].to_s + ' saved +++++'
#     end
#   else
#     p '----- ' + match_detail["match_id"].to_s + ' skipped -----'
#   end
# end
