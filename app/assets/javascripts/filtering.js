$(document).ready(function() {
  $('#search').on('keyup', function() {
    filterIdeas($(this).val());
  });

  $('#clear-search').on('click', function() {
    $('#search').val('');
    $('#search').trigger('keyup');
  });
});

var filterIdeas = function(searchString) {
  $ideas = $('.idea');

  $.each($ideas, function(index, idea) {
    $currentIdea = $(idea);
    title = $currentIdea.children('.title').text();
    body = $currentIdea.children('.hidden').text();

    var matches = titleOrBodyContainsSearchString(title, body, searchString);
    $currentIdea.toggle(matches);
  });
};

var titleOrBodyContainsSearchString = function(title, body, searchString) {
  return contains(title, searchString) || contains(body, searchString);
};

var contains = function(string, substring) {
  return string.toLowerCase().indexOf(substring.toLowerCase()) !== -1;
};
