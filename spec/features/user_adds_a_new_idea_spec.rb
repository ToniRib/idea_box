require "rails_helper"

RSpec.describe "User adds a new idea", type: :feature do
  scenario "idea is added to the database", js: true do
    visit root_path

    fill_in "Title", with: "New Title"
    fill_in "Body", with: "New Body"
    click_on "Save"

    sleep 1

    expect(Idea.count).to eq(1)
  end

  scenario "page shows the next idea", js: true do
    visit root_path

    fill_in "Title", with: "New Title"
    fill_in "Body", with: "New Body"
    click_on "Save"

    expect(page).to have_content("New Title")
    expect(page).to have_content("New Body")
  end

  scenario "new idea is listed first", js: true do
    idea = create(:idea)

    visit root_path

    fill_in "Title", with: "New Title"
    fill_in "Body", with: "New Body"
    click_on "Save"

    within ".idea:nth-of-type(1)" do
      expect(page).to have_content("New Title")
      expect(page).to have_content("New Body")
    end
  end

  scenario "input boxes are cleared after idea is saved", js: true do
    visit root_path

    fill_in "Title", with: "New Title"
    fill_in "Body", with: "New Body"
    click_on "Save"

    within "#title" do
      expect(page).to have_content("")
    end

    within "#body" do
      expect(page).to have_content("")
    end
  end
end
