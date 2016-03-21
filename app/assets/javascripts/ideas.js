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
  $('.ideas').append('<h4>' + idea.title + '</h4>' +
                     '<p>' + idea.truncated_body + '</p>' +
                     '<p>' + idea.quality + '</p>');
};
