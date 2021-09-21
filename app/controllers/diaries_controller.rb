class DiariesController < ApplicationController

  def index
  end

  def new
    @diary = Diary.new
  end

  def create
    Diary.create(diary_params)
    redirect_to root_path
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
    Diary.update(diary_params)
    redirect_to diary_path
  end

  private

  def diary_params
    params.require(:diary).permit(:title, :content, :image).merge(user_id: current_user.id)
  end
  
end
