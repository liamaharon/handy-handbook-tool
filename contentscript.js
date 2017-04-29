// remove # anchor from url we're looking at so we get the single page content
// from right place
const curUrl = window.location.href.split('#')[0];
// apply single page view
if (doChanges(curUrl)) {
  const newUrl = curUrl + "/print";
  // get html from single page view page, and run main logic
  $.get(newUrl, function(singlePageHtml, status){
    // main logic
    replaceContent(singlePageHtml);
    setupSidebar();
    setupAccordions();
  })
}

// replace content we don't want with single page view content
/***********************************************/
function replaceContent(singlePageHtml) {
  // parse
  const singlePageElements = $(singlePageHtml);
  // get part we want
  const singlePageCourse = $('.course', singlePageElements);
  // replace course with single page course
  $('.course').empty();
  $('.course').append(singlePageCourse);
}
/***********************************************/

// setup sidebar links to scroll to point in page
/***********************************************/
function setupSidebar() {
  // empty content to go to single page view but IMPORTANT that we leave the
  // class so page knows it's special on reload
  $('.course__sidebar-full-details').empty();

  // minor styling
  $('.course__sidebar-navigation-heading').text('Scroll to');
  $('.course__sidebar-full-details').css('margin', '0px');
  $('.course__sidebar-full-details').css('padding', '0px');
  $('.course__sidebar-navigation').css('padding', '0px');
  $('.course__sidebar').css('width', '30em');
  $('.course__sidebar').css('padding-left', '3.45em');

  $('.layout-sidebar__side__inner').append('<i><strong>Powered by Handy Handbook Tool</strong></i>');

  // setup scroll to top
  $('.course__sidebar-navigation').prepend('<li id="scrolltop"><a>Top</a></li>');
  $("#scrolltop").click(function() {
    $("html, body").animate({ scrollTop: 0 }, "medium");
  });

  $('.layout-sidebar__side__inner a').each(function(){
    text = this.innerHTML;
    // change timetable text
    if (text.includes('Timetable')) {
      $(this).text('Timetable (open in new tab)');
    }
    // special case as dates in content is spelt with '&' instead of 'and'.
    // also allow for link from 'refer to specific study period'
    else if (text.includes('Dates') || text.includes('specific study period')) {
      foundin = $(`h2:contains("Dates & times")`);
      idToUse = "Datestimes";
      $(foundin[0]).prop('id', idToUse + "_t");
      $(this).prop('id', idToUse);
      $(this).removeAttr('href');
      $(this).click(function() {
        $("html, body").animate({
          scrollTop: $(`#${this.id}_t`).offset().top - 40
        }, 'medium');
      })
    }
    // all other tags we need links to in doc
    else {
      foundin = $(`h2:contains("${text}")`);
      // make an id. for some reason for long inputs it breaks the scroll to
      // class, so make sure it is small here
      if (text.length < 4) {
        idToUse = text;
      } else {
        idToUse = text.slice(0,5) + text.slice(-1);
      }
      // _t for target
      $(foundin[0]).prop('id', idToUse + '_t');
      console.log(foundin[0]);
      $(this).prop('id', idToUse);
      $(this).removeAttr('href');
      $(this).click(function() {
        $("html, body").animate({
          scrollTop: $(`#${this.id}_t`).offset().top - 40
        }, 'medium');
      })
    }
  })
}
/***********************************************/

// change accordians class on click so they expand and collapse
/***********************************************/
function setupAccordions() {
  $('.accordion li').each(function(){
    $(this).click(function() {
      $(this).toggleClass('accordion__visible');
    })
  })
}
/***********************************************/

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
