var addHandlers = function(idea) {
  addDeleteClickHandler(idea);
  addThumbsUpHandler(idea);
  addThumbsDownHandler(idea);
  addEditHandler(idea);
};

var addDeleteClickHandler = function(idea) {
  findIdeaById(idea.id).find('.delete-idea').click(deleteHandler);
};

var addThumbsUpHandler = function(idea) {
  findIdeaById(idea.id).find('.fa-thumbs-o-up').click(thumbsUpHandler);
};

var addThumbsDownHandler = function(idea) {
  findIdeaById(idea.id).find('.fa-thumbs-o-down').click(thumbsDownHandler);
};

var addEditHandler = function(idea) {
  findIdeaById(idea.id).find('.edit-idea').click(editHandler);
};

var findIdeaById = function(id) {
  return $('#idea-' + id);
};

var addUpdateHandler = function($idea) {
  $idea.find('.update-idea').click(updateHandler);
  $idea.find('.new-title').focusout(updateHandler);
  $idea.find('.new-body').focusout(updateHandler);
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
  var $title = $idea.find('.title');
  var fullBodyText = $idea.find('.hidden').text();

  hideFieldsAndShowInputs($idea, $title, fullBodyText);
  addUpdateHandler($idea);
};

var hideFieldsAndShowInputs = function($idea, $title, fullBodyText) {
  $title.hide();
  $idea.find('.idea-body').hide();
  $idea.find('.edit-idea').hide();
  $idea.prepend("<textarea type='text' id='new-body' class='new-body'></textarea>");
  $idea.find('textarea').val(fullBodyText);
  $idea.prepend("<input class='new-title' id='new-title' type='text' value='" +
                $title.text() +
                "'></input>").focus();
  $idea.append("<button class='btn btn-success update-idea'>Save Changes</button>");
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
      if (inputsOutOfFocus()) { removeInputsAndShowFields($idea, newTitle, newBody); }
    }
  });
};

var removeInputsAndShowFields = function($idea, titleText, bodyText) {
  $idea.find('.title').text(titleText).show();
  $idea.find('.idea-body').text(truncate(bodyText)).show();
  $idea.find('.edit-idea').show();
  $idea.find('.hidden').text(bodyText);
  $idea.find('.new-body').remove();
  $idea.find('.new-title').remove();
  $idea.find('.update-idea').remove();
};

var inputsOutOfFocus = function() {
  return !$(".new-title").is(":focus") && !$(".new-body").is(":focus");
};

var thumbsUpHandler = function() {
  var ideaId = $(this).parents('.idea').attr('id').split('-')[1];
  var $quality = $(this).siblings('.quality');
  var currentQuality = $quality.text();
  var newQuality = determineQuality(currentQuality, 1);

  if (qualityHasChanged(newQuality, currentQuality)) {
    updateQuality($quality, ideaId, newQuality);
  }
};

var thumbsDownHandler = function() {
  var ideaId = $(this).parents('.idea').attr('id').split('-')[1];
  var $quality = $(this).siblings('.quality');
  var currentQuality = $quality.text();
  var newQuality = determineQuality(currentQuality, -1);

  if (qualityHasChanged(newQuality, currentQuality)) {
    updateQuality($quality, ideaId, newQuality);
  }
};

var updateQuality = function($quality, id, newQuality) {
  $.ajax({
    type: "PUT",
    url: "/api/v1/ideas/" + id,
    data: {
      idea: {
        quality: newQuality
      }
    },
    success: function() { $quality.text(newQuality); }
  });
};

var qualityHasChanged = function(newQuality, oldQuality) {
  return newQuality !== oldQuality;
};

var determineQuality = function(quality, direction) {
  var level = getLevelOfQuality(quality) + direction;

  if (level < 1) {
    return 'swill';
  } else if (level > 3) {
    return 'genius';
  } else {
    return qualityLevels[level];
  }
};

var qualityLevels = {
  1: 'swill',
  2: 'plausible',
  3: 'genius'
};

var getLevelOfQuality = function(quality) {
  for (var level in qualityLevels) {
    if (qualityLevels[level] === quality) { return parseInt(level); }
  }
};
