class Idea < ActiveRecord::Base
  validates :title, presence: true, allow_blank: false
  validates :body, presence: true, allow_blank: false

  scope :newest_to_oldest, -> { order(created_at: :desc) }
end
