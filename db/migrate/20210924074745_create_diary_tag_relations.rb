class CreateDiaryTagRelations < ActiveRecord::Migration[6.0]
  def change
    create_table :diary_tag_relations do |t|
      t.references :diary,  foreign_key: true
      t.references :tag,    foreign_key: true
      t.timestamps
    end
  end
end
