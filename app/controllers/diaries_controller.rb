class DiariesController < ApplicationController

  def index
    @diaries = Diary.all.includes(:user)
  end

  def new
    @diary = DiaryTag.new
  end

  def create
    @diary = DiaryTag.new(diary_tag_params)
    if @diary.valid?
      @diary.save
      return redirect_to root_path
    else
      render "new"
    end
  end

  def show
    @diary = Diary.find(params[:id])
    @comment = Comment.new
    @comments = @diary.comments.includes(:user)
  end

  def edit
    @diary = Diary.find(params[:id])
  end

  def update
    diary = Diary.find(params[:id])
    diary.update(diary_params)
    redirect_to diary_path
  end

  private

  def diary_tag_params
    params.require(:diary_tag).permit(:title, :content, :image, :tag_name).merge(user_id: current_user.id)
  end

  def diary_params
    params.require(:diary).permit(:title, :content, :image).merge(user_id: current_user.id)
  end
  
end
