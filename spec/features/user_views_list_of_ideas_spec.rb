require "rails_helper"

RSpec.describe "User views list of ideas", type: :feature do
  scenario "all attributes of the ideas are displayed", js: true do
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

  scenario "an idea body longer than 100 chars is truncated to the closest word", js: true do
    body = "There is nothing I like more than sitting down with a good book, " \
           "especially if I have an IPA to drink at the same time."

    expect(body.length).to eq(119)

    idea = Idea.create(title: "Title", body: body)

    truncated_body = "There is nothing I like more than sitting down with a " \
                     " good book, especially if I have an IPA to..."

    visit root_path

    expect(page).to have_content(truncated_body)
  end

  scenario "ideas are displayed with the newest first", js: true do
    idea1 = Idea.create(title: "Idea1", body: "Body1",
                        created_at: Date.new(2016, 1, 1))
    idea2 = Idea.create(title: "Idea2", body: "Body2",
                        created_at: Date.new(2016, 3, 1))

    visit root_path

    within ".ideas:first-child" do
      expect(page).to have_content(idea2.title)
    end
  end
end
