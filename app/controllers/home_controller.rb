class HomeController < ApplicationController
  def index
    @decks = Deck.all
  end

  def info

  end

  def faq

  end
end
