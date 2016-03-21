class Api::V1::IdeasController < Api::V1::BaseController
  respond_to :json

  def index
    respond_with Idea.newest_to_oldest
  end
end
