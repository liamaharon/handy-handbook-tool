// makes loading overlay show up when ajax request is running
/***********************************************/
function setupLoadingOverlay() {
	$(document).ajaxStart(function(){
		$.LoadingOverlay("show");
	});
	$(document).ajaxStop(function(){
		$.LoadingOverlay("hide");
	});
}

// checks if we're on page that we can should change
/***********************************************/
function doChanges(curUrl) {

  // checks if page can be viewed in single page
  if (
  document.getElementsByClassName("course__sidebar-full-details").length > 0 &&
  // check if we're already on single page view
  !curUrl.includes('/print') &&
  // check if user has clicked subject specifics
  !curUrl.includes('/eligibility-and-requirements') &&
  !curUrl.includes('/assessment') &&
  !curUrl.includes('/dates-times') &&
  !curUrl.includes('/further-information') &&
  // check if user has clicked major specifics
  !curUrl.includes('/course-structure') &&
  !curUrl.includes('/subject-options') &&
  // check if user has clicked course specifics (note there is some crossover with major)
  !curUrl.includes('/entry-participation-requirements') &&
  !curUrl.includes('/attributes-outcomes-skills') &&
  !curUrl.includes('/breadth-requirements') &&
  !curUrl.includes('/majors-minors-specialisations') &&
  !curUrl.includes('/further-study') &&
  !curUrl.includes('/notes')
  ) {
      return true
  }
  return false
}

/***********************************************/

// make sidebar scroll with user
// specify point to start scrolling
function setupAutoScroll() {
  $('.header--course-and-subject').append('<div id="startScroll"></div>');
  startScroll = $('#startScroll').offset().top
  window.addEventListener('scroll', function (evt) {
    // This value is your scroll distance from the top
    var distance_from_top = document.body.scrollTop;
    // stop scrolling, reached upper bound
    if (distance_from_top < startScroll) {
      $('.layout-sidebar__side__inner').css("position", "absolute");
      $('.layout-sidebar__side__inner').css("top", "");
    }

    // make div follow user
    else if(distance_from_top >= startScroll) {
      $('.layout-sidebar__side__inner').css("position", "fixed");
      $('.layout-sidebar__side__inner').css("top", "100px");
    }
  });
}
// todo: make sidebar stop scrolling when reached bottom of page
// specify point to end scrolling
// $('footer').prepend('<div id="endScroll"></div>');
// endScroll = $('#endScroll').offset().top
