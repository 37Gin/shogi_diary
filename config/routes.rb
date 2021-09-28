Rails.application.routes.draw do
  devise_for :users
  root to: 'diaries#index'
  resources :diaries do
    resources :comments, only: :create
    collection do
      get 'search'
    end
  end
  resources :users, only: [:show, :edit, :update]
  resources :tags, only: :create
end
