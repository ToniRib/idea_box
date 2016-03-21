$(document).ready(function() {
  getIdeas();

  $('#save-idea').on('click', function() {
    var title = $('#title').val();
    var body = $('#body').val();

    saveIdea(title, body);
  });
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
  $('.ideas').append(ideaString(idea));
};

var prependIdea = function(idea) {
  $('.ideas').prepend(ideaString(idea));
};

var ideaString = function(idea) {
  var truncatedBody = truncate(idea.body);

  return "<div class='idea' id='idea-"+ idea.id + "'>" +
         "<h3 class='inline title'>" + idea.title + "</h3>" +
         "<p class='inline right'><em>" + idea.quality + "</em></p>" +
         "<p class='idea-body'>" + truncatedBody + "</p>" +
         "</div>";
};

var truncate = function(text) {
  if (text.length > 100) {
    return text.substr(0, text.lastIndexOf(' ', 100)) + '...';
  } else {
    return text;
  }
};

var saveIdea = function(title, body) {
  $.ajax({
    type: "POST",
    url: "/api/v1/ideas",
    data: {
      idea: {
        title: title,
        body: body
      }
    },
    success: function(idea) {
      prependIdea(idea);
    }
  });
};
