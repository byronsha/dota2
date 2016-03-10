class CreateUnitItems < ActiveRecord::Migration
  def change
    create_table :unit_items do |t|
      t.integer :unit_id, null: false
      t.integer :item_id, null: false

      t.timestamps null: false
    end
    add_index :unit_items, :unit_id
    add_index :unit_items, :item_id
  end
end
