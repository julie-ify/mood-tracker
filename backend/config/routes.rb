Rails.application.routes.draw do
  namespace :api do
    post '/signup', to: 'auth#signup'
    post '/login', to: 'auth#login'

    resources :checkins, only: %i[index show]
  end

end
