class Api::V1::IdeasController < Api::V1::BaseController
  respond_to :json

  def index
    respond_with Idea.newest_to_oldest
  end

  def create
    respond_with Idea.create(idea_params)
  end

  private

  def idea_params
    params.require(:idea).permit(:title, :body)
  end
end
