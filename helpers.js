/* eslint no-unused-vars: 0 */
/* eslint no-undef: 0 */

// list of 'bad URLs' should not activate HHT on any of these pages
var badUrlList = [
  '/print',
  '/eligibility-and-requirements',
  '/assessment',
  '/dates-times',
  '/further-information',
  '/course-structure',
  '/subject-options',
  '/entry-participation-requirements',
  '/attributes-outcomes-skills',
  '/breadth-requirements',
  '/majors-minors-specialisations',
  '/further-study',
  '/notes'
];

// makes loading overlay show up when ajax request is running
function setupLoadingOverlay() {
  $(document).ajaxStart(function showLoadingOverlay() {
    $.LoadingOverlay('show'); // eslint-disable-line new-cap
  });
  $(document).ajaxStop(function hideLoadingOverlay() {
    $.LoadingOverlay('hide'); // eslint-disable-line new-cap
  });
}

// checks if we're on page that we can use HHT with
function doChanges(curUrl) {
  // checks if page can be viewed in single page
  if (document.getElementsByClassName('course__sidebar-full-details').length <= 0) {
    return false;
  }

  var count = badUrlList.length;
  // check to see if we're on a page that should not be viewed using HHT
  for (var i = 0; i < count; i++) {
    if (curUrl.includes(badUrlList[i])) {
      return false;
    }
  }

  // passed all tests - clear to activate HHT!
  return true;
}


// make sidebar scroll with user
// specify point to start scrolling
function setupAutoScroll() {
  $('.header--course-and-subject').append('<div id="startScroll"></div>');
  startScroll = $('#startScroll').offset().top;
  window.addEventListener('scroll', function sidebarScroll() {
    // This value is your scroll distance from the top
    var distanceFromTop = document.documentElement ? document.documentElement.scrollTop : document.body.scrollTop;
    var sidebar = document.querySelector('.layout-sidebar__side__inner');
    // stop scrolling, reached upper bound
    if (distanceFromTop < startScroll) {
      sidebar.style.position = 'absolute';
      sidebar.style.top = '';
    } else if (distanceFromTop >= startScroll) {
      // make div follow user
      sidebar.style.position = 'fixed';
      sidebar.style.top = '100px';
    }
  });
}
