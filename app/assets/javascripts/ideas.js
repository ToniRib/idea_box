$(document).ready(function() {
  getIdeas();

  $('#save-idea').on('click', function() {
    var title = $('#title').val();
    var body = $('#body').val();

    saveIdea(title, body);
  });

  $('.delete-btn').on('click', function() {
    console.log("got here");
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
  addDeleteClickHandler(idea);
};

var prependIdea = function(idea) {
  $('.ideas').prepend(ideaString(idea));
  addDeleteClickHandler(idea);
};

var addDeleteClickHandler = function(idea) {
  $('#idea-' + idea.id).find('button').click(deleteHandler);
};

var ideaString = function(idea) {
  var truncatedBody = truncate(idea.body);

  return "<div class='idea' id='idea-"+ idea.id + "'>" +
         "<h3 class='inline title'>" + idea.title + "</h3>" +
         "<p class='inline right'><em>" + idea.quality + "</em></p>" +
         "<p class='idea-body'>" + truncatedBody + "</p>" +
         "<button class='btn btn-danger delete-idea'>Delete</button>" +
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

var deleteHandler = function() {
  var ideaId = $(this).parent().attr('id').split('-')[1];

  $.ajax({
    type: "DELETE",
    url: "/api/v1/ideas/" + ideaId,
    success: function() {
      console.log("deleted idea");
    }
  });
};
