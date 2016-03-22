require "rails_helper"

RSpec.describe "User updates the quality of an idea", type: :feature do
  scenario "clicks the thumbs up on an idea with quality swill", js: true do
    create(:idea, quality: 'swill')

    visit root_path
    page.find(".fa-thumbs-o-up").click

    expect(page).to have_content('plausible')
  end

  scenario "clicks the thumbs up on an idea with quality plausible", js: true do
    create(:idea, quality: 'plausible')

    visit root_path
    page.find(".fa-thumbs-o-up").click

    expect(page).to have_content('genius')
  end

  scenario "clicks the thumbs up on an idea with quality genius", js: true do
    create(:idea, quality: 'genius')

    visit root_path
    page.find(".fa-thumbs-o-up").click

    expect(page).to have_content('genius')
  end

  scenario "clicks the thumbs down on an idea with quality swill", js: true do
    create(:idea, quality: 'swill')

    visit root_path
    page.find(".fa-thumbs-o-down").click

    expect(page).to have_content('swill')
  end

  scenario "clicks the thumbs down on an idea with quality plausible", js: true do
    create(:idea, quality: 'plausible')

    visit root_path
    page.find(".fa-thumbs-o-down").click

    expect(page).to have_content('swill')
  end

  scenario "clicks the thumbs down on an idea with quality genius", js: true do
    create(:idea, quality: 'genius')

    visit root_path
    page.find(".fa-thumbs-o-down").click

    expect(page).to have_content('plausible')
  end
end
