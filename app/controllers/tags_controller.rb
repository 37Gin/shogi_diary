class TagsController < ApplicationController

  def create
    tag = Tag.new(tag_params)
    @tag = Tag.find_by(tag_name: tag.tag_name)
    if @tag != nil
      @tag.update(tag_params)
    else
      tag.save
    end
    redirect_to diary_path(tag.diary_ids[0])
  end

  private

  def tag_params
    params.require(:tag).permit(:tag_name, diary_ids: [])
  end

end
