require "rails_helper"

RSpec.describe "User deletes an existing idea", type: :feature do
  scenario "the idea is removed from the database", js: true do
    create(:idea)

    visit root_path
    click_on "Delete"

    sleep 1

    expect(Idea.count).to eq(0)
  end

  scenario "idea is removed from the page", js: true do
    idea = create(:idea)

    visit root_path
    click_on "Delete"

    expect(page).not_to have_content(idea.title)
    expect(page).not_to have_content(idea.body)
    expect(page).not_to have_content(idea.quality)
  end
end
