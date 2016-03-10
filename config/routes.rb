Rails.application.routes.draw do
  root 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :matches, only: [:index]
    resources :abilities, only: [:index]
    resources :heroes, only: [:index]
    resources :items, only: [:index]
  end

  get '*path', to: 'static_pages#root'
end
