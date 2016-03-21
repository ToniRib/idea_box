require "rails_helper"

RSpec.describe "User deletes an existing idea", type: :feature do
  scenario "the idea is removed from the database", js: true do
    create(:idea)

    visit root_path
    click_on "Delete"

    sleep 1

    expect(Idea.count).to eq(0)
  end
end
