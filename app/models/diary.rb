class Diary < ApplicationRecord
  belongs_to :user
  has_one_attached :image
  has_many :comments
  has_many :diary_tag_relations
  has_many :tags, through: :diary_tag_relations

  validates :title, presence: true
end
