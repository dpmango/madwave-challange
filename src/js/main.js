$(document).ready(function(){

 	// Prevent # errors
	$('[href="#"]').click(function (e) {
		e.preventDefault();
	});

  $('.hamburger').on('click', function(){
    $(this).toggleClass('is-active');
    $('.mobile-nav').slideToggle(400);

  });

	// smoth scroll
	$('a[href^="#section"]').click(function(){
        var el = $(this).attr('href');
        $('body').animate({
            scrollTop: $(el).offset().top}, 1000);
        return false;
	});

  $(window).scroll(function(){
    var sticky = $('.header'),
        scroll = $(window).scrollTop();

    if (scroll >= 550) sticky.addClass('sticky');
    else sticky.removeClass('sticky');
  });

  $('#owlPartners').owlCarousel({
      loop: true,
      margin: 0,
      nav: false,
      dots: true,
      items: 1,
      autoplay: false,
      margin: 30,
      responsive:{
        0:{
            items: 1
        },
        500:{
            items: 2
        },
        992:{
            items: 3
        },
        1200:{
          items: 3
        }
      }
  });

  $('#owlProducts').owlCarousel({
      loop: true,
      margin: 0,
      nav: false,
      dots: true,
      autoplay: false,
      margin: 30,
      responsive:{
        0:{
            items: 1
        },
        430:{
            items: 2
        },
        992:{
            items: 3
        },
        1200:{
          items: 4
        }
      }
  });

  $('#owlSouvenier').owlCarousel({
    loop: true,
    margin: 0,
    nav: false,
    dots: true,
    autoplay: false,
    margin: 30,
    responsive:{
      0:{
          items: 1
      },
      430:{
          items: 2
      },
      992:{
          items: 3
      },
      1200:{
        items: 4
      }
    }
  });


  $("input[name=phone]").mask("+7 (999) 999-9999");


  $('.popup-with-move-anim').magnificPopup({
    type: 'inline',

    fixedContentPos: false,
    fixedBgPos: true,

    overflowY: 'auto',

    closeBtnInside: true,
    preloader: false,

    midClick: true,
    removalDelay: 300,
    mainClass: 'my-mfp-slide-bottom'
  });

  $('.popup-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
				return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
			}
		}
	});

  $('#morePhotos').on('click', function(){
    $('.gallery__more').fadeIn(300);
  });


  // Create Countdown
  var Countdown = {

    // Backbone-like structure
    $el: $('.counter__nums'),

    // Params
    countdown_interval: null,
    total_seconds     : 0,

    // Initialize the countdown
    init: function() {

      // DOM
  		this.$ = {
        days  : this.$el.find('.bloc-time.days .figure'),
      	hours  : this.$el.find('.bloc-time.hours .figure'),
      	minutes: this.$el.find('.bloc-time.min .figure'),
      	seconds: this.$el.find('.bloc-time.sec .figure')
     	};

      var countMonth = this.$el.data('month');
      var countDay = this.$el.data('day');
      var countHour = this.$el.data('hour');
      var countMin = this.$el.data('minute');

      var currentDate = new Date();

      var a = moment([2017, countMonth, countDay, countHour, countMin]);
      var b = moment([2017, currentDate.getMonth() + 1, currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds()]);

      // Init countdown values
      this.values = {
          days  : a.diff(b, 'days'),
          hours  : a.diff(b, 'hours') - (a.diff(b, 'days') * 24),
          minutes: Math.abs(a.diff(b, 'minutes') - (a.diff(b, 'hours') * 60) - (a.diff(b, 'days') * 24)),
          seconds: 30,
      };

      // this.values = {
      //     days  : this.$.days.parent().attr('data-init-value'),
  	  //     hours  : this.$.hours.parent().attr('data-init-value'),
      //     minutes: this.$.minutes.parent().attr('data-init-value'),
      //     seconds: this.$.seconds.parent().attr('data-init-value'),
      // };

      // Initialize total seconds
      this.total_seconds = this.values.days * 60 * 60 * 60 + this.values.hours * 60 * 60 + (this.values.minutes * 60) + this.values.seconds;

      // Animate countdown to the end
      this.count();
    },

    count: function() {

      var that    = this,
          $day_1  = this.$.days.eq(0),
          $day_2  = this.$.days.eq(1),
          $hour_1 = this.$.hours.eq(0),
          $hour_2 = this.$.hours.eq(1),
          $min_1  = this.$.minutes.eq(0),
          $min_2  = this.$.minutes.eq(1),
          $sec_1  = this.$.seconds.eq(0),
          $sec_2  = this.$.seconds.eq(1);

          this.countdown_interval = setInterval(function() {

          if(that.total_seconds > 0) {

              --that.values.seconds;

              if(that.values.minutes >= 0 && that.values.seconds < 0) {

                  that.values.seconds = 59;
                  --that.values.minutes;
              }

              if(that.values.hours >= 0 && that.values.minutes < 0) {

                  that.values.minutes = 59;
                  --that.values.hours;
              }

              if(that.values.days >= 0 && that.values.hours < 0) {

                  that.values.hours = 24;
                  --that.values.days;
              }

              // Update DOM values
              // Days
              that.checkHour(that.values.days, $day_1, $day_2);

              // Hours
              that.checkHour(that.values.hours, $hour_1, $hour_2);

              // Minutes
              that.checkHour(that.values.minutes, $min_1, $min_2);

              // Seconds
              that.checkHour(that.values.seconds, $sec_1, $sec_2);

              --that.total_seconds;
          }
          else {
              clearInterval(that.countdown_interval);
          }
      }, 1000);
    },

    animateFigure: function($el, value) {

       var that         = this,
  		     $top         = $el.find('.top'),
           $bottom      = $el.find('.bottom'),
           $back_top    = $el.find('.top-back'),
           $back_bottom = $el.find('.bottom-back');

      // Before we begin, change the back value
      $back_top.find('span').html(value);

      // Also change the back bottom value
      $back_bottom.find('span').html(value);

      // Then animate
      TweenMax.to($top, 0.8, {
          rotationX           : '-180deg',
          transformPerspective: 300,
  	      ease                : Quart.easeOut,
          onComplete          : function() {

              $top.html(value);

              $bottom.html(value);

              TweenMax.set($top, { rotationX: 0 });
          }
      });

      TweenMax.to($back_top, 0.8, {
          rotationX           : 0,
          transformPerspective: 300,
  	      ease                : Quart.easeOut,
          clearProps          : 'all'
      });
    },

    checkHour: function(value, $el_1, $el_2) {

      var val_1       = value.toString().charAt(0),
          val_2       = value.toString().charAt(1),
          fig_1_value = $el_1.find('.top').html(),
          fig_2_value = $el_2.find('.top').html();

      if(value >= 10) {

          // Animate only if the figure has changed
          if(fig_1_value !== val_1) this.animateFigure($el_1, val_1);
          if(fig_2_value !== val_2) this.animateFigure($el_2, val_2);
      }
      else {

          // If we are under 10, replace first figure with 0
          if(fig_1_value !== '0') this.animateFigure($el_1, 0);
          if(fig_2_value !== val_1) this.animateFigure($el_2, val_1);
      }
    }
  };

  // Let's go !
  Countdown.init();


});
