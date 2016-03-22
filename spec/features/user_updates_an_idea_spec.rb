require "rails_helper"

RSpec.describe "User updates an idea", type: :feature do
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

  scenario "edits the title of an idea", js: true do
    create(:idea, title: 'original title')

    visit root_path
    click_on "Edit"
    fill_in "new-title", with: 'new title'
    click_on "Save Changes"

    expect(page).to have_content("new title")
    expect(page).to_not have_content("original title")
  end

  scenario "edits the body of an idea", js: true do
    create(:idea, body: 'original body')

    visit root_path
    click_on "Edit"
    fill_in "new-body", with: 'new body'
    click_on "Save Changes"

    expect(page).to have_content("new body")
    expect(page).to_not have_content("original body")
  end

  scenario "edits the title and body of an idea", js: true do
    create(:idea, title: 'original title', body: 'original body')

    visit root_path
    click_on "Edit"
    fill_in "new-body", with: 'new body'
    fill_in "new-title", with: 'new title'
    click_on "Save Changes"

    expect(page).to have_content("new body")
    expect(page).to_not have_content("original body")
    expect(page).to have_content("new title")
    expect(page).to_not have_content("original title")
  end

  scenario "edits the body of an idea with a long body", js: true do
    body = "There is nothing I like more than sitting down with a good book, " \
           "especially if I have an IPA to drink at the same time."
    new_body = "There is nothing I like more than reading something while" \
               " curled up on the couch, especially if I have an IPA to" \
               " drink at the same time."
    truncated_body = "There is nothing I like more than sitting down with a " \
                     " good book, especially if I have an IPA to..."
    new_truncated_body = "There is nothing I like more than reading something while" \
                         " curled up on the couch, especially if I..."

    create(:idea, body: body)

    visit root_path
    click_on "Edit"
    fill_in "new-body", with: new_body
    click_on "Save Changes"

    expect(page).to have_content(new_truncated_body)
    expect(page).to_not have_content(truncated_body)
  end
end
