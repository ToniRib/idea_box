require "rails_helper"

RSpec.describe "User sorts ideas", type: :feature do
  scenario "by descending quality", js: true do
    idea1 = create(:idea, title: 'idea1', quality: 'plausible')
    idea2 = create(:idea, title: 'idea2', quality: 'swill')
    idea3 = create(:idea, title: 'idea3', quality: 'genius')

    visit root_path
    click_on "Sort by Quality"

    within ".idea:nth-of-type(1)" do
      expect(page).to have_content(idea3.title)
    end

    within ".idea:nth-of-type(2)" do
      expect(page).to have_content(idea1.title)
    end

    within ".idea:nth-of-type(3)" do
      expect(page).to have_content(idea2.title)
    end
  end

  xscenario "by ascending quality", js: true do

  end
end
