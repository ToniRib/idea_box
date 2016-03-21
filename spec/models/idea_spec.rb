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

    it "requires a title to be present" do
      Idea.create(body: "Body")

      expect(Idea.count).to eq(0)
    end

    it "requires a body to be present" do
      Idea.create(title: "Title")

      expect(Idea.count).to eq(0)
    end
  end
end
