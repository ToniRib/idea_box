$(document).ready(function() {
  getIdeas();
});

var getIdeas = function() {
  $.ajax({
    type: "GET",
    url: "/api/v1/ideas",
    success: function(ideas) {
      addIdeasToPage(ideas);
    }
  });
};

var addIdeasToPage = function(ideas) {
  $.each(ideas, function(index, idea) {
    appendIdea(idea);
  });
};

var appendIdea = function(idea) {
  var truncatedBody = truncate(idea.body);

  $('.ideas').append("<h4 id='idea-" + idea.id + "'>" + idea.title + "</h4>" +
                     "<p>" + truncatedBody + "</p>" +
                     "<p>" + idea.quality + "</p>");
};

var truncate = function(text) {
  if (text.length > 100) {
    return text.substr(0, text.lastIndexOf(' ', 100)) + '...';
  } else {
    return text;
  }
};
