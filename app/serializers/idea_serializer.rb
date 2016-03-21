class IdeaSerializer < ActiveModel::Serializer
  attributes :title, :body, :quality, :created_at
end
