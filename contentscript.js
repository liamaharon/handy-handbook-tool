shouldChangeUrl =
      // checks if page can be viewed in single page
      document.getElementsByClassName("course__sidebar-full-details").length > 0 &&
      // check if we're already on single page view
      !window.location.href.includes('/print') &&
      // check if user has clicked subject specifics
      !window.location.href.includes('/eligibility-and-requirements') &&
      !window.location.href.includes('/assessment') &&
      !window.location.href.includes('/dates-times') &&
      !window.location.href.includes('/further-information') &&
      // check if user has clicked major specifics
      !window.location.href.includes('/components') &&
      !window.location.href.includes('/course-structure') &&
      !window.location.href.includes('/subject-options') &&
      // check if user has clicked course specifics (note there is some crossover with major)
      !window.location.href.includes('/entry-participation-requirements') &&
      !window.location.href.includes('/attributes-outcomes-skills') &&
      !window.location.href.includes('/breadth-requirements') &&
      !window.location.href.includes('/majors-minors-specialisations') &&
      !window.location.href.includes('/further-study') &&
      !window.location.href.includes('/notes');

// if we're not already on single page view and can be in it transition, change url
if (shouldChangeUrl) {
  newUrl = window.location.href + "/print";
  window.location.replace(newUrl);
}
