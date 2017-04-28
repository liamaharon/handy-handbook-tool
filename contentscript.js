// remove # anchor from url we're looking at so we get the single page content
// from right place
const curUrl = window.location.href.split('#')[0];
// apply single page view
if (doChanges(curUrl)) {
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
    // empty content to go to single page view but IMPORTANT that we leave the
    // class so page knows it's special on reload
    $('.course__sidebar-full-details').empty();

    $('.layout-sidebar__side__inner a').each(function(){
      text = this.innerHTML;
      if (text.includes('Timetable')) {
        $(this).text('Timetable (open in new tab)');
      }
      // special case as dates in content is spelt with '&' instead of 'and'.
      // also allow for link from 'refer to specific study period'
      else if (text.includes('Dates') || text.includes('period')) {
        foundin = $(`h2:contains("Dates & times")`);
        $(foundin[0]).attr('id', "Dates & times");
        console.log(foundin[0]);
        $(this).attr('href', `#Dates & times`);
      }
      // don't pickup on timetable
      else {
        foundin = $(`h2:contains("${text}")`);
        $(foundin[0]).attr('id', text);
        console.log(foundin[0]);
        $(this).attr('href', `#${text}`);
      }
    })
    // make accordians work
    $('.accordion li').each(function(){
      $(this).click(function() {
        $(this).toggleClass('accordion__visible');
      })
    })
  })
}

// checks if we're on page that we can should change
/***********************************************/
function doChanges(curUrl) {

  // checks if page can be viewed in single page
  if (
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
  !curUrl.includes('/notes')
  ) {
      return true
  }
  return false
}
/***********************************************/
