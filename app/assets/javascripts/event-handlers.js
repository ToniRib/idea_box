var addHandlers = function(idea) {
  addDeleteClickHandler(idea);
  addThumbsUpHandler(idea);
  addThumbsDownHandler(idea);
  addEditHandler(idea);
};

var addHandler = function(idea, selector, callback) {
  findIdeaById(idea.id).find(selector).click(callback);
};

var addDeleteClickHandler = function(idea) {
  addHandler(idea, '.delete-idea', deleteHandler);
};

var addThumbsUpHandler = function(idea) {
  addHandler(idea, '.fa-thumbs-o-up', thumbsUpHandler);
};

var addThumbsDownHandler = function(idea) {
  addHandler(idea, '.fa-thumbs-o-down', thumbsDownHandler);
};

var addEditHandler = function(idea) {
  addHandler(idea, '.edit-idea', editHandler);
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
      if (inputsAreOutOfFocus()) { removeInputsAndShowFields($idea, newTitle, newBody); }
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

var inputsAreOutOfFocus = function() {
  return !$(".new-title").is(":focus") && !$(".new-body").is(":focus");
};

var updateQualityBasedOnThumbDirection = function(direction, button) {
  var ideaId = $(button).parents('.idea').attr('id').split('-')[1];
  var $quality = $(button).siblings('.quality');
  var currentQuality = $quality.text();
  var newQuality = determineQuality(currentQuality, direction);

  if (qualityHasChanged(newQuality, currentQuality)) {
    updateQuality($quality, ideaId, newQuality);
  }
};

var thumbsUpHandler = function() {
  updateQualityBasedOnThumbDirection('promote', this);
};

var thumbsDownHandler = function() {
  updateQualityBasedOnThumbDirection('demote', this);
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
  return qualities[direction][quality];
};

var qualities = {
  promote: {
    'swill': 'plausible',
    'plausible': 'genius',
    'genius': 'genius'
  },
  demote: {
    'swill': 'swill',
    'plausible': 'swill',
    'genius': 'plausible'
  }
};
