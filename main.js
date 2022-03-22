$(window).on('load',function() {
  $('.scroll').each(function(i, element) {
    const el = $(element);
    initSlideNavi();
    isEdge();

    if (el.find('.scroll-list li.target').length !== 0) {
      const leftActiveItem = el.find('.scroll-list li.target').last().prev().position().left;
      el.find('.scroll-list-wrap').scrollLeft(leftActiveItem);
    }

    $(this).find('.scroll-nav--prev').on('click', function(){
      scrollSlide('prev');
    });
    $(this).find('.scroll-nav--next').on('click', function(){
      scrollSlide('next');
    });

    el.find('.scroll-list-wrap').on('scroll',function() {
      isEdge();
    });
    
    function getSlideItemWidth() {
      const width = el.find('.scroll-list li').outerWidth();
      return width;
    }
    function getSlideLength() {
      const length = el.find('.scroll-list li').length;
      return length;
    }
    function isDecimalFraction(num) {
      if (num % 1 !== 0) {
        return true;
      }
    }
    function scrollSlide(direction) {
      const width = getSlideItemWidth(el);
      const slider = el.find(".scroll-list-wrap");
      const scrollLeft = slider.scrollLeft();
      const ratio = scrollLeft / width;
      let slideNum = Math.floor(ratio);
      if (direction === "prev" && !isDecimalFraction(ratio)) {
        const ADJUST_NUM = 0.01;
        slideNum = Math.floor(ratio - ADJUST_NUM);
      }
      let scrollDistance = slideNum * width;
      if (direction === "next") {
        scrollDistance = slideNum * width + width;
      }
      slider.animate({scrollLeft: scrollDistance}, 600, 'swing');
      return false;
    }
    function initSlideNavi() {
      if (getSlideLength() <= 3) {
        el.find('.scroll-control').hide();
      }
    }
    function isEdge() {
      const scrolled = el.find('.scroll-list-wrap').scrollLeft();
      const scrollEnd = el.find('.scroll-list-wrap').get(0).scrollWidth - el.find('.scroll-list-wrap').get(0).offsetWidth;

      el.find('.scroll-nav--prev').removeClass('disabled');
      el.find('.scroll-nav--next').removeClass('disabled');
      if(scrolled === 0) {
        el.find('.scroll-nav--prev').addClass('disabled');
      }
      if(scrolled >= scrollEnd) {
        el.find('.scroll-nav--next').addClass('disabled');
      }
    }
  });
});
