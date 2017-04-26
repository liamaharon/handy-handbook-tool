// checks if element to view page is in html
canChangeUrl = document.getElementsByClassName("course__sidebar-full-details").length > 0;

// if we're not already on single page view and can be in it transition, change url
if (canChangeUrl &&
              //don't try to go to single page if already in single page view
              !window.location.href.includes('/print') &&
              //don't override subject when user has clicked specifics
              !window.location.href.includes('/eligibility-and-requirements') &&
              !window.location.href.includes('/assessment') &&
              !window.location.href.includes('/dates-times') &&
              !window.location.href.includes('/further-information') &&
              //don't override major when user has clicked specifics
              !window.location.href.includes('/components') &&
              !window.location.href.includes('/course-structure') &&
              !window.location.href.includes('/subject-options') &&
              //don't override course when user has clicked specifics (note there is some crossover with major)
              !window.location.href.includes('/entry-participation-requirements') &&
              !window.location.href.includes('/attributes-outcomes-skills') &&
              !window.location.href.includes('/breadth-requirements') &&
              !window.location.href.includes('/majors-minors-specialisations') &&
              !window.location.href.includes('/further-study') &&
              !window.location.href.includes('/notes'))
{
  newUrl = window.location.href + "/print";
  window.location.replace(newUrl);
}
