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
  end

  def edit
    @diary = Diary.find(params[:id])
  end

  private

  def diary_params
    params.require(:diary).permit(:title, :content, :image).merge(user_id: current_user.id)
  end
  
end
