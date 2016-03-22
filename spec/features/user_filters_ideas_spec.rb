require "rails_helper"

RSpec.describe "User filters ideas", type: :feature do
  scenario "based on title", js: true do
    create(:idea, title: "bunnies")
    create(:idea, title: "kittens")

    visit root_path

    fill_in "search", with: "kit"

    expect(page).to have_content("kittens")
    expect(page).to_not have_content("bunnies")
  end

  scenario "based on body", js: true do
    create(:idea, body: "bunnies")
    create(:idea, body: "kittens")

    visit root_path

    fill_in "search", with: "kit"

    expect(page).to have_content("kittens")
    expect(page).to_not have_content("bunnies")
  end

  scenario "based on title or body", js: true do
    create(:idea, title: "idea1", body: "bunnies")
    create(:idea, title: "idea2", body: "kittens")
    create(:idea, title: "kittens", body: "idea3")

    visit root_path

    fill_in "search", with: "kitten"

    expect(page).to have_content("kittens")
    expect(page).to_not have_content("bunnies")
    expect(page).to have_content("idea2")
    expect(page).to have_content("idea3")
  end

  scenario "where the search is case insensitive", js: true do
    create(:idea, title: "idea1", body: "Kittens")
    create(:idea, title: "idea2", body: "kittens")

    visit root_path

    fill_in "search", with: "kit"

    expect(page).to have_content("kittens")
    expect(page).to have_content("Kittens")
    expect(page).to have_content("idea1")
    expect(page).to have_content("idea2")
  end

  scenario "based on a truncated body", js: true do
    body = "There is nothing I like more than sitting down with a good book, " \
           "especially if I have an IPA to drink at the same time."
    truncated_body = "There is nothing I like more than sitting down with a " \
                     " good book, especially if I have an IPA to..."

    create(:idea, body: body)
    create(:idea, body: "bananas")

    visit root_path
    fill_in "search", with: "time"

    expect(page).to have_content(truncated_body)
    expect(page).to_not have_content("bananas")
  end

  scenario "results are filtered based on keyup", js: true do
    create(:idea, body: "bunnies")
    create(:idea, body: "bunny")

    visit root_path

    fill_in "search", with: "bunn"

    expect(page).to have_content("bunnies")
    expect(page).to have_content("bunny")

    fill_in "search", with: "bunny"

    expect(page).to_not have_content("bunnies")
    expect(page).to have_content("bunny")
  end

  scenario "results are reset with clear button", js: true do
    create(:idea, body: "bunnies")
    create(:idea, body: "kittens")

    visit root_path

    fill_in "search", with: "kit"

    expect(page).to have_content("kittens")
    expect(page).to_not have_content("bunnies")

    click_on "Clear"

    expect(page).to have_content("kittens")
    expect(page).to have_content("bunnies")
  end
end
