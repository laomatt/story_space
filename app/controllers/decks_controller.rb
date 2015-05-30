class DecksController < ApplicationController
  # before_action :authenticate_user!
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
      if d.public==true
        output << {deck:d, user: User.find(d.user_id)}
      end
    end
    render :json => output.shuffle.first(28)
  end

  def public_profile
    @user = User.find(params[:id])
    @public_decks = @user.decks.select{|e| e.public}
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
    if current_user.id == Deck.find(params[:id]).user_id.to_i
      @story = Deck.find(params[:id])
      @approved_passages = @story.passages.select {|e| e.approved == true}
      @non_approved_passages = @story.passages.select {|e| e.approved == false}
      @author = User.find(@story.user_id)
      @cards = Card.where(deck_id:nil)#.select {|e| e.deck_id == nil}
    else
      redirect_to '/error'
    end
  end

  def new
    @cards = Card.where(user_id:current_user.id)
  end

  def publish
    deck = Deck.find(params[:id])
    deck.update_attributes(public:true)

    deck.cards.each do |card|
      if card.stories != nil
        tem_array = card.stories.split(',') << deck.id.to_s
        card.update_attributes(stories:tem_array.uniq.join(','))
      else
        card.update_attributes(stories:deck.id.to_s)
      end
    end

    render :json => deck
  end

  def unpublish
    deck = Deck.find(params[:id])
    deck.update_attributes(public:false)
    render :json => deck
  end

  def destroy
    deck=Deck.find(params[:id])
    deck.destroy
    render :json => {}
  end

  def user_cast_cards


  end

  def main_show
  end

  def search
  end
end
