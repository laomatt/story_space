require 'faker'
cats = ["romance", "sci-fi", "steam punk", "action", "hero", "super hero", "mystery", "suspense", "horror", "fantasy", "poetry", "war", "crime", "humor", "childrens", "adult", "other"]
sets = ["Victorian-era", "Mideval", "distopian future", "utopian future", "old west", "1950s", "current", "spans", "non-applicable", "other"]

45.times do
  user = User.create(email:Faker::Internet.email, password:"pas",name:Faker::Name.name, avatar:Faker::Avatar.image)

  (1+rand(20)).times do
    deck=Deck.create(name:Faker::Name.title,story:Faker::Lorem.paragraph,category:cats.sample,setting:sets.sample, tag_line:Faker::Lorem.sentence)
    (1+rand(20)).times do
      card = Card.create(name:Faker::Name.name,bio:Faker::Lorem.paragraph,setting:deck.setting,tag_line:Faker::Lorem.sentence,user_id:1+rand(44))
      deck.cards << card
    end

    (1+rand(30)).times do
      pass = Passage.create(user_id:1+rand(40), content:Faker::Lorem.paragraph)
      deck.passages << pass
    end
    user.decks << deck
  end

end

