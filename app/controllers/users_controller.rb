class UsersController < ApplicationController
before_action :authenticate_user!

  def index
  end

  def show
    @user = User.find(params[:id])
    @user_decks = Deck.where(user_id:current_user.id)
  end

  def show_cards
    @user = User.find(current_user.id)
    @user_cards = Card.where(user_id:current_user.id)
  end

  def show_decks
    @user = User.find(current_user.id)
    @user_decks = Deck.where(user_id:current_user.id)
  end

  def show_passages
    @passages = Passage.where(user_id:current_user.id)
  end

  def error

  end


end
