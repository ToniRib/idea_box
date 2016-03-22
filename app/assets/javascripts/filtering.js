var filterIdeas = function(searchString) {
  $ideas = $('.idea');

  for (var i = 1; i < $ideas.length + 1; i++) {
    $currentIdea = $('.idea:nth-child(' + i + ')');
    title = $currentIdea.find('.title').text();
    body = $currentIdea.find('.hidden').text();

    if (titleOrBodyContainsSearchString(title, body, searchString)) {
      $currentIdea.show();
    } else {
      $currentIdea.hide();
    }
  }
};

var contains = function(string, substring) {
  return string.toLowerCase().indexOf(substring.toLowerCase()) !== -1;
};

var titleOrBodyContainsSearchString = function(title, body, searchString) {
  return contains(title, searchString) || contains(body, searchString);
};
