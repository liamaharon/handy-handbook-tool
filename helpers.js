// list of 'bad URLs' should not activate HHT on any of these pages
var badUrlList = [
    '/print',
    '/eligibility-and-requirements',
    '/assessment',
    '/dates-times',
    '/further-information',
    '/course-structure',
    '/subject-options',
    '/entry-participation-requirements',
    '/attributes-outcomes-skills',
    '/breadth-requirements',
    '/majors-minors-specialisations',
    '/further-study',
    '/notes'
];

// makes loading overlay show up when ajax request is running
/***********************************************/
function setupLoadingOverlay() {
    $(document).ajaxStart(function() {
        $.LoadingOverlay("show");
    });
    $(document).ajaxStop(function() {
        $.LoadingOverlay("hide");
    });
}

// checks if we're on page that we can use HHT with
/***********************************************/
function doChanges(curUrl) {
    // checks if page can be viewed in single page
    if (document.getElementsByClassName("course__sidebar-full-details").length <= 0) {
        return false;
    }

    var count = badUrlList.length
    // check to see if we're on a page that should not be viewed using HHT
    for (var i = 0; i < count; i++) {
        if (curUrl.includes(badUrlList[i])) {
            return false;
        }
    }

    // passed all tests - clear to activate HHT!
    return true;
}

/***********************************************/

// make sidebar scroll with user
// specify point to start scrolling
function setupAutoScroll() {
    $('.header--course-and-subject').append('<div id="startScroll"></div>');
    startScroll = $('#startScroll').offset().top;
    window.addEventListener('scroll', function(evt) {
        // This value is your scroll distance from the top
        var distance_from_top = document.documentElement ? document.documentElement.scrollTop : document.body.scrollTop;
        var sidebar = document.querySelector(".layout-sidebar__side__inner");
        // stop scrolling, reached upper bound
        if (distance_from_top < startScroll) {
            sidebar.style.position = "absolute";
            sidebar.style.top = "";
        }
        // make div follow user
        else if (distance_from_top >= startScroll) {
            var sidebar = document.querySelector(".layout-sidebar__side__inner");
            sidebar.style.position = "fixed";
            sidebar.style.top = "100px";
        }
    });
}
// todo: make sidebar stop scrolling when reached bottom of page
// specify point to end scrolling
// $('footer').prepend('<div id="endScroll"></div>');
// endScroll = $('#endScroll').offset().top
