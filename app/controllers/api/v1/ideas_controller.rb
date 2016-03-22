class Api::V1::IdeasController < Api::V1::BaseController
  respond_to :json

  def index
    respond_with Idea.newest_to_oldest
  end

  def create
    respond_with :api, :v1, Idea.create(idea_params)
  end

  def destroy
    respond_with Idea.find(params[:id]).destroy
  end

  def update
    respond_with Idea.find(params[:id]).update_attribute(:quality, params[:quality])
  end

  private

  def idea_params
    params.require(:idea).permit(:title, :body)
  end
end
