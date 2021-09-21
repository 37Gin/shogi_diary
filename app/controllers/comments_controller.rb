class CommentsController < ApplicationController
  def create
    # binding.pry
    comment = Comment.create(comment_params)
    redirect_to "/diaries/#{comment.diary.id}"
  end

  private

  def comment_params
    params.require(:comment).permit(:comment).merge(diary_id: params[:diary_id], user_id: current_user.id)
  end

end
