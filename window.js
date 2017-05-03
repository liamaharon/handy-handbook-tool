// make sidebar scroll with user
// specify point to start scrolling
if (document.getElementsByClassName("course__sidebar-full-details").length > 0) {
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
