class CardsController < ApplicationController
  def index
    output=[]
    Card.all.each do |d|
      output << {card:d, user: User.find(d.user_id)}
    end
    render :json => output.shuffle.first(90)
  end


  def user_show
    cards = Card.where(user_id:params[:id])
    output=[]
    cards.each do |c|
      output << {user:User.find(c.user_id), card:c}
    end

    render :json => output

  end

  def main_show

  end
end
