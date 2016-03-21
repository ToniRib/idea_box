class IdeaSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :quality, :created_at
end
