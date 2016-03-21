class Idea < ActiveRecord::Base
  validates :title, presence: true
  validates :body, presence: true

  scope :newest_to_oldest, -> { order(created_at: :desc) }
end
