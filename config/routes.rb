Rails.application.routes.draw do
  root 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :matches, only: [:index, :show]
    resources :abilities, only: [:index]
    resources :heroes, only: [:index, :show]
    resources :items, only: [:index]
    resources :players, only: [:index]
    resources :statistics, only: [:index]
  end

  get '*path', to: 'static_pages#root'
end
