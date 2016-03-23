# IdeaBox 2.0

Author: Toni Rib

## Overview

Rails single-page application that uses JavaScript and jQuery to set up CRUD functionality for creating and storing ideas. It relies heavily on jQuery's AJAX method to make calls internal API endpoints to get, store, update, and delete data. The point of this project was to practice client-side development instead of rely on Rails for everything.

[View it live on Heroku](https://toni-rib-idea-box.herokuapp.com/)

## Screenshot

![Screenshot](/app/assets/images/ideabox_2_screenshot.png)

## Using the App

The application is fairly simple and straightforward to use.

### Add an idea

1. Enter an idea title in the box at the top
2. Enter information about idea in the body section box at the top
3. Click on the save button

New ideas have a default level of 'swill' but can be changed to 'plausible' or 'genius' by hitting the thumbs up and thumbs down icons next to the idea.

### Edit an idea

1. Click on the edit button
2. Edit the title and/or body
3. Click on the save changes button or click anywhere else on the page

### Delete an idea

1. Click on the delete button next to the idea

### Search for an idea

1. Start typing text into the search box. If the text matches any part of an idea's body or title, the idea will be shown. Otherwise, it will be hidden.
2. To clear the search, press the clear button

### Sort by quality

1. Click on the sort by quality button to sort ideas descending by their quality level
2. Click it again to sort ascending by quality level

## Test Suite

This application uses RSpec for testing along with Selenium for JavaScript testing.
