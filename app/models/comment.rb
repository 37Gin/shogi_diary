class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :diary, dependent: :destroy
end
