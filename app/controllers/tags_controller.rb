class TagsController < ApplicationController

  def create
    tag = Tag.new(tag_params)
    tag.save
    redirect_to diary_path(tag.diary_ids[0])
  end

  private

  def tag_params
    params.require(:tag).permit(:tag_name, diary_ids: [])
  end

end
