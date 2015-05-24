class UsersController < ApplicationController
before_action :authenticate_user!

  def index
  end

  def show
    @user = User.find(params[:id])
    @user_decks = Deck.where(user_id:params[:id])
  end



end
