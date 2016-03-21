class Idea < ActiveRecord::Base
  validates :title, presence: true
  validates :body, presence: true

  scope :newest_to_oldest, -> { order(created_at: :desc) }

  def body_truncated_to_100_chars
    body[0..99]
  end
end
