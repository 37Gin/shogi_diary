class UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
    @diaries = @user.diaries
  end

  def edit
  end

  def update
  end

end
