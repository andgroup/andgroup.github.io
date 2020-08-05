$(init);

function init() {
  var main = ".main-gallery";
  // var nav = ".nav-gallery";

  var mainOptions = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true
    // arrows: false,
    // asNavFor: nav
  };
  // var navOptions = {
  //   slidesToShow: 4,
  //   slidesToScroll: 4,
  //   // arrows: false,
  //   focusOnSelect: true,
  //   asNavFor: main
  // };

  $(main).slick(mainOptions);
  // $(nav).slick(navOptions);

  $(window).resize(throttle(function() {
      $(main).slick("unslick");
      // $(nav).slick("unslick");
      $(main).slick(mainOptions);
      // $(nav).slick(navOptions);
    }, 500));
};

// https://stackoverflow.com/questions/27078285/simple-throttle-in-js#27078401
function throttle(func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function() {
    var now = Date.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};
