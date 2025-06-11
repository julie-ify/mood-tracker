Rails.application.routes.draw do
  resources :checkins, only: %i[index show]
end
