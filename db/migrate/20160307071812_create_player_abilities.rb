class CreatePlayerAbilities < ActiveRecord::Migration
  def change
    create_table :player_abilities do |t|
      t.integer :player_id, null: false
      t.integer :ability_id, null: false
      t.integer :time, null: false
      t.integer :level, null: false

      t.timestamps null: false
    end
    add_index :player_abilities, :player_id
    add_index :player_abilities, :ability_id
  end
end
