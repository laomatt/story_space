Rails.application.routes.draw do
  devise_for :users, :controllers => {sessions: 'sessions', registrations: 'registrations'}
  get '/comm_page' => 'decks#main_show'
  get '/char_page' => 'cards#main_show'
  get '/info' => 'home#info'
  get '/faq' => 'home#faq'
  get '/public_profile/:id' => 'decks#public_profile'
  get '/public_character/:id' => 'cards#public_show'

  get '/users/show_cards/:id' => 'users#show_cards'
  get '/users/show_decks/:id' => 'users#show_decks'
  get '/users/show_passages/:id' => 'users#show_passages'

  patch '/claim_card_for_deck' => 'cards#claim_for_deck'
  patch '/claim_card_for_deck_from_public' => 'cards#claim_for_deck_from_public'
  patch '/card_remove_from_story/:id' => 'cards#card_remove_from_story'
  get '/user_decks/:id' => 'decks#user_show'
  get '/user_cards' => 'cards#user_show'
  get '/error' => 'decks#error'
  get '/edit_deck/:id' => 'decks#show_edit'
  get '/user_cast_cards' => 'decks#user_cast_cards'
  get '/story_cards/:id' => 'cards#story_cards'
  patch 'card_claim/:id' => 'cards#claim'

patch '/decks/:deck_id/cards/:id' => 'cards#assign_to_deck'
patch '/deck_publish/:id' => 'decks#publish'
patch '/deck_unpublish/:id' => 'decks#unpublish'
patch '/dissmiss_cards/:id' => 'cards#dismiss'
patch '/passage/approve_passage/:id' => 'passages#approve_passage'
patch '/passage/disapprove_passage/:id' => 'passages#disapprove_passage'
devise_scope :user do
  post 'new_registration' => 'registrations#new'
  get 'new_user_session' => 'sessions#new'
  get '/users/log_out' => 'sessions#destroy'
end

resources :users
resources :decks
resources :cards
resources :passages
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".
  # get 'after_sign_in_path_for_users' => 'user#show'
  # post 'new_registration_path(user)' => 'user#show'
  # You can have the root of your site routed with "root"
  root 'home#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
