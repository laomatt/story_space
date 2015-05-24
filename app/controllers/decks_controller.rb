class DecksController < ApplicationController
  def index
    output=[]
    Deck.all.each do |d|
      output << {deck:d, user: User.find(d.user_id)}
    end
    render :json => output.shuffle.first(8)
  end

  def user_show
    output=[]
    decks= Deck.where(user_id:params[:id])
   decks.all.each do |d|
      output << {deck:d, user: User.find(d.user_id)}
    end
    render :json => output

  end

  def main_show
  end

  def search
  end
end
