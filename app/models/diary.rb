class Diary < ApplicationRecord
  belongs_to :user
  has_one_attached :image
  has_many :comments
  has_many :diary_tag_relations, dependent: :destroy
  has_many :tags, through: :diary_tag_relations

  validates :title, presence: true

  def self.search(search)
    if search != ""
      Diary.where(['title LIKE(?) OR content LIKE(?)', "%#{search}%", "%#{search}%"])
    else
      Diary.all
    end
  end
end
