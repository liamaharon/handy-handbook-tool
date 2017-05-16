// remove # anchor from url we're looking at so we get the single page content
// from right place
const curUrl = window.location.href.split('#')[0];
// apply single page view
if (doChanges(curUrl)) {
	setupLoadingOverlay();

  // get html from single page view page, and run main logic
	const allInfoUrl = curUrl + "/print";
  $.get(allInfoUrl, function(singlePageHtml, status){
    // main logic
    replaceContent(singlePageHtml);
    setupSidebar();
    setupAccordions();
		setupAutoScroll();
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


  // setup scroll to top
  $('.course__sidebar-navigation').prepend('<li id="scrolltop"><a>Top</a></li>');
  $("#scrolltop").click(function() {
    $("html, body").animate({ scrollTop: 0 }, "medium");
  });

  // setup links on sidebar
  $('.layout-sidebar__side__inner a').each(function(){
    text = this.innerHTML;
    $(this).css('cursor', 'pointer');
    // change timetable text
    if (text.includes('Timetable')) {
      $(this).text('Timetable (open in new tab)');
    }
    // special case for "Attributes, outcomes and skills" for courses needs to
    // go to "LEARNING OUTCOMES"
    else if (text.includes('Attributes')) {
      foundin = $(`h2:contains("Learning outcomes")`);
      idToUse = "Outcomes";
      $(foundin[0]).prop('id', idToUse + "_t");
      $(this).prop('id', idToUse);
      $(this).removeAttr('href');
      $(this).click(function() {
        $("html, body").animate({
          scrollTop: $(`#${this.id}_t`).offset().top - 40
        }, 'medium');
      })
    }
    // special case for "refer to the specific study period" needs to go to
    // dates and times
    else if (text.includes('refer to the specific study period')) {
      foundin = $(`h2:contains("Dates & times")`);
      idToUse = "Datess";
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
      foundin = $(`h2:contains("${text.split(" ")[0]}")`);
      // make an id. for some reason for long inputs it breaks the scroll to
      // class, so make sure it is small here
      if (text.length < 4) {
        idToUse = text;
      } else {
        idToUse = text.slice(0,5) + text.slice(-1);
      }
      // _t for target
      $(foundin[0]).prop('id', idToUse + '_t');
      $(this).prop('id', idToUse);
      $(this).removeAttr('href');
      $(this).click(function() {
        // overview needs to end scroll a bit higher on the page
        this.id === 'Overvw' ? offset = 70 : offset = 50;
        $("html, body").animate({
          scrollTop: $(`#${this.id}_t`).offset().top - offset
        }, 'medium');
      })
    }
  })
  // move contact infomation into overview if we're looking at a course
  if (document.getElementsByClassName("course__sidebar-section--contact").length > 0 || document.getElementsByClassName("course__sidebar-section").length > 0) {
    $('.course__sidebar-section--contact').appendTo('.course__overview-wrapper');
    $('.course__sidebar-section').appendTo('.course__overview-wrapper');
    // rename as to not be ambiguous
    $("#Overvw_t").html("Overview and contact");
    $("#Overvw").html("Overview and contact");
    // give a bit of padding for shameless plug
    $('.course__sidebar-navigation').css('padding-bottom', '10px');
  }
  // shameless plug
  $('.layout-sidebar__side__inner').append('<h3>Powered by <a href="https://chrome.google.com/webstore/detail/handy-handbook-tool/kgjgnfjefohopigifkpplgjcmobgmoch" target="_blank">Handy Handbook Tool</a></h3><p><a href="https://goo.gl/forms/cb2UvWVQTueMsLej2" target="_blank">Report bugs and give feedback (new tab)</a></p>');
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
