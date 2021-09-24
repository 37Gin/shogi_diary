class DiariesTag

  include ActiveModel::Model
  attr_accessor :title, :content, :tag_name

  def save
    diary = Diary.create(title: title, content: content)
    tag = Tag.create(tag_name: tag_name)

    DiaryTagRelation.create(diary_id: diary.id, tag_id: tag.id)
  end
end