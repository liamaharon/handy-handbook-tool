// make sidebar scroll with user
$('.header--course-and-subject').append('<div id="scrollPoint"></div>');
scrollHeight = $('#scrollPoint').offset().top
window.addEventListener('scroll', function (evt) {
  // This value is your scroll distance from the top
  var distance_from_top = document.body.scrollTop;
  // stop scrolling, reached upper bound
  if (distance_from_top < scrollHeight) {
    $('.layout-sidebar__side__inner').css("position", "absolute");
    $('.layout-sidebar__side__inner').css("top", "");
  }

  // make div follow user
  if(distance_from_top >= scrollHeight) {
    $('.layout-sidebar__side__inner').css("position", "fixed");
    $('.layout-sidebar__side__inner').css("top", "100px");
  }
});
