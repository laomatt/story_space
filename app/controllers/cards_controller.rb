class CardsController < ApplicationController
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
    c = Card.create(name: params[:name], bio:params[:bio], setting: params[:setting], tag_line: params[:tag_line], deck_id: params[:deck_id], user_id: current_user.id, stories: "", archetype: params[:archetype])
    render :json => [{user:User.find(c.user_id), card:c,  deck:Deck.find(c.deck_id)}]
  end

  def user_show
    cards = Card.where(user_id:current_user.id)
    output=[]
    cards.each do |c|
      if c.deck_id != nil
        output << {user:User.find(c.user_id), card:c, deck:Deck.find(c.deck_id)}
      end
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
    render :json => card
  end

  def card_remove_from_story
    card=Card.find(params[:id])
    card.update_attributes(deck_id:nil)
    render :json => card
  end

  def main_show

  end
end
