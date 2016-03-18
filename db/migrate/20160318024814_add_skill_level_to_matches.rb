class AddSkillLevelToMatches < ActiveRecord::Migration
  def change
    add_column :matches, :skill_level, :integer
  end
end
