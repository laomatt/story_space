require 'faker'
cats = ["romance", "sci-fi", "steam punk", "action", "hero", "super hero", "mystery", "suspense", "horror", "fantasy", "poetry", "war", "crime", "humor", "childrens", "adult", "other"]
sets = ["Victorian-era", "Mideval", "distopian future", "utopian future", "old west", "1950s", "current", "spans", "non-applicable", "other"]

45.times do
  user = User.create(email:Faker::Internet.email, password:"pas",name:Faker::Name.name, avatar:Faker::Avatar.image)

  15.times do
    deck=Deck.create(name:Faker::Name.title,story:Faker::Lorem.paragraphs(9),category:cats.sample,setting:sets.sample)
    (1+rand(20)).times do
      card = Card.create(name:Faker::Name.name,bio:Faker::Lorem.paragraphs(2),setting:deck.setting,tag_line:Faker::Lorem.sentence,creator:rand(44))
      deck.cards << card
    end
    user.decks << deck
  end

end

