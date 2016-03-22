$(document).ready(function() {
  var numberOfSorts = 0;

  $('#sort').on('click', function() {
    sortIdeasByQuality(numberOfSorts);
  })
});

var sortIdeasByQuality = function(n) {
  ideas = getIdeaObjects();
  console.log(ideas);
  //  if n is 0 or even, sort descending
  //  otherwise wort ascending
};

var getIdeaObjects = function() {
  $ideas = $('.idea');
  ideaObjects = [];

  $.each($ideas, function(index, idea) {
    $currentIdea = $(idea);

    ideaObjects.push({
      title: $currentIdea.children('.title').text(),
      fullBody: $currentIdea.children('.hidden').text(),
      body: $currentIdea.children('.idea-body').text(),
      quality: $currentIdea.children('.quality').text(),
      visible: $currentIdea.is(':visible'),
      id: $currentIdea.attr('id')
    })
  });

  return ideaObjects;
};
