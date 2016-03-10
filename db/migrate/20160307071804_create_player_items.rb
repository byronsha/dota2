class CreatePlayerItems < ActiveRecord::Migration
  def change
    create_table :player_items do |t|
      t.integer :player_id, null: false
      t.integer :item_id, null: false

      t.timestamps null: false
    end
    add_index :player_items, :player_id
    add_index :player_items, :item_id
  end
end
