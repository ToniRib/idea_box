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

  describe ".newest_to_oldest" do
    it "returns all ideas with the newest first" do
      idea1 = Idea.create(title: "Idea1", body: "Body1",
                          created_at: Date.new(2016, 1, 1))
      idea2 = Idea.create(title: "Idea2", body: "Body2",
                          created_at: Date.new(2016, 3, 1))

      ideas = Idea.newest_to_oldest

      expect(ideas.first).to eq(idea2)
      expect(ideas.last).to eq(idea1)
    end
  end
end
