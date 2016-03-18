# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160318024814) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "abilities", force: :cascade do |t|
    t.string   "name",       null: false
    t.string   "full_name",  null: false
    t.string   "image_url",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "heros", force: :cascade do |t|
    t.string   "name",       null: false
    t.string   "image_url",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "items", force: :cascade do |t|
    t.string   "name",        null: false
    t.integer  "cost",        null: false
    t.integer  "secret_shop", null: false
    t.integer  "side_shop",   null: false
    t.integer  "recipe",      null: false
    t.string   "image_url",   null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "matches", force: :cascade do |t|
    t.integer  "steam_match_id", limit: 8
    t.integer  "league_id"
    t.string   "match_type"
    t.integer  "type_id"
    t.string   "mode"
    t.integer  "mode_id"
    t.integer  "sequence",       limit: 8
    t.string   "season"
    t.integer  "cluster"
    t.string   "starts_at"
    t.integer  "first_blood"
    t.integer  "duration"
    t.string   "winner"
    t.integer  "positive_votes"
    t.integer  "negative_votes"
    t.integer  "players_count"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.integer  "skill_level"
  end

  add_index "matches", ["steam_match_id"], name: "index_matches_on_steam_match_id", unique: true, using: :btree

  create_table "player_abilities", force: :cascade do |t|
    t.integer  "player_id",  null: false
    t.integer  "ability_id", null: false
    t.integer  "time",       null: false
    t.integer  "level",      null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "player_abilities", ["ability_id"], name: "index_player_abilities_on_ability_id", using: :btree
  add_index "player_abilities", ["player_id"], name: "index_player_abilities_on_player_id", using: :btree

  create_table "player_items", force: :cascade do |t|
    t.integer  "player_id",  null: false
    t.integer  "item_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "player_items", ["item_id"], name: "index_player_items_on_item_id", using: :btree
  add_index "player_items", ["player_id"], name: "index_player_items_on_player_id", using: :btree

  create_table "players", force: :cascade do |t|
    t.integer  "steam_id",     limit: 8
    t.integer  "match_id",     limit: 8
    t.integer  "hero_id"
    t.string   "team"
    t.integer  "slot"
    t.integer  "level"
    t.integer  "kills"
    t.integer  "deaths"
    t.integer  "assists"
    t.integer  "last_hits"
    t.integer  "denies"
    t.integer  "gold"
    t.integer  "gpm"
    t.integer  "xpm"
    t.string   "status"
    t.integer  "gold_spent"
    t.integer  "hero_damage"
    t.integer  "tower_damage"
    t.integer  "hero_healing"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "players", ["hero_id"], name: "index_players_on_hero_id", using: :btree

  create_table "unit_items", force: :cascade do |t|
    t.integer  "unit_id",    null: false
    t.integer  "item_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "unit_items", ["item_id"], name: "index_unit_items_on_item_id", using: :btree
  add_index "unit_items", ["unit_id"], name: "index_unit_items_on_unit_id", using: :btree

  create_table "units", force: :cascade do |t|
    t.integer  "player_id",  null: false
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "units", ["player_id"], name: "index_units_on_player_id", using: :btree

end
