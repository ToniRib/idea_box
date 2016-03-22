$(document).ready(function() {
  getIdeas();

  $('#save-idea').on('click', function() {
    saveIdea($('#title').val(), $('#body').val());
  });
});

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
      clearInputs();
    }
  });
};

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
  addHandlers(idea);
};

var prependIdea = function(idea) {
  $('.ideas').prepend(ideaString(idea));
  addHandlers(idea);
};

var ideaString = function(idea) {
  var truncatedBody = truncate(idea.body);

  return "<div class='idea' id='idea-"+ idea.id + "'>" +
         "<h3 class='inline title'>" + idea.title + "</h3>" +
         "<p class='inline right'><em class='quality'>" + idea.quality + "</em>" +
         "<i class='fa fa-thumbs-o-up'></i>" +
         "<i class='fa fa-thumbs-o-down'></i></p>" +
         "<p class='idea-body'>" + truncatedBody + "</p>" +
         "<p class='hidden'>" + idea.body + "</p>" +
         "<button class='btn btn-danger delete-idea'>Delete</button>" +
         "<button class='btn btn-primary edit-idea'>Edit</button>" +
         "</div>";
};

var truncate = function(text) {
  if (text.length > 100) {
    return text.substr(0, text.lastIndexOf(' ', 100)) + '...';
  } else {
    return text;
  }
};

var clearInputs = function() {
  $('#title').val('');
  $('#body').val('');
};
