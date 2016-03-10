class CreateMatches < ActiveRecord::Migration
  def change
    create_table :matches do |t|
      t.integer :steam_match_id, limit: 8
      t.integer :league_id      # Integer, ID of the league this match was a part of
      t.string :match_type           # String, See Dota::API::Match::TYPES
      t.integer :type_id        # Integer, See Dota::API::Match::TYPES
      t.string :mode           # String, See Dota::API::Match::MODES
      t.integer :mode_id        # Integer, See Dota::API::Match::MODES
      t.integer :sequence, limit: 8       # Integer, A 'sequence number', representing the order in which matches were recorded
      t.string :season         # Integer, Season the match was played in
      t.integer :cluster        # Integer, Server cluster the match was played on
      t.string :starts_at      # Time, When the match started
      t.integer :first_blood    # Integer, Seconds since the match started when first blood occurred
      t.integer :duration       # Integer, Length of the match, in seconds since the match began
      t.string :winner         # Symbol, :radiant or :dire
      t.integer :positive_votes # Integer, Number of thumbs-up the game has received
      t.integer :negative_votes # Integer, Number of thumbs-down the game has received
      t.integer :players_count  # Integer, Number of players in the match

      t.timestamps null: false
    end
    add_index :matches, :steam_match_id, unique: true
  end
end
