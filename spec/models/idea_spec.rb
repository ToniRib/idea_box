require 'rails_helper'

RSpec.describe Idea, type: :model do
  describe "#initialize" do
    it "creates an idea with valid parameters" do
      idea = create(:idea)

      expect(idea.title).to eq("Title")
      expect(idea.body).to eq("Body")
      expect(idea.quality).to eq("swill")
    end

    it "defaults quality to the string swill" do
      idea = Idea.create(title: "Title", body: "Body")

      expect(idea.quality).to eq("swill")
    end
  end
end
