// checks if element to view page is in html
shouldChangeUrl = document.getElementsByClassName("course__sidebar-full-details").length > 0;

// if we're not already on single page view and can be in it transition
if (shouldChangeUrl && !window.location.href.includes('/print')) {
  newUrl = window.location.href + "/print";
  window.location.replace(newUrl);
}
