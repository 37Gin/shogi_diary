Rails.application.routes.draw do
  devise_for :users
  root to: 'diaries#index'
  resources :diaries do
    resources :comments, only: :create
  end
  resources :users, only: [:show, :edit, :update]
  resources :tags, only: :create
end
