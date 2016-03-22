var filterIdeas = function(searchString) {
  $ideas = $('.idea');

  $.each($ideas, function(index, idea) {
    $currentIdea = $(idea);
    title = $currentIdea.children('.title').text();
    body = $currentIdea.children('.hidden').text();

    if (titleOrBodyContainsSearchString(title, body, searchString)) {
      $currentIdea.show();
    } else {
      $currentIdea.hide();
    }
  });
};

var contains = function(string, substring) {
  return string.toLowerCase().indexOf(substring.toLowerCase()) !== -1;
};

var titleOrBodyContainsSearchString = function(title, body, searchString) {
  return contains(title, searchString) || contains(body, searchString);
};
