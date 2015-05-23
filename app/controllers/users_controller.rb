class UsersController < ApplicationController
before_action :authenticate_user!

  def index
  end

  def show
    @user = User.find(params[:id])
    unless @user == current_user
      redirect_to :back, :alert => "Access denied."
    end
  end

  def login
    # user = User.find_by(email:params[:username])

    # if user.exists?
    #   if user.en
    #   sign_in(user)
    # else
    #   @message = {message:"user not found"}
    #   render :json => @message
    # end

  end

end
