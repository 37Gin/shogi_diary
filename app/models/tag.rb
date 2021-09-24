class Tag < ApplicationRecord
  has_many :diaries, through: :diary_tags
  has_many :diary_tags
end
