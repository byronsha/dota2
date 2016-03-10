class CreateAbilities < ActiveRecord::Migration
  def change
    create_table :abilities do |t|
      t.string :name, null: false
      t.string :full_name, null: false
      t.string :image_url, null: false

      t.timestamps null: false
    end
  end
end
