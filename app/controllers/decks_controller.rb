class DecksController < ApplicationController
  def create
    new_deck = Deck.create(name: params[:name], story:params[:story] , category:params[:category] , tag_line:params[:tag_line] , setting:params[:setting] , user_id: current_user.id)
    char_ids = params[:current_chars]
    ids_array=char_ids.split(',').map { |e| e.to_i }
    ids_array.each do |id|
      char=Card.find(id)
      # new_deck.cards << char
      char.update_attributes(deck_id:new_deck.id)
    end
    render :json => new_deck
  end


  def index
    output=[]
    Deck.all.each do |d|
      output << {deck:d, user: User.find(d.user_id)}
    end
    render :json => output.shuffle.first(28)
  end

  def user_show
    output=[]
    decks= Deck.where(user_id:params[:id])
    decks.all.each do |d|
      output << {deck:d, user: User.find(d.user_id)}
    end
    render :json => output
  end

  def show
    @story = Deck.find(params[:id])
    @approved_passages = @story.passages.select {|e| e.approved == true}
    @author = User.find(@story.user_id)

  end

  def show_edit
    @story = Deck.find(params[:id])
    @approved_passages = @story.passages.select {|e| e.approved == true}
    @non_approved_passages = @story.passages.select {|e| e.approved == false}
    @author = User.find(@story.user_id)
  end

  def new
    @cards = Card.where(user_id:current_user.id)
  end

  def user_cast_cards


  end

  def main_show
  end

  def search
  end
end
