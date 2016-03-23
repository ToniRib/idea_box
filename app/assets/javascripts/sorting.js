$(document).ready(function() {
  var numberOfSorts = 0;

  $('#sort').on('click', function() {
    numberOfSorts = sortIdeasByQuality(numberOfSorts);
  });
});

var sortIdeasByQuality = function(n) {
  ideas = getIdeaObjects();

  $('.idea').remove();
  ideas = isEven(n) ? sortDescending(ideas) : sortAscending(ideas);

  addIdeasToPage(ideas);

  n++;
  return n;
};

var isEven = function(num) {
  return num % 2 === 0;
};

var getIdeaObjects = function() {
  $ideas = $('.idea');
  ideaObjects = [];

  $.each($ideas, function(index, idea) {
    $currentIdea = $(idea);

    ideaObjects.push({
      title: $currentIdea.find('.title').text(),
      fullBody: $currentIdea.find('.hidden').text(),
      body: $currentIdea.find('.idea-body').text(),
      quality: $currentIdea.find('.quality').text(),
      visible: $currentIdea.is(':visible'),
      id: $currentIdea.attr('id').split('-')[1]
    });
  });

  return ideaObjects;
};

var sortDescending = function(ideas) {
  return ideas.sort(compareQuality);
};

var sortAscending = function(ideas) {
  return ideas.sort(compareQuality).reverse();
};

var compareQuality = function(a, b) {
  if (qualityLevels[a.quality] > qualityLevels[b.quality]) {
    return -1;
  } else if (qualityLevels[a.quality] < qualityLevels[b.quality]) {
    return 1;
  } else {
    return 0;
  }
};

var qualityLevels = {
  'swill': 0,
  'plausible': 1,
  'genius': 3
};
