class DiaryTag

  include ActiveModel::Model
  attr_accessor :title, :content, :image, :tag_name, :user_id

  def save
    diary = Diary.create(title: title, content: content, image: image, user_id: user_id)
    tag = Tag.where(tag_name: tag_name).first_or_initialize
    tag.save

    DiaryTagRelation.create(diary_id: diary.id, tag_id: tag.id)
  end
end