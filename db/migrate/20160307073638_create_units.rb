class CreateUnits < ActiveRecord::Migration
  def change
    create_table :units do |t|
      t.integer :player_id, null: false
      t.string :name, null: false

      t.timestamps null: false
    end
    add_index :units, :player_id
  end
end
