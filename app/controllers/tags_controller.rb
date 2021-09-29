class TagsController < ApplicationController

  def create
    @tag = DiaryTag.new(tag_params)
    if @tag.valid?
      @tag.create
    end
    redirect_to diary_path(@tag.diary_id)
  end

  private

  def tag_params
    diary_id = params.require(:tag).permit(diary_ids: [])
    params.require(:tag).permit(:tag_name).merge(diary_id: diary_id["diary_ids"][0])
  end

end
