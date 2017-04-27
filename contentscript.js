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
    // remove stupid sidebar
    $('.layout-sidebar__side').remove();
  })
}
