class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :name, null: false
      t.integer :cost, null: false
      t.integer :secret_shop, null: false
      t.integer :side_shop, null: false
      t.integer :recipe, null: false
      t.string :image_url, null: false

      t.timestamps null: false
    end
  end
end
