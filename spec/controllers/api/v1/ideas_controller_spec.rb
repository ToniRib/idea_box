require "rails_helper"

RSpec.describe Api::V1::IdeasController, type: :controller do
  describe "GET #index" do
    let(:json_response) { JSON.parse(response.body, symbolize_names: true) }

    it "responds with a successful HTTP 200 status code" do
      get :index, format: :json

      expect(response.status).to eq(200)
      expect(response).to be_successful
    end

    it "responds with the title, body, quality, and created_at of an idea" do
      idea = create(:idea)

      get :index, format: :json

      first_idea = json_response.first

      expect(first_idea[:id]).to eq(idea.id)
      expect(first_idea[:title]).to eq("Title")
      expect(first_idea[:body]).to eq("Body")
      expect(first_idea[:quality]).to eq("swill")
      expect(first_idea[:created_at].to_json).to eq(idea.created_at.to_json)
      expect(first_idea[:updated_at]).to be_nil
    end

    it "returns multiple ideas in reverse order of creation (newest first)" do
      idea1 = Idea.create(title: "Idea1", body: "Body1", quality: "swill")
      idea2 = Idea.create(title: "Idea2", body: "Body2", quality: "genius")

      get :index, format: :json

      first_idea = json_response.first
      second_idea = json_response.last

      expect(json_response.count).to eq(2)
      expect(first_idea[:title]).to eq("Idea2")
      expect(second_idea[:title]).to eq("Idea1")
    end
  end
end
