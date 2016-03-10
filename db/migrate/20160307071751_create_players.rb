class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.integer :steam_id, limit: 8
      t.integer :match_id, limit: 8
      t.integer :hero_id           # Dota::API::Hero || Dota::API::MissingHero, Player's hero
      t.string :team
      t.integer :slot              # Integer, (1-5)
      t.integer :level             # Integer, The player's level at match end
      t.integer :kills             # Integer, Number of kills attributed to this player
      t.integer :deaths            # Integer, Times this player died during the match
      t.integer :assists           # Integer, Number of assists the player got
      t.integer :last_hits         # Integer, Number of last-hits the player got
      t.integer :denies            # Integer, Number of denies the player got
      t.integer :gold              # Integer, Amount of gold the player had remaining at the end of the match
      t.integer :gpm               # Integer, Player's overall gold/minute
      t.integer :xpm               # Integer, Player's overall experience/minute

      # Additional methods in Match::Player
      t.string :status            # Symbol, :played, :left_safe, :abandoned, or :bot
      t.integer :gold_spent        # Integer, Amount of gold the player spent
      t.integer :hero_damage       # Integer, Amount of damage the player dealt to heroes
      t.integer :tower_damage      # Integer, Amount of damage the player dealt to towers
      t.integer :hero_healing      # Integer, Amount of health the player had healed on heroes

      t.timestamps null: false
    end
    add_index :players, :hero_id
  end
end
