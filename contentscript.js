const curUrl = window.location.href;
const shouldChangeUrl =
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

// if we're not already on single page view and can be in it transition, change url
if (shouldChangeUrl) {
  const newUrl = curUrl + "/print";
  window.location.replace(newUrl);
}
