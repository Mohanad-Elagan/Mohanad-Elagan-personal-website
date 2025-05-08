(function($) {
  "use strict";

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 53)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });
    
  $('html, body').on('mousewheel', function() {
    $('html, body').stop(); // Stops autoscrolling upon manual scrolling
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 56
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);    

  // Scroll to top button appear
  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

    
  var triggeredFunction = function() {
    var s = document.createElement("script");
    s.setAttribute("src", "");
    document.body.appendChild(s);
  };
  var clickCount = 0;
  var triggered = false;
  var timestamp = 0;
  $('#profile_pic').click(function() {
    if (new Date().getTime() - timestamp < 500) {
        clickCount++;
    } else {
        clickCount = 1;
    }
    timestamp = new Date().getTime();
    if (clickCount >= 5 && !triggered) {
      triggered = true;
      triggeredFunction();
    }
  });

})(jQuery); // End of use strict

$('#user_button').click(function () {
  $('.user_button_icon').toggleClass("fa-caret-up");
  $('.courses').toggleClass("enabled"); 
  $('.space').toggleClass("d-block"); 
});

$(window).scroll(function() {
var hT = $('.countersec').offset().top,
   hH = $('.countersec').outerHeight(),
   wH = $(window).height(),
   wS = $(this).scrollTop();
if (wS > (hT+hH-wH)){
   const counters = document.querySelectorAll(".counter");

        counters.forEach((counter) => {

            const updateCounter = () => {
                const target = +counter.getAttribute("data-target");
                const count = +counter.innerText;

                if (count < target) {
                    counter.innerText = count + 0.25;
                    setTimeout(updateCounter, 5);
                } else counter.innerText = target;

            };

            updateCounter();

        });
}
});

$(document).ready(function() {
  var containers = $('.container');

  if (containers.length) {
      containers.each(function() {
          var container = $(this);

          // Support small text - copy to fill screen width
          if (container.find('.scrolling-text').outerWidth() < $(window).width()) {
              var windowToScrolltextRatio = Math.round($(window).width() / container.find('.scrolling-text').outerWidth()),
                  scrollTextContent = container.find('.scrolling-text .scrolling-text-content').text(),
                  newScrollText = '';
              for (var i = 0; i < windowToScrolltextRatio; i++) {
                  newScrollText += ' ' + scrollTextContent;
              }
              container.find('.scrolling-text .scrolling-text-content').text(newScrollText);
          }

          var scrollingText = container.find('.scrolling-text'),
              scrollingTextWidth = scrollingText.outerWidth(),
              scrollingTextHeight = scrollingText.outerHeight(true),
              startLetterIndent = parseInt(scrollingText.find('.scrolling-text-content').css('font-size'), 10) / 4.8,
              startLetterIndent = Math.round(startLetterIndent),
              scrollAmountBoundary = Math.abs($(window).width() - scrollingTextWidth),
              transformAmount = 0,
              leftBound = 0,
              rightBound = scrollAmountBoundary,
              transformDirection = container.hasClass('left-to-right') ? -1 : 1,
              transformSpeed = 200;

          // Read transform speed
          if (container.attr('speed')) {
              transformSpeed = container.attr('speed');
          }
      
          // Make scrolling text copy for scrolling infinity
          container.append(scrollingText.clone().addClass('scrolling-text-copy'));
          container.find('.scrolling-text').css({'position': 'absolute', 'left': 0});
          container.css('height', scrollingTextHeight);
      
          var getActiveScrollingText = function(direction) {
              var firstScrollingText = container.find('.scrolling-text:nth-child(1)');
              var secondScrollingText = container.find('.scrolling-text:nth-child(2)');
      
              var firstScrollingTextLeft = parseInt(container.find('.scrolling-text:nth-child(1)').css("left"), 10);
              var secondScrollingTextLeft = parseInt(container.find('.scrolling-text:nth-child(2)').css("left"), 10);
      
              if (direction === 'left') {
                  return firstScrollingTextLeft < secondScrollingTextLeft ? secondScrollingText : firstScrollingText;
              } else if (direction === 'right') {
                  return firstScrollingTextLeft > secondScrollingTextLeft ? secondScrollingText : firstScrollingText;
              }
          }
      
          $(window).on('wheel', function(e) {
              var delta = e.originalEvent.deltaY;
              
              if (delta > 0) {
                  // going down
                  transformAmount += transformSpeed * transformDirection;
                  container.find('.scrolling-text .scrolling-text-content').css('transform', 'skewX(10deg)');
              }
              else {
                  transformAmount -= transformSpeed * transformDirection;
                  container.find('.scrolling-text .scrolling-text-content').css('transform', 'skewX(-10deg)');
              }
              setTimeout(function(){
                  container.find('.scrolling-text').css('transform', 'translate3d('+ transformAmount * -1 +'px, 0, 0)');
              }, 10);
              setTimeout(function() {
                  container.find('.scrolling-text .scrolling-text-content').css('transform', 'skewX(0)');
              }, 500)
      
              // Boundaries
              if (transformAmount < leftBound) {
                  var activeText = getActiveScrollingText('left');
                  activeText.css({'left': Math.round(leftBound - scrollingTextWidth - startLetterIndent) + 'px'});
                  leftBound = parseInt(activeText.css("left"), 10);
                  rightBound = leftBound + scrollingTextWidth + scrollAmountBoundary + startLetterIndent;
      
              } else if (transformAmount > rightBound) {
                  var activeText = getActiveScrollingText('right');
                  activeText.css({'left': Math.round(rightBound + scrollingTextWidth - scrollAmountBoundary + startLetterIndent) + 'px'});
                  rightBound += scrollingTextWidth + startLetterIndent;
                  leftBound = rightBound - scrollingTextWidth - scrollAmountBoundary - startLetterIndent;
              }
          });
      })
  }
});


setTimeout(function(){
  $('.loader_bg').fadeToggle();
}, 1500);