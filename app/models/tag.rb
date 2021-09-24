class Tag < ApplicationRecord
  has_many :diaries, through: :diary_tag_relations
  has_many :diary_tag_relations
end
