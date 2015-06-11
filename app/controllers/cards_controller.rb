class CardsController < ApplicationController
  skip_before_filter  :verify_authenticity_token
  def index
    output=[]
    cards = Card.all.select {|e| e.deck_id == nil}
    cards.each do |d|
      if d.stories != nil
        array_of_stories = d.stories.split(',').map { |e| Deck.find(e.to_i) }
      else
        array_of_stories=[]
      end

      array_of_user_stories=Deck.where(user_id:current_user.id)
      output << {card:d, user: User.find(d.user_id), stories:array_of_stories, user_stories:array_of_user_stories}
    end
    render :json => output.shuffle.first(90)
  end

  def create
    if params[:deck_id] != '_'
      c = Card.create(name: params[:name], bio:params[:bio], setting: params[:setting], tag_line: params[:tag_line], deck_id: params[:deck_id], user_id: current_user.id, stories: "", archetype: params[:archetype])

      render :json => [{user:User.find(c.user_id), card:c,  deck:Deck.find(c.deck_id)}]
    else
      c = Card.create(name: params[:name], bio:params[:bio], setting: params[:setting], tag_line: params[:tag_line], deck_id: params[:deck_id], user_id: current_user.id, stories: "", archetype: params[:archetype])

      render :json => [{user:User.find(c.user_id), card:c, deck:nil}]

    end
  end


# provides all availiable cards
  def user_show
    # u_decks=Deck.where(user_id:current_user.id)
    # cards = Card.all.select {|e| u_decks.map { |f| f.id }.include?(e.deck_id)}
    cards=Card.where(deck_id:nil)
    output=[]
    cards.each do |c|
        output << {user:User.find(c.user_id), card:c}
    end

    render :json => output

  end

  def dismiss
    card = Card.find(params[:id])
    card.update_attributes(deck_id:nil)
    render :json => card
  end

  def claim
    card = Card.find(params[:id])
    card.update_attributes(deck_id:params[:deck_id])
    render :json => card
  end

  def claim_for_deck
    card = Card.find(params[:card_id])
    card.update_attributes(deck_id:params[:deck_id])
    render :json => card
  end

  def claim_for_deck_from_public
    card = Card.find(params[:card_id])
    card.update_attributes(deck_id:params[:deck_id])
    render :json => Deck.find(card.deck_id)
  end


  def destroy
    card=Card.find(params[:id])
    id=card.id
    card.destroy
    render :json => {id: id}

  end

  def assign_to_deck
    deck=Deck.find(params[:deck_id])
    card=Card.find(params[:id])
    deck.cards << card
    render :json => [card]
  end

  def card_remove_from_story
    card=Card.find(params[:id])
    card.update_attributes(deck_id:nil)
    render :json => card
  end

  def story_cards
    cards = Card.where(deck_id:params[:id])
    render :json => cards
  end

  def public_show
    @character = Card.find(params[:id])
    @user = User.find(@character.user_id)
    if @character.deck_id != nil
      @story = Deck.find(@character.deck_id)
    else
      @story="This character is availiable"
    end
  end


  def user_char_select_modal_characters
    output=[]

    cards = Card.where(deck_id:nil)

    cards.each do |c|
      u = User.find(c.user_id)
      output << {card:c, user:u}
    end

    render :json => output
  end

  def main_show

  end
end
