class IdeaSerializer < ActiveModel::Serializer
  attributes :title, :truncated_body, :quality, :created_at

  def truncated_body
    object.body_truncated_to_100_chars
  end
end
