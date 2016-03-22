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

var addUpdateHandler = function(idea) {
  idea.find('.update-idea').click(updateHandler);
  idea.find('.new-title').focusout(updateHandler);
  idea.find('.new-body').focusout(updateHandler);
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
  var $fullBody = $idea.find('.hidden');

  $title.hide();
  $body.hide();
  $idea.find('.edit-idea').hide();
  $idea.prepend("<textarea type='text' id='new-body' class='new-body'></textarea>");
  $idea.find('textarea').val($fullBody.text());
  $idea.prepend("<input class='new-title' id='new-title' type='text' value='" + $title.text() + "'></input>").focus();
  $idea.append("<button class='btn btn-success update-idea'>Save Changes</button>");
  addUpdateHandler($idea);
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
      if (inputsOutOfFocus()) {
        var $title = $idea.find('.title');
        var $body = $idea.find('.idea-body');
        $title.text(newTitle).show();
        $body.text(truncate(newBody)).show();
        $idea.find('.edit-idea').show();
        $idea.find('.hidden').text(newBody);
        $idea.find('.new-body').remove();
        $idea.find('.new-title').remove();
        $idea.find('.update-idea').remove();
      }
    }
  });
};

var inputsOutOfFocus = function() {
  return !$(".new-title").is(":focus") && !$(".new-body").is(":focus");
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
