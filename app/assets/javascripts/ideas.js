$(document).ready(function() {
  getIdeas();

  $('#save-idea').on('click', function() {
    var title = $('#title').val();
    var body = $('#body').val();

    saveIdea(title, body);
  });

  $('#search').on('keyup', function() {
    filterIdeas($(this).val());
  });

  $('#clear-search').on('click', function() {
    $('#search').val('');
    showAllIdeas();
  })
});

var filterIdeas = function(searchString) {
  $ideas = $('.idea');

  for (var i = 1; i < $ideas.length + 1; i++) {
    $currentIdea = $('.idea:nth-child(' + i + ')');
    title = $currentIdea.find('.title').text();
    body = $currentIdea.find('.idea-body').text();

    if (contains(title, searchString) || contains(body, searchString)) {
      $currentIdea.show();
    } else {
      $currentIdea.hide();
    }
  }
};

var showAllIdeas = function() {
  $ideas = $('.idea');

  for (var i = 1; i < $ideas.length + 1; i++) {
    $('.idea:nth-child(' + i + ')').show();
  }
};

var contains = function(string, substring) {
  return string.indexOf(substring) !== -1;
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

var addHandlers = function(idea) {
  addDeleteClickHandler(idea);
  addThumbsUpHandler(idea);
  addThumbsDownHandler(idea);
  addEditHandler(idea);
};

var addDeleteClickHandler = function(idea) {
  $('#idea-' + idea.id).find('.delete-idea').click(deleteHandler);
};

var addThumbsUpHandler = function(idea) {
  $('#idea-' + idea.id).find('.fa-thumbs-o-up').click(thumbsUpHandler);
};

var addThumbsDownHandler = function(idea) {
  $('#idea-' + idea.id).find('.fa-thumbs-o-down').click(thumbsDownHandler);
};

var addEditHandler = function(idea) {
  $('#idea-' + idea.id).find('.edit-idea').click(editHandler);
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

var editHandler = function() {
  var $idea = $(this).parent();
  var ideaId = $idea.attr('id').split('-')[1];
  var $title = $idea.find('.title');
  var $body = $idea.find('.idea-body');

  $.ajax({
    type: 'GET',
    url: '/api/v1/ideas/' + ideaId,
    success: function(idea) {
      $title.hide();
      $body.hide();
      $idea.find('.edit-idea').hide();
      $idea.prepend("<textarea type='text' id='new-body' class='new-body'></textarea>");
      $idea.find('textarea').val(idea.body);
      $idea.prepend("<input class='new-title' id='new-title' type='text' value='" + $title.text() + "'></input>").focus();
      $idea.append("<button class='btn btn-success update-idea'>Save Changes</button>");
      addUpdateHandler($idea);
    }
  });
};

var addUpdateHandler = function(idea) {
  idea.find('.update-idea').click(updateHandler);
};

var updateHandler = function() {
  var $idea = $(this).parents('.idea');
  var ideaId = $idea.attr('id').split('-')[1];
  var newTitle = $idea.find('.new-title').val();
  var newBody = $idea.find('.new-body').val();


  $.ajax({
    type: "PUT",
    url: "/api/v1/ideas/" + ideaId,
    data: {
      idea: {
        title: newTitle,
        body: newBody
      }
    },
    success: function() {
      var $title = $idea.find('.title');
      var $body = $idea.find('.idea-body');
      $title.text(newTitle).show();
      $body.text(truncate(newBody)).show();
      $idea.find('.edit-idea').show();
      $idea.find('.new-body').remove();
      $idea.find('.new-title').remove();
      $idea.find('.update-idea').remove();
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
        idea: {
          quality: newQuality
        }
      },
      success: function() {
        $quality.text(newQuality);
      }
    });
  }
};

var thumbsDownHandler = function() {
  var ideaId = $(this).parents('.idea').attr('id').split('-')[1];
  var $quality = $(this).siblings('.quality');
  var currentQuality = $quality.text();
  var newQuality = determineQuality(currentQuality, -1);

  if (newQuality !== currentQuality) {
    $.ajax({
      type: "PUT",
      url: "/api/v1/ideas/" + ideaId,
      data: {
        idea: {
          quality: newQuality
        }
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
