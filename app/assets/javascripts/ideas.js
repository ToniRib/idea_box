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
  addHandlers(idea);
};

var prependIdea = function(idea) {
  $('.ideas').prepend(ideaString(idea));
  addHandlers(idea);
};

var addHandlers = function(idea) {
  addDeleteClickHandler(idea);
  addThumbsUpHandler(idea);
  // addThumbsDownHandler(idea);
};

var addDeleteClickHandler = function(idea) {
  $('#idea-' + idea.id).find('.delete-idea').click(deleteHandler);
};

var addThumbsUpHandler = function(idea) {
  $('#idea-' + idea.id).find('.fa-thumbs-o-up').click(thumbsUpHandler);
};

var ideaString = function(idea) {
  var truncatedBody = truncate(idea.body);

  return "<div class='idea' id='idea-"+ idea.id + "'>" +
         "<h3 class='inline title'>" + idea.title + "</h3>" +
         "<p class='inline right'><em class='quality'>" + idea.quality + "</em>" +
         "<i class='fa fa-thumbs-o-up'></i>" +
         "<i class='fa fa-thumbs-o-down'></i></p>" +
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
      $('#idea-' + ideaId).remove();
    }
  });
};

var thumbsUpHandler = function() {
  var ideaId = $(this).parents('.idea').attr('id').split('-')[1];
  var $quality = $(this).siblings('.quality');
  var currentQuality = $quality.text();
  var newQuality = determineQuality(currentQuality, 1);

  if (newQuality !== currentQuality) {
    $.ajax({
      type: "PUT",
      url: "/api/v1/ideas/" + ideaId,
      data: {
        quality: newQuality
      },
      success: function() {
        $quality.text(newQuality);
      }
    });
  }
};

var determineQuality = function(level, direction) {
  if (direction === 1) {
    if (level === 'swill') {
      return 'plausible';
    } else {
      return 'genius';
    }
  } else {
    if (level === 'genius') {
      return 'plausible';
    } else {
      return 'swill';
    }
  }
};
