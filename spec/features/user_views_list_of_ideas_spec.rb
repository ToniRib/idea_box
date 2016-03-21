require "rails_helper"

RSpec.describe "User views list of ideas", type: :feature do
  xscenario "all attributes of the ideas are displayed" do
    idea1 = Idea.create(title: "Idea1", body: "Body1", quality: "swill")
    idea2 = Idea.create(title: "Idea2", body: "Body2", quality: "genius")

    visit root_path

    expect(page).to have_content(idea1.title)
    expect(page).to have_content(idea1.body)
    expect(page).to have_content(idea1.quality)
    expect(page).to have_content(idea2.title)
    expect(page).to have_content(idea2.body)
    expect(page).to have_content(idea2.quality)
  end
end
