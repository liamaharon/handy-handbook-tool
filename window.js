/***********************************************/
/* contains window event listeners             */
/***********************************************/

/***********************************************/
// make sidebar scroll with user
window.addEventListener('scroll', function (evt) {
  // This value is your scroll distance from the top
  var distance_from_top = document.body.scrollTop;
  // stop scrolling, reached upper bound
  if (distance_from_top < 223) {
    $('.layout-sidebar__side__inner').css("position", "absolute");
    $('.layout-sidebar__side__inner').css("top", "");
  }

  // make div follow user
  if(distance_from_top >= 223) {
    $('.layout-sidebar__side__inner').css("position", "fixed");
    $('.layout-sidebar__side__inner').css("top", "100px");
  }
});
/***********************************************/

// make snapping to anchor snap a little above it
/***********************************************/
// The function actually applying the offset
function offsetAnchor() {
  if (location.hash.length !== 0) {
    window.scrollTo(window.scrollX, window.scrollY - 40);
  }
}

// Captures click events of all <a> elements with href starting with #
$(document).on('click', 'a[href^="#"]', function(event) {
  // Click events are captured before hashchanges. Timeout
  // causes offsetAnchor to be called after the page jump.
  window.setTimeout(function() {
    offsetAnchor();
  }, 0);
});

// Set the offset when entering page with hash present in the url
window.setTimeout(offsetAnchor, 0);
/***********************************************/
