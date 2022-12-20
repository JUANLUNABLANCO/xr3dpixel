// #########################
// #
// # GENERAL
// #
// #########################

function init_UIKIT() {
    console.log("begin uikit");

    var $ = jQuery;
    var screenRes = $(window).width();
    var screenHeight = $(window).height();

    $("a").click(function(event) {
        event.preventDefault();
    });

    // Body Wrap
    // $(".body_wrap").css("min-height", screenHeight);
    // $(window).resize(function() {
    //     screenHeight = $(window).height();
    //     $(".body_wrap").css("min-height", screenHeight);
    // });

    // Remove outline in IE
    $("a, input, textarea").attr("hideFocus", "true").css("outline", "none");
    // Add gradient to IE
    setTimeout(function() {
        $("input, textarea, .select_styled, .body_wrap, .boxed-velvet .inner, .widget_categories li, .dropdown > li a, .tabs li a, .tab-pane, .comment-body .inner, .chzn-container, .carousel-title, .note").addClass("gradient");
    }, 0);

    // First Child, Last Child
    $(".widget-container li:first-child, .pricing_box li:first-child, .dropdown li:first-child, ol li:first-child").addClass("first");
    $(".widget-container li:last-child, .pricing_box li:last-child, .dropdown li:last-child, ol li:last-child").addClass("last");

    // buttons
    $(".btn").not(".btn-round").not(".btn-black").hover(function() {
        $(this).stop().animate({ "opacity": 0.8 });
    }, function() {
        $(this).stop().animate({ "opacity": 1 });
    });
    $('a.btn, span.btn').on('mousedown', function() {
        $(this).addClass('active')
    });
    $('a.btn, span.btn').on('mouseup mouseout', function() {
        $(this).removeClass('active')
    });

    // style Select, Radio, Checkbox  CUSEL??
    // if ($("select").hasClass("select_styled")) {
    //     cuSel({ changedEl: ".select_styled", visRows: 10 });
    // }
    // if ($("div,p").hasClass("input_styled")) {
    //     $(".input_styled input").customInput();
    // }

    // // NavBar Parents Arrow
    // $(".dropdown ul").parent("li").addClass("parent");
    // // NavBar
    // $(".dropdown ul li:first-child, .cusel span:first-child").addClass("first");
    // $(".dropdown ul li:last-child, .cusel span:last-child").addClass("last");





    // Tabs
    var $tabs_on_page = $('.tabs').length;
    var $bookmarks = 0;

    for (var i = 1; i <= $tabs_on_page; i++) {
        $('.tabs').eq(i - 1).addClass('tab_id' + i);
        $bookmarks = $('.tab_id' + i + ' li').length;
        $('.tab_id' + i).addClass('bookmarks' + $bookmarks);
    };

    $('.tabs li, .payment-form .btn').click(function() {
        setTimeout(function() {
            for (var i = 1; i <= $tabs_on_page; i++) {
                $bookmarks = $('.tab_id' + i + ' li').length;
                for (var j = 1; j <= $bookmarks; j++) {
                    $('.tab_id' + i).removeClass('active_bookmark' + j);

                    if ($('.tab_id' + i + ' li').eq(j - 1).hasClass('active')) {
                        $('.tab_id' + i).addClass('active_bookmark' + j);
                    }
                }
            }
        }, 0)
    });

    // Payment Form
    $('.payment-form #billing .btn, .payment-form #payment .btn-left').click(function() {
        $('a[href="#shipping"]').tab('show');
    });
    $('.payment-form #shipping .btn-left').click(function() {
        $('a[href="#billing"]').tab('show');
    });
    $('.payment-form #shipping .btn-red').click(function() {
        $('a[href="#payment"]').tab('show');
    });

    // Service List 2
    $('.service_list_2 .service_item').not(':even').addClass('even');
    $('.service_list_2 .service_item').not(':odd').addClass('odd');

    // prettyPhoto lightbox, check if <a> has atrr data-rel and hide for Mobiles
    if ($('a').is('[data-rel]') && screenRes > 600) {
        $('a[data-rel]').each(function() {
            $(this).attr('rel', $(this).data('rel'));
        });
        $("a[rel^='prettyPhoto']").prettyPhoto({ social_tools: false });
    };

    // Smooth Scroling of ID anchors
    function filterPath(string) {
        return string
            .replace(/^\//, '')
            .replace(/(index|default).[a-zA-Z]{3,4}$/, '')
            .replace(/\/$/, '');
    }
    var locationPath = filterPath(location.pathname);
    var scrollElem = scrollableElement('html', 'body');

    $('a[href*=#].anchor').each(function() {
        $(this).click(function(event) {
            var thisPath = filterPath(this.pathname) || locationPath;
            if (locationPath == thisPath &&
                (location.hostname == this.hostname || !this.hostname) &&
                this.hash.replace(/#/, '')) {
                var $target = $(this.hash),
                    target = this.hash;
                if (target && $target.length != 0) {
                    var targetOffset = $target.offset().top;
                    event.preventDefault();
                    $(scrollElem).animate({ scrollTop: targetOffset }, 400, function() {
                        location.hash = target;
                    });
                }
            }
        });
    });

    // use the first element that is "scrollable"
    function scrollableElement(els) {
        for (var i = 0, argLength = arguments.length; i < argLength; i++) {
            var el = arguments[i],
                $scrollElement = $(el);
            if ($scrollElement.scrollTop() > 0) {
                return el;
            } else {
                $scrollElement.scrollTop(1);
                var isScrollable = $scrollElement.scrollTop() > 0;
                $scrollElement.scrollTop(0);
                if (isScrollable) {
                    return el;
                }
            }
        }
        return [];
    };

    // Audio Player
    var $players_on_page = $('.jp-audio').length;
    var $song_title = '';

    if ($players_on_page > 0) {
        console.log("players on page: " + $players_on_page);
        for (var i = 1; i <= $players_on_page; i++) {
            $('.jp-audio').eq(i - 1).addClass('jp-audio' + i);
        };

        setTimeout(function() {
            for (var i = 1; i <= $players_on_page; i++) {
                $song_title = $('.jp-audio' + i + ' .jp-playlist ul li.jp-playlist-current .jp-playlist-item').html();
                $('.jp-audio' + i + ' .song_title').html($song_title);
            };
        }, 500);

        function switchSong() {
            setTimeout(function() {
                for (var i = 1; i <= $players_on_page; i++) {
                    $('.jp-audio' + i + ' .jp-previous, .jp-audio' + i + ' .jp-next').removeClass('disabled');

                    if ($('.jp-audio' + i + ' .jp-playlist ul li:last-child').hasClass('jp-playlist-current')) {
                        $('.jp-audio' + i + ' .jp-next').addClass('disabled');
                    }
                    if ($('.jp-audio' + i + ' .jp-playlist ul li:first-child').hasClass('jp-playlist-current')) {
                        $('.jp-audio' + i + ' .jp-previous').addClass('disabled');
                    }
                    $song_title = $('.jp-audio' + i + ' .jp-playlist ul li.jp-playlist-current .jp-playlist-item').html();
                    $('.jp-audio' + i + ' .song_title').html($song_title);
                }
            }, 0)
        };

        $('.jp-previous, .jp-next, .jp-playlist ul').click(function() {
            switchSong()
        });
        $(".jp-jplayer").on($.jPlayer.event.ended, function(event) {
            switchSong()
        });
    };

    // Placeholders
    // setTimeout(function() {
    //     if ($.Placeholder) {
    //         $.Placeholder.init({ color: "#ededed" });
    //     }
    // }, 0);

    // Scroll Bars
    // var $scrolls_on_page = $('.scrollbar.style2').length;
    // var $scroll_height = 0;

    // for (var i = 1; i <= $scrolls_on_page; i++) {
    //     $('.scrollbar.style2').eq(i - 1).addClass('id' + i);
    // };

    // setTimeout(function() {
    //     $(".jspTrack").append("<div class='jspProgress'></div>");
    //     $(document).on('jsp-scroll-y', '.scrollbar.style2', function() {
    //         for (var i = 1; i <= $scrolls_on_page; i++) {
    //             $scroll_height = $('.scrollbar.style2.id' + i + ' .jspDrag').css('top');
    //             $('.scrollbar.style2.id' + i + ' .jspDrag').siblings(".jspProgress").css({ "height": parseInt($scroll_height, 10) + 10 + "px" });
    //         }
    //     });
    // }, 0);

    // Rating Stars
    $(".rating span.star").hover(
        function() {
            $('.rating span.star').removeClass('on').addClass('off');
            $(this).prevAll().addClass('over');
        },
        function() {
            $(this).removeClass('over');
        }
    );

    $(".rating").mouseleave(function() {
        $(this).parent().find('.over')
            .removeClass('over');
    });

    $(".rating span.star").click(function() {
        $(this).prevAll().removeClass('off').addClass('on');
        $(this).removeClass('off').addClass('on');
    });

    // Crop Images in Image Slider

    // adds .naturalWidth() and .naturalHeight() methods to jQuery for retrieving a normalized naturalWidth and naturalHeight.
    // (function($) {
    //     var
    //         props = ['Width', 'Height'],
    //         prop;

    //     while (prop = props.pop()) {
    //         (function(natural, prop) {
    //             $.fn[natural] = (natural in new Image()) ?
    //                 function() {
    //                     return this[0][natural];
    //                 } :
    //                 function() {
    //                     var
    //                         node = this[0],
    //                         img,
    //                         value;

    //                     if (node.tagName.toLowerCase() === 'img') {
    //                         img = new Image();
    //                         img.src = node.src,
    //                             value = img[prop];
    //                     }
    //                     return value;
    //                 };
    //         }('natural' + prop, prop.toLowerCase()));
    //     }
    // }(jQuery));

    // var
    //     carousels_on_page = $('.carousel-inner').length,
    //     carouselWidth,
    //     carouselHeight,
    //     ratio,
    //     imgWidth,
    //     imgHeight,
    //     imgRatio,
    //     imgMargin,
    //     this_image,
    //     images_in_carousel;

    // for (var i = 1; i <= carousels_on_page; i++) {
    //     $('.carousel-inner').eq(i - 1).addClass('id' + i);
    // }

    /* añade comportamientos de dudosa reputacion a  las imagenes del slider, si fallan lo capas abajo */
    // function imageSize() {
    //     setTimeout(function() {
    //         for (var i = 1; i <= carousels_on_page; i++) {
    //             carouselWidth = $('.carousel-inner.id' + i + ' .item').width();
    //             carouselHeight = $('.carousel-inner.id' + i + ' .item').height();
    //             ratio = carouselWidth / carouselHeight; // 800/500

    //             images_in_carousel = $('.carousel-inner.id' + i + ' .item img').length;

    //             for (var j = 1; j <= images_in_carousel; j++) {
    //                 this_image = $('.carousel-inner.id' + i + ' .item img').eq(j - 1);
    //                 imgWidth = this_image.naturalWidth();
    //                 imgHeight = this_image.naturalHeight();
    //                 imgRatio = imgWidth / imgHeight;

    //                 if (ratio <= imgRatio) {
    //                     imgMargin = parseInt((carouselHeight / imgHeight * imgWidth - carouselWidth) / 2, 10);
    //                     this_image.css("cssText", "height: " + carouselHeight + "px; margin-left:-" + imgMargin + "px;");
    //                 } else {
    //                     imgMargin = parseInt((carouselWidth / imgWidth * imgHeight - carouselHeight) / 2, 10);
    //                     this_image.css("cssText", "width: " + carouselWidth + "px; margin-top:-" + imgMargin + "px;");
    //                 }
    //             }
    //         }
    //     }, 1000);
    // };
    // imageSize(); /* capar aqui en caso de fallo */
    // $(window).resize(function() {
    //     $('.carousel-indicators .first').click();
    //     imageSize(); /* capar aqui en caso de fallo */
    // });

} // UIKIT
// ############ PAGES: UIKIT
// ###################################################### init_CARDSLIDER
// solo se carga una vez en services
function  init_CARDSLIDER(){
  // ########### walkthrought_ases
  console.log("walkthrought_ases");
  (function() {

      var walkthrought_ases;
      walkthrought_ases = {
        index: 0,
        nextScreen: function() {
          if (this.index < this.indexMax()) {
            this.index++;
            return this.updateScreen();
          }
        },
        prevScreen: function() {
          if (this.index > 0) {
            this.index--;
            return this.updateScreen();
          }
        },
        updateScreen: function() {
          this.reset();
          this.goTo(this.index);
          return this.setBtns();
        },
        setBtns: function() {
          var $lastBtn, $nextBtn, $prevBtn;
          $nextBtn = $('.next-sc-ases');
          $prevBtn = $('.prev-sc-ases');
          $lastBtn = $('.finish-ases');
          if (walkthrought_ases.index === walkthrought_ases.indexMax()) {
            $nextBtn.prop('disabled', true);
            $prevBtn.prop('disabled', false);
            return $lastBtn.addClass('active').prop('disabled', false);
          } else if (walkthrought_ases.index === 0) {
            $nextBtn.prop('disabled', false);
            $prevBtn.prop('disabled', true);
            return $lastBtn.removeClass('active').prop('disabled', true);
          } else {
            $nextBtn.prop('disabled', false);
            $prevBtn.prop('disabled', false);
            return $lastBtn.removeClass('active').prop('disabled', true);
          }
        },
        goTo: function(index) {
          $('.screen-ases').eq(index).addClass('active');
          return $('.dot-ases').eq(index).addClass('active');
        },
        reset: function() {
          return $('.screen-ases, .dot-ases').removeClass('active');
        },
        indexMax: function() {
          return $('.screen-ases').length - 1;
        },
        closeModal: function() {
          $('.walkth-ases, .shade').removeClass('reveal');
          return setTimeout((() => {
            $('.walkth-ases, .shade').removeClass('show');
            this.index = 0;
            return this.updateScreen();
          }), 200);
        },
        openModal: function() {
          $('.walkth-ases, .shade').addClass('show');
          setTimeout((() => {
            return $('.walkth-ases, .shade').addClass('reveal');
          }), 200);
          return this.updateScreen();
        }
      };
      $('.next-sc-ases').click(function() {
        return walkthrought_ases.nextScreen();
      });
      $('.prev-sc-ases').click(function() {
        return walkthrought_ases.prevScreen();
      });
      $('.close-ases').click(function() {
        return walkthrought_ases.closeModal();
      });
      $('.open-walkth-ases').click(function() {
        return walkthrought_ases.openModal();
      });
      walkthrought_ases.openModal();

      // Optionally use arrow keys to navigate walkthrought_ases
      return $(document).keydown(function(e) {
        switch (e.which) {
          case 37:
            // left
            walkthrought_ases.prevScreen();
            break;
          case 38:
            // up
            walkthrought_ases.openModal();
            break;
          case 39:
            // right
            walkthrought_ases.nextScreen();
            break;
          case 40:
            // down
            walkthrought_ases.closeModal();
            break;
          default:
            return;
        }
        e.preventDefault();
      });


  }).call(this);

// ########## walkthrought_solu
// (function() {
//   var walkthrought_solu;
//       walkthrought_solu = {
//         index: 0,
//         nextScreen: function() {
//           if (this.index < this.indexMax()) {
//             this.index++;
//             return this.updateScreen();
//           }
//         },
//         prevScreen: function() {
//           if (this.index > 0) {
//             this.index--;
//             return this.updateScreen();
//           }
//         },
//         updateScreen: function() {
//           this.reset();
//           this.goTo(this.index);
//           return this.setBtns();
//         },
//         setBtns: function() {
//           var $lastBtn, $nextBtn, $prevBtn;
//           $nextBtn = $('.next-sc-solu');
//           $prevBtn = $('.prev-sc-solu');
//           $lastBtn = $('.finish-solu');
//           if (walkthrought_solu.index === walkthrought_solu.indexMax()) {
//             $nextBtn.prop('disabled', true);
//             $prevBtn.prop('disabled', false);
//             return $lastBtn.addClass('active').prop('disabled', false);
//           } else if (walkthrought_solu.index === 0) {
//             $nextBtn.prop('disabled', false);
//             $prevBtn.prop('disabled', true);
//             return $lastBtn.removeClass('active').prop('disabled', true);
//           } else {
//             $nextBtn.prop('disabled', false);
//             $prevBtn.prop('disabled', false);
//             return $lastBtn.removeClass('active').prop('disabled', true);
//           }
//         },
//         goTo: function(index) {
//           $('.screen-solu').eq(index).addClass('active');
//           return $('.dot-solu').eq(index).addClass('active');
//         },
//         reset: function() {
//           return $('.screen-solu, .dot-solu').removeClass('active');
//         },
//         indexMax: function() {
//           return $('.screen-solu').length - 1;
//         },
//         closeModal: function() {
//           $('.walkth-solu, .shade').removeClass('reveal');
//           return setTimeout((() => {
//             $('.walkth-solu, .shade').removeClass('show');
//             this.index = 0;
//             return this.updateScreen();
//           }), 200);
//         },
//         openModal: function() {
//           $('.walkth-solu, .shade').addClass('show');
//           setTimeout((() => {
//             return $('.walkth-solu, .shade').addClass('reveal');
//           }), 200);
//           return this.updateScreen();
//         }
//       };
//       $('.next-sc-solu').click(function() {
//         return walkthrought_solu.nextScreen();
//       });
//       $('.prev-sc-solu').click(function() {
//         return walkthrought_solu.prevScreen();
//       });
//       $('.close-solu').click(function() {
//         return walkthrought_solu.closeModal();
//       });
//       $('.open-walkth-solu').click(function() {
//         return walkthrought_solu.openModal();
//       });
//       walkthrought_solu.openModal();

//       // Optionally use arrow keys to navigate walkthrought_solu
//       return $(document).keydown(function(e) {
//         switch (e.which) {
//           case 37:
//             // left
//             walkthrought_solu.prevScreen();
//             break;
//           case 38:
//             // up
//             walkthrought_solu.openModal();
//             break;
//           case 39:
//             // right
//             walkthrought_solu.nextScreen();
//             break;
//           case 40:
//             // down
//             walkthrought_solu.closeModal();
//             break;
//           default:
//             return;
//         }
//         e.preventDefault();
//       });


//   }).call(this);


  // ########## walkthrought_even
// (function() {
//   var walkthrought_even;
//       walkthrought_even = {
//         index: 0,
//         nextScreen: function() {
//           if (this.index < this.indexMax()) {
//             this.index++;
//             return this.updateScreen();
//           }
//         },
//         prevScreen: function() {
//           if (this.index > 0) {
//             this.index--;
//             return this.updateScreen();
//           }
//         },
//         updateScreen: function() {
//           this.reset();
//           this.goTo(this.index);
//           return this.setBtns();
//         },
//         setBtns: function() {
//           var $lastBtn, $nextBtn, $prevBtn;
//           $nextBtn = $('.next-sc-even');
//           $prevBtn = $('.prev-sc-even');
//           $lastBtn = $('.finish-even');
//           if (walkthrought_even.index === walkthrought_even.indexMax()) {
//             $nextBtn.prop('disabled', true);
//             $prevBtn.prop('disabled', false);
//             return $lastBtn.addClass('active').prop('disabled', false);
//           } else if (walkthrought_even.index === 0) {
//             $nextBtn.prop('disabled', false);
//             $prevBtn.prop('disabled', true);
//             return $lastBtn.removeClass('active').prop('disabled', true);
//           } else {
//             $nextBtn.prop('disabled', false);
//             $prevBtn.prop('disabled', false);
//             return $lastBtn.removeClass('active').prop('disabled', true);
//           }
//         },
//         goTo: function(index) {
//           $('.screen-even').eq(index).addClass('active');
//           return $('.dot-even').eq(index).addClass('active');
//         },
//         reset: function() {
//           return $('.screen-even, .dot-even').removeClass('active');
//         },
//         indexMax: function() {
//           return $('.screen-even').length - 1;
//         },
//         closeModal: function() {
//           $('.walkth-even, .shade').removeClass('reveal');
//           return setTimeout((() => {
//             $('.walkth-even, .shade').removeClass('show');
//             this.index = 0;
//             return this.updateScreen();
//           }), 200);
//         },
//         openModal: function() {
//           $('.walkth-even, .shade').addClass('show');
//           setTimeout((() => {
//             return $('.walkth-even, .shade').addClass('reveal');
//           }), 200);
//           return this.updateScreen();
//         }
//       };
//       $('.next-sc-even').click(function() {
//         return walkthrought_even.nextScreen();
//       });
//       $('.prev-sc-even').click(function() {
//         return walkthrought_even.prevScreen();
//       });
//       $('.close-even').click(function() {
//         return walkthrought_even.closeModal();
//       });
//       $('.open-walkth-even').click(function() {
//         return walkthrought_even.openModal();
//       });
//       walkthrought_even.openModal();

//       // Optionally use arrow keys to navigate walkthrought_even
//       return $(document).keydown(function(e) {
//         switch (e.which) {
//           case 37:
//             // left
//             walkthrought_even.prevScreen();
//             break;
//           case 38:
//             // up
//             walkthrought_even.openModal();
//             break;
//           case 39:
//             // right
//             walkthrought_even.nextScreen();
//             break;
//           case 40:
//             // down
//             walkthrought_solu.closeModal();
//             break;
//           default:
//             return;
//         }
//         e.preventDefault();
//       });


//   }).call(this);

}
// ###################################################### JUMBOTRON CONTROL
// arranca el scroll del jumbotron
function init_JUMBOTRON(){
  var $jumbo_avr = $('#jumbotron-corporative');
  var $w = $(window);
  $w.scroll(function(){
    if($(this).scrollTop() <= 100) {
      $jumbo_avr.css(
        {'width':'100%',
        'height':'700px',
        '-webkit-transition':'all 1s ease',
        '-moz-transition':'all 1s ease',
        '-ms-transition':'all 1s ease',
        '-o-transition':'all 1s ease',
        'transition':'all 1s ease'
      });
    }if($(this).scrollTop() > 100) {

      if($(this).scrollTop() < 200){
        $jumbo_avr.css({'width':'100%','height':'320px'});
      }
      if($(this).scrollTop() > 200){
        $jumbo_avr.css({'width':'100%','height':'120px'});
      }
    }
  });
}
// ###################################################### logo
// controla el logo de la empres
function init_LOGO(){
  $("#caja-logo-small").css({'visibility':'hidden'});
    $(window).scroll(function() {
      if ($(window).scrollTop() > 20) {
        $("#caja-logo-small").css({'visibility':'visible'});
        $("#caja-logo-small").fadeIn("1500");//.fadeOut();
        $("#caja-logo-big").fadeOut("1000");//.fadeIn();
      } else {
        $("#caja-logo-big").fadeIn("1500");//.fadeOut();
        $("#caja-logo-small").fadeOut("1000");//.fadeIn();
      }
    });
}
// ###################################################### InitCAROUSEL
// controla los carousels
function init_CAROSUEL(){
  var cont=0;
  var current_img1 = cont;
  var current_img2 = current_img1++;
  var current_img3 = current_img2++;
  var current_img4 = current_img3++;

  // todo
  if ($('.wrapper-carousel').length) {

    var carousel = $('.wrapper-carousel')[0]; // puede haber más de uno y haría que modificar el script
    var images_carousel = $(carousel).find('.listhidden-carousel img'); // todas las imágenes del carousel

    // los que enseñaremos
    var imgs_visible = $(carousel).find('.view-carousel .item-carousel img');
    var titles_visibles = $(carousel).find('.view-carousel .item-carousel h2');  // los titulos
    // para sustituir en las visibles
    var imgs_selected = new Array();

    console.log(titles_visibles);

    function returnCurrents(direction){
      if (direction == null){
        current_img1 = cont;
        current_img2 = cont+1;
        current_img3 = cont+2;
        current_img4 = cont+3;

        if (cont < images_carousel.length - 4) {
          cont++;
        } else {
          cont=0;
        }
      }else if(direction == "right") {
        if (cont < images_carousel.length - 4) {
          cont++;
        } else {
          cont=0;
        }
        current_img1 = cont;
        current_img2 = cont+1;
        current_img3 = cont+2;
        current_img4 = cont+3;
      }else if(direction == "left"){
        if (cont > 0) {
          cont--;
        } else {
          cont= images_carousel.length - 4;
        }
        current_img1 = cont;
        current_img2 = cont+1;
        current_img3 = cont+2;
        current_img4 = cont+3;
      }
    }

    function changeIMGS( direction){

        returnCurrents(direction);
        imgs_selected = [
          images_carousel[current_img1],
          images_carousel[current_img2],
          images_carousel[current_img3],
          images_carousel[current_img4]
        ];
        for (i=0; i< imgs_visible.length; i++){
          imgs_visible[i].src = imgs_selected[i].src;
          imgs_visible[i].alt = imgs_selected[i].alt;
          titles_visibles[i].innerHTML = $(imgs_selected[i]).attr('data-title');
        }
      }

    setInterval(changeIMGS, 5000);

    $(carousel).find('.controls-carousel .left').click(function(){
      changeIMGS('left');
    });
    $(carousel).find('.controls-carousel .right').click(function(){
      changeIMGS('right');
    });


  }else {
    console.log("NO hay carousel");
  }
}
// ###################################################### IphonePortrait CONTROL
// dibuja un movil iphone y lo pone en marcha
function init_IphonePortrait(){

      $('.mobile-portrait .bottom').click(function(){
        $('.mobile-portrait .screen').toggleClass('active')
      });
      $('.mobile-landscape .bottom').click(function(){
        $('.mobile-landscape .screen').toggleClass('active')
      });

  }
// ###################################################### IphoneLandscape CONTROL
// dibuja tablet y controla los wrappers steps
function init_IphoneLandscape(){
  // inicialmente encendido
  $('.mobile-landscape .screen').addClass('active');

  $('.features-item').on('click', function() {
    var $this = $(this);
    $('.features-item.active').removeClass('active');
    $this.addClass('active');
    var imgsrc = $this.attr('data-src');

    $('.features-image img').attr('src', imgsrc);
  });

}
// ###################################################### videojs CONTROL
  function init_VIDEO(){
    console.log("reproductor de vídeo listo");

    // Our video container
      var video = $('.video_mine').find('video')[0];  // function this

      console.log(video);

      // Our buttons
      var playButton = $('.video_mine').find('.play')[0];
      var pauseButton = $('.video_mine').find('.pause')[0];
      var stopButton = $('.video_mine').find('.stop')[0];
      var muteButton = $('.video_mine').find('.mute')[0];
      var skip_backButton = $('.video_mine').find('.skip_back')[0];
      var skip_forwardButton = $('.video_mine').find('.skip_forward')[0];
      var seekBar =  $('.video_mine').find('.seek-bar')[0];
      var volumeBar =  $('.video_mine').find('.volume-bar')[0];
      var icon_volume = $(muteButton).find('i')[0];
      var fullScreenButton =  $('.video_mine').find('.full-screen')[0];

      // ##### Adding event listener for the 'Play/Pause' button
      $(playButton).click(function() {
        console.log("play click");
        if (video.paused == true) {
          // Play the video
          video.play();
          // cambiar el pause por play
          // $(playButton).replaceWidth($(pauseButton));
        } else {
          // Pause the video
          video.pause();
          // cambiar el play por pause
        }
      });
      // ##### Play/pause video by clicking on it
      $(video).click( function() {
        console.log("video click");
        if(video.paused === true) {
          video.play();
        } else {
          video.pause();
        }
      });
      // ##### Pause control
      $(pauseButton).click(function() {
        console.log("pause click");
        if (video.paused == true) {
          // Play the video
          video.play();
          // cambiar el pause por play
          // $(playButton).replaceWidth($(pauseButton));
        } else {
          // Pause the video
          video.pause();
          // cambiar el play por pause
        }
      });
      // ##### Stop
      $(stopButton).click(function(){
        video.pause();
        video.currentTime = 0;
        seekBar.value = 0;
      });
      // ##### Skip Back
      $(skip_backButton).click( function() {
        console.log("skip back 10");
        var time = video.currentTime - 10;
        // Update the video time
        if (time >= 0){
          video.currentTime = time;
        }else{
          video.currentTime = 0;
        }
      });
      // ##### Skip forward
      $(skip_forwardButton).click( function() {
        console.log("skip forward 10");
        var time = video.currentTime + 10;
        // Update the video time
        if (time < video.duration){
          video.currentTime = time;
        }else {
          video.currentTime = video.duration;
        }
      });
      // ##### Muted button
      $(muteButton).click( function() {
        console.log("muted");
        if (video.muted == false) {
          // Mute the video
          video.muted = true;
          $(icon_volume).removeClass().addClass('fa fa-volume-off');
        } else {
          // Unmute the video
          video.muted = false;
          if (video.volume > 0 && video.volume < 1){
            $(icon_volume).removeClass().addClass('fa fa-volume-down');
          }else {
            $(icon_volume).removeClass().addClass('fa fa-volume-up');
          }
        }
      });
      // ##### seek bar duration
      $(seekBar).change( function() {
        console.log("seek bar");
        // Calculate the new time
        var time = video.duration * (seekBar.value / 100);
        // Update the video time
        video.currentTime = time;
      });
      video.addEventListener("timeupdate", function() {
        // Calculate the slider value
        var value = (100 / video.duration) * video.currentTime;
        // Update the slider value
        seekBar.value = value;
      });
      // Pause the video when the slider handle is being dragged
      seekBar.addEventListener("mousedown", function() {
        video.pause();
      });
      // Play the video when the slider handle is dropped
      seekBar.addEventListener("mouseup", function() {
        video.play();
      });
      // ##### range volume
      $(volumeBar).change( function() {
        // console.log(video.volume);
        // Update the video volume
        video.volume = volumeBar.value;
        if (video.volume == 0){
          $(icon_volume).removeClass().addClass('fa fa-volume-off');
        }else if (video.volume > 0 && video.volume < 1){
          $(icon_volume).removeClass().addClass('fa fa-volume-down');
        }else {
          $(icon_volume).removeClass().addClass('fa fa-volume-up');
        }
      });
      // ##### full screen
      $(fullScreenButton).click( function() {
        console.log("fullscreen");
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
          video.mozRequestFullScreen(); // Firefox
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen(); // Chrome and Safari
        }
      });
}
// ###################################################### PARTICLES CONTROL
// el background de network moviendose
// function init_PARTICLES(){
// 		$("#canvas_particles").jParticle({
// 			background: "#2C3E50",
// 			color: "#fff",
// 			width: null,
// 			height: null,
// 			particle: {
// 				speed: 10
// 			}
// 		});
// }
// ############################ FIN CONTROLES
//
// ############################ PAGES: se cargan siempre en todas las paginas
function carga_UIKIT() {
    $(document).ready(function() {
        // ####################### init_UIKIT()
        init_UIKIT();
        // ####################### init_PARTICLES()
        // init_PARTICLES();
        // ###################### init_TRIANGLE
        // init_TRIANGLE();
        // ###################### init_CARDSLIDER
        init_CARDSLIDER();
        // ###################### init_JUMBOTRON()
        init_JUMBOTRON();
        // ###################### init_Logo()
        init_LOGO();
        // ###################### initCAROUSELS()
        init_CAROSUEL();
        // ###################### init iphone
        init_IphonePortrait();
        // ####################### init_GMAP
        // init_GMAP(); // en fichero externo js/My-Classes/googlemap.class.js

    });
}
// ############################# HOME: se cargan solo en PRODUCTS, en el slider
function carga_PLUGINS() {
    $(document).ready(function() {
        // ###################### init_MENUSLIDER
        // init_MENUSLIDER();
        // ###################### init_PANORAMA
        // init_PANORAMA();
        // ###################### init_VIDEOJS()
        init_VIDEO();
        // ###################### init_TRIPTICO
        // init_TRIPTICO();
        // ###################### init_FBX
        // init_FBX();
        // ###################### init_PDB
        // init_PDB();
        // ###################### init_OBJ
        // init_OBJ();
        // ####################### init_FULLSCREEN(who);
        // init_FULLSCREEN();
        // ###################### init_3DTEXTFX
        // init_3DTEXTFX();
        // init_IFRAME_CONFIG();
        init_IphoneLandscape();
    });
}
// ###################################################### inicio de scripts y plugins
