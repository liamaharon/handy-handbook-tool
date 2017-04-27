
const curUrl = window.location.href;
const applySinglePage =
      // checks if page can be viewed in single page
      document.getElementsByClassName("course__sidebar-full-details").length > 0 &&
      // check if we're already on single page view
      !curUrl.includes('/print') &&
      // check if user has clicked subject specifics
      !curUrl.includes('/eligibility-and-requirements') &&
      !curUrl.includes('/assessment') &&
      !curUrl.includes('/dates-times') &&
      !curUrl.includes('/further-information') &&
      // check if user has clicked major specifics
      !curUrl.includes('/components') &&
      !curUrl.includes('/course-structure') &&
      !curUrl.includes('/subject-options') &&
      // check if user has clicked course specifics (note there is some crossover with major)
      !curUrl.includes('/entry-participation-requirements') &&
      !curUrl.includes('/attributes-outcomes-skills') &&
      !curUrl.includes('/breadth-requirements') &&
      !curUrl.includes('/majors-minors-specialisations') &&
      !curUrl.includes('/further-study') &&
      !curUrl.includes('/notes');

// apply single page view
if (applySinglePage) {
  const newUrl = curUrl + "/print";
  // get html from single page view page
  $.get(newUrl, function(singlePageHtml, status){
    // parse
    const singlePageElements = $(singlePageHtml);
    // get part we want
    const singlePageCourse = $('.course', singlePageElements);
    // replace course with single page course
    $('.course').empty();
    $('.course').append(singlePageCourse);
    // remove single page link
    $('.course__sidebar-full-details').remove();
    // remove stupid sidebar
    // $('.layout-sidebar__side__inner').remove();

    $('.layout-sidebar__side__inner a').each(function(){
      text = this.innerHTML;
      if (text.includes('Timetable')) {
        $(this).text('Timetable (open in new tab)');
      }
      // special case as dates in content is spelt with '&' instead of 'and'
      else if (text.includes('Dates')) {
        foundin = $(`h2:contains("Dates & times")`);
        $(foundin[0]).attr('id', text);
        console.log(foundin[0]);
        $(this).attr('href', `#${text}`);
      }
      // don't pickup on timetable
      else {
        foundin = $(`h2:contains("${text}")`);
        $(foundin[0]).attr('id', text);
        console.log(foundin[0]);
        $(this).attr('href', `#${text}`);
      }
    })
  });
}

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





// make snapping to anchor snap a little above it
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
