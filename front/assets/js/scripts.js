/*===================================
Author       : Bestwebcreator.
Template Name: Tortstore
Version      : 1.2
===================================*/

/*===================================*
PAGE JS
*===================================*/

(function ($) {
    'use strict';

    /*===================================*
    01. LOADING JS
    /*===================================*/
    $(window).on('load', function () {
        setTimeout(function () {
            $(".preloader").delay(700).fadeOut(700).addClass('loaded');
        }, 800);
    });

    /*===================================*
    02. BACKGROUND IMAGE JS
    *===================================*/
    /*data image src*/
    $(".background_bg").each(function () {
        var attr = $(this).attr('data-img-src');
        if (typeof attr !== typeof undefined && attr !== false) {
            $(this).css('background-image', 'url(' + attr + ')');
        }
    });

    /*===================================*
    03. ANIMATION JS
    *===================================*/
    $(function () {

        function ckScrollInit(items, trigger) {
            items.each(function () {
                var ckElement = $(this),
                    AnimationClass = ckElement.attr('data-animation'),
                    AnimationDelay = ckElement.attr('data-animation-delay');

                ckElement.css({
                    '-webkit-animation-delay': AnimationDelay,
                    '-moz-animation-delay': AnimationDelay,
                    'animation-delay': AnimationDelay,
                    opacity: 0
                });

                var ckTrigger = (trigger) ? trigger : ckElement;

                ckTrigger.waypoint(function () {
                    ckElement.addClass("animated").css("opacity", "1");
                    ckElement.addClass('animated').addClass(AnimationClass);
                }, {
                    triggerOnce: true,
                    offset: '90%',
                });
            });
        }

        ckScrollInit($('.animation'));
        ckScrollInit($('.staggered-animation'), $('.staggered-animation-wrap'));

    });

    /*===================================*
    04. MENU JS
    *===================================*/
    //Main navigation scroll spy for shadow
    $(window).on('scroll', function () {
        var scroll = $(window).scrollTop();

        if (scroll >= 150) {
            $('header.fixed-top').addClass('nav-fixed');
        } else {
            $('header.fixed-top').removeClass('nav-fixed');
        }

    });




    // Filter Mobile
    var alterClass = function () {
        var ww = document.body.clientWidth;
        if (ww < 600) {
            $('.multi-collapse').removeClass('show');
        } else if (ww >= 601) {
            $('.multi-collapse').addClass('show');
        };
    };
    $(window).resize(function () {
        alterClass();
    });
    //Fire it when the page first loads:
    alterClass();






    //Show Hide dropdown-menu Main navigation 
    $(document).ready(function () {
        $('.dropdown-menu a.dropdown-toggler').on('click', function () {
            //var $el = $( this );
            //var $parent = $( this ).offsetParent( ".dropdown-menu" );
            if (!$(this).next().hasClass('show')) {
                $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
            }
            var $subMenu = $(this).next(".dropdown-menu");
            $subMenu.toggleClass('show');

            $(this).parent("li").toggleClass('show');

            $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function () {
                $('.dropdown-menu .show').removeClass("show");
            });

            return false;
        });
    });

    //Hide Navbar Dropdown After Click On Links
    var navBar = $(".header_wrap");
    var navbarLinks = navBar.find(".navbar-collapse ul li a.page-scroll");

    $.each(navbarLinks, function () {

        var navbarLink = $(this);

        navbarLink.on('click', function () {
            navBar.find(".navbar-collapse").collapse('hide');
            $("header").removeClass("active");
        });

    });

    //Main navigation Active Class Add Remove
    $('.navbar-toggler').on('click', function () {
        $("header").toggleClass("active");
        if ($('.search-overlay').hasClass('open')) {
            $(".search-overlay").removeClass('open');
            $(".search_trigger").removeClass('open');
        }
    });

    $(document).ready(function () {
        if ($('.header_wrap').hasClass("fixed-top") && !$('.header_wrap').hasClass("transparent_header") && !$('.header_wrap').hasClass("no-sticky")) {
            $(".header_wrap").before('<div class="header_sticky_bar d-none"></div>');
        }
    });

    $(window).on('scroll', function () {
        var scroll = $(window).scrollTop();

        if (scroll >= 150) {
            $('.header_sticky_bar').removeClass('d-none');
            $('header.no-sticky').removeClass('nav-fixed');

        } else {
            $('.header_sticky_bar').addClass('d-none');
        }

    });

    var setHeight = function () {
        var height_header = $(".header_wrap").height();
        $('.header_sticky_bar').css({
            'height': height_header
        });
    };

    $(window).on('load', function () {
        setHeight();
    });

    $(window).on('resize', function () {
        setHeight();
    });

    $('.sidetoggle').on('click', function () {
        $(this).addClass('open');
        $('body').addClass('sidetoggle_active');
        $('.sidebar_menu').addClass('active');
        $("body").append('<div id="header-overlay" class="header-overlay"></div>');
    });

    $(document).on('click', '#header-overlay, .sidemenu_close', function () {
        $('.sidetoggle').removeClass('open');
        $('body').removeClass('sidetoggle_active');
        $('.sidebar_menu').removeClass('active');
        $('#header-overlay').fadeOut('3000', function () {
            $('#header-overlay').remove();
        });
        return false;
    });

    $(".categories_btn").on('click', function () {
        $('.side_navbar_toggler').attr('aria-expanded', 'false');
        $('#navbarSidetoggle').removeClass('show');
    });

    $(".side_navbar_toggler").on('click', function () {
        $('.categories_btn').attr('aria-expanded', 'false');
        $('#navCatContent').removeClass('show');
    });

    $(".pr_search_trigger").on('click', function () {
        $(this).toggleClass('show');
        $('.product_search_form').toggleClass('show');
    });

    var rclass = true;

    $("html").on('click', function () {
        if (rclass) {
            $('.categories_btn').addClass('collapsed');
            $('.categories_btn,.side_navbar_toggler').attr('aria-expanded', 'false');
            $('#navCatContent,#navbarSidetoggle').removeClass('show');
        }
        rclass = true;
    });

    $(".categories_btn,#navCatContent,#navbarSidetoggle .navbar-nav,.side_navbar_toggler").on('click', function () {
        rclass = false;
    });

    /*===================================*
    05. SMOOTH SCROLLING JS
    *===================================*/
    // Select all links with hashes

    var topheaderHeight = $(".top-header").innerHeight();
    var mainheaderHeight = $(".header_wrap").innerHeight();
    var headerHeight = mainheaderHeight - topheaderHeight - 20;
    $('a.page-scroll[href*="#"]:not([href="#"])').on('click', function () {
        $('a.page-scroll.active').removeClass('active');
        $(this).closest('.page-scroll').addClass('active');
        // On-page links
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            // Figure out element to scroll to
            var target = $(this.hash),
                speed = $(this).data("speed") || 800;
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - headerHeight
                }, speed);
            }
        }
    });
    $(window).on('scroll', function () {
        var lastId,
            // All list items
            menuItems = $(".header_wrap").find("a.page-scroll"),
            topMenuHeight = $(".header_wrap").innerHeight() + 20,
            // Anchors corresponding to menu items
            scrollItems = menuItems.map(function () {
                var items = $($(this).attr("href"));
                if (items.length) {
                    return items;
                }
            });
        var fromTop = $(this).scrollTop() + topMenuHeight;

        // Get id of current scroll item
        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems.closest('.page-scroll').removeClass("active").end().filter("[href='#" + id + "']").closest('.page-scroll').addClass("active");
        }

    });


    $('.more_slide_open').slideUp();
    $('.more_categories').on('click', function () {
        $(this).toggleClass('show');
        $('.more_slide_open').slideToggle();
    });

    /*===================================*
    06. SEARCH JS
    *===================================*/

    $(".close-search").on("click", function () {
        $(".search_wrap,.search_overlay").removeClass('open');
        $("body").removeClass('search_open');
    });

    var removeClass = true;
    $(".search_wrap").after('<div class="search_overlay"></div>');
    $(".search_trigger").on('click', function () {
        $(".search_wrap,.search_overlay").toggleClass('open');
        $("body").toggleClass('search_open');
        removeClass = false;
        if ($('.navbar-collapse').hasClass('show')) {
            $(".navbar-collapse").removeClass('show');
            $(".navbar-toggler").addClass('collapsed');
            $(".navbar-toggler").attr("aria-expanded", false);
        }
    });
    $(".search_wrap form").on('click', function () {
        removeClass = false;
    });
    $("html").on('click', function () {
        if (removeClass) {
            $("body").removeClass('open');
            $(".search_wrap,.search_overlay").removeClass('open');
            $("body").removeClass('search_open');
        }
        removeClass = true;
    });

    /*===================================*
    07. SCROLLUP JS
    *===================================*/
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 150) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $(".scrollup").on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 600);
        return false;
    });

    /*===================================*
    08. PARALLAX JS
    *===================================*/
    $(window).on('load', function () {
        $('.parallax_bg').parallaxBackground();
    });

    /*===================================*
    09. MASONRY JS
    *===================================*/
    $(window).on("load", function () {
        var $grid_selectors = $(".grid_container");
        var filter_selectors = ".grid_filter > li > a";
        if ($grid_selectors.length > 0) {
            $grid_selectors.imagesLoaded(function () {
                if ($grid_selectors.hasClass("masonry")) {
                    $grid_selectors.isotope({
                        itemSelector: '.grid_item',
                        percentPosition: true,
                        layoutMode: "masonry",
                        masonry: {
                            columnWidth: '.grid-sizer'
                        },
                    });
                } else {
                    $grid_selectors.isotope({
                        itemSelector: '.grid_item',
                        percentPosition: true,
                        layoutMode: "fitRows",
                    });
                }
            });
        }

        //isotope filter
        $(document).on("click", filter_selectors, function () {
            $(filter_selectors).removeClass("current");
            $(this).addClass("current");
            var dfselector = $(this).data('filter');
            if ($grid_selectors.hasClass("masonry")) {
                $grid_selectors.isotope({
                    itemSelector: '.grid_item',
                    layoutMode: "masonry",
                    masonry: {
                        columnWidth: '.grid_item'
                    },
                    filter: dfselector
                });
            } else {
                $grid_selectors.isotope({
                    itemSelector: '.grid_item',
                    layoutMode: "fitRows",
                    filter: dfselector
                });
            }
            return false;
        });

        $('.portfolio_filter').on('change', function () {
            $grid_selectors.isotope({
                filter: this.value
            });
        });

        $(window).on("resize", function () {
            setTimeout(function () {
                $grid_selectors.find('.grid_item').removeClass('animation').removeClass('animated'); // avoid problem to filter after window resize
                $grid_selectors.isotope('layout');
            }, 300);
        });
    });

    $('.link_container').each(function () {
        $(this).magnificPopup({
            delegate: '.image_popup',
            type: 'image',
            mainClass: 'mfp-zoom-in',
            removalDelay: 500,
            gallery: {
                enabled: true
            }
        });
    });

    /*===================================*
    10. SLIDER JS
    *===================================*/
    function carousel_slider() {
        $('.carousel_slider').each(function () {
            var $carousel = $(this);
            $carousel.owlCarousel({
                dots: $carousel.data("dots"),
                loop: $carousel.data("loop"),
                items: $carousel.data("items"),
                margin: $carousel.data("margin"),
                mouseDrag: $carousel.data("mouse-drag"),
                touchDrag: $carousel.data("touch-drag"),
                autoHeight: $carousel.data("autoheight"),
                center: $carousel.data("center"),
                nav: $carousel.data("nav"),
                rewind: $carousel.data("rewind"),
                navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                autoplay: $carousel.data("autoplay"),
                animateIn: $carousel.data("animate-in"),
                animateOut: $carousel.data("animate-out"),
                autoplayTimeout: $carousel.data("autoplay-timeout"),
                smartSpeed: $carousel.data("smart-speed"),
                responsive: $carousel.data("responsive"),

            });
        });
    }

    function slick_slider() {
        $('.slick_slider').each(function () {
            var $slick_carousel = $(this);
            $slick_carousel.slick({
                arrows: $slick_carousel.data("arrows"),
                dots: $slick_carousel.data("dots"),
                infinite: $slick_carousel.data("infinite"),
                centerMode: $slick_carousel.data("center-mode"),
                vertical: $slick_carousel.data("vertical"),
                fade: $slick_carousel.data("fade"),
                cssEase: $slick_carousel.data("css-ease"),
                autoplay: $slick_carousel.data("autoplay"),
                verticalSwiping: $slick_carousel.data("vertical-swiping"),
                autoplaySpeed: $slick_carousel.data("autoplay-speed"),
                speed: $slick_carousel.data("speed"),
                pauseOnHover: $slick_carousel.data("pause-on-hover"),
                draggable: $slick_carousel.data("draggable"),
                slidesToShow: $slick_carousel.data("slides-to-show"),
                slidesToScroll: $slick_carousel.data("slides-to-scroll"),
                asNavFor: $slick_carousel.data("as-nav-for"),
                focusOnSelect: $slick_carousel.data("focus-on-select"),
                responsive: $.data("responsive")
            });
        });
    }


    $(document).ready(function () {
        carousel_slider();
        slick_slider();
    });
    /*===================================*
    11. CONTACT FORM JS
    *===================================*/
    $("#submitButton").on("click", function (event) {
        event.preventDefault();
        var mydata = $("form").serialize();
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "contact.php",
            data: mydata,
            success: function (data) {
                if (data.type === "error") {
                    $("#alert-msg").removeClass("alert, alert-success");
                    $("#alert-msg").addClass("alert, alert-danger");
                } else {
                    $("#alert-msg").addClass("alert, alert-success");
                    $("#alert-msg").removeClass("alert, alert-danger");
                    $("#first-name").val("Enter Name");
                    $("#email").val("Enter Email");
                    $("#phone").val("Enter Phone Number");
                    $("#subject").val("Enter Subject");
                    $("#description").val("Enter Message");

                }
                $("#alert-msg").html(data.msg);
                $("#alert-msg").show();
            },
            error: function (xhr, textStatus) {
                alert(textStatus);
            }
        });
    });

    /*===================================*
    12. POPUP JS
    *===================================*/
    $('.content-popup').magnificPopup({
        type: 'inline',
        preloader: true,
        mainClass: 'mfp-zoom-in',
    });

    $('.image_gallery').each(function () { // the containers for all your galleries
        $(this).magnificPopup({
            delegate: 'a', // the selector for gallery item
            type: 'image',
            gallery: {
                enabled: true,
            },
        });
    });

    $('.popup-ajax').magnificPopup({
        type: 'ajax',
        callbacks: {
            ajaxContentAdded: function () {
                carousel_slider();
                slick_slider();
            }
        }
    });

    $('.video_popup, .iframe_popup').magnificPopup({
        type: 'iframe',
        removalDelay: 160,
        mainClass: 'mfp-zoom-in',
        preloader: false,
        fixedContentPos: false
    });

    /*===================================*
    13. Select dropdowns
    *===================================*/

    if ($('select').length) {
        // Traverse through all dropdowns
        $.each($('select'), function (i, val) {
            var $el = $(val);

            if ($el.val() === "") {
                $el.addClass('first_null');
            }

            if (!$el.val()) {
                $el.addClass('not_chosen');
            }

            $el.on('change', function () {
                if (!$el.val())
                    $el.addClass('not_chosen');
                else
                    $el.removeClass('not_chosen');
            });

        });
    }

    /*==============================================================
    14. FIT VIDEO JS
    ==============================================================*/
    if ($(".fit-videos").length > 0) {
        $(".fit-videos").fitVids({
            customSelector: "iframe[src^='https://w.soundcloud.com']"
        });
    }

    /*==============================================================
    15. DROPDOWN JS
    ==============================================================*/
    if ($(".custome_select").length > 0) {
        $(document).ready(function () {
            $(".custome_select").msDropdown();
        });
    }

    /*===================================*
    16.MAP JS
    *===================================*/
    if ($("#map").length > 0) {
        google.maps.event.addDomListener(window, 'load', init);
    }

    var map_selector = $('#map');

    function init() {

        var mapOptions = {
            zoom: map_selector.data("zoom"),
            mapTypeControl: false,
            center: new google.maps.LatLng(map_selector.data("latitude"), map_selector.data("longitude")), // New York
        };
        var mapElement = document.getElementById('map');
        var map = new google.maps.Map(mapElement, mapOptions);
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(map_selector.data("latitude"), map_selector.data("longitude")),
            map: map,
            icon: map_selector.data("icon"),

            title: map_selector.data("title"),
        });
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }


    /*===================================*
    17. COUNTDOWN JS
    *===================================*/
    $('.countdown_time').each(function () {
        var endTime = $(this).data('time');
        $(this).countdown(endTime, function (tm) {
            $(this).html(tm.strftime('<div class="countdown_box"><div class="countdown-wrap"><span class="countdown days">%D </span><span class="cd_text">Days</span></div></div><div class="countdown_box"><div class="countdown-wrap"><span class="countdown hours">%H</span><span class="cd_text">Hours</span></div></div><div class="countdown_box"><div class="countdown-wrap"><span class="countdown minutes">%M</span><span class="cd_text">Minutes</span></div></div><div class="countdown_box"><div class="countdown-wrap"><span class="countdown seconds">%S</span><span class="cd_text">Seconds</span></div></div>'));
        });
    });

    /*===================================*
    18. List Grid JS
    *===================================*/
    $('.shorting_icon').on('click', function () {
        if ($(this).hasClass('grid')) {
            $('.shop_container').removeClass('list').addClass('grid');
            $(this).addClass('active').siblings().removeClass('active');
        } else if ($(this).hasClass('list')) {
            $('.shop_container').removeClass('grid').addClass('list');
            $(this).addClass('active').siblings().removeClass('active');
        }
        $(".shop_container").append('<div class="loading_pr"><div class="mfp-preloader"></div></div>');
        setTimeout(function () {
            $('.loading_pr').remove();
            $container.isotope('layout');
        }, 800);
    });

    /*===================================*
    19. TOOLTIP JS
    *===================================*/
    $(function () {
        $('[data-toggle="tooltip"]').tooltip({
            trigger: 'hover',
        });
    });
    $(function () {
        $('[data-toggle="popover"]').popover();
    });

    /*===================================*
    20. PRODUCT COLOR JS
    *===================================*/
    $('.product_color_switch span').each(function () {
        var get_color = $(this).attr('data-color');
        $(this).css("background-color", get_color);
    });

    $('.product_color_switch span,.product_size_switch span').on("click", function () {
        $(this).siblings(this).removeClass('active').end().addClass('active');
    });

    /*===================================*
    21. QUICKVIEW POPUP + ZOOM IMAGE + PRODUCT SLIDER JS
    *===================================*/
    var image = $('#product_img');
    //var zoomConfig = {};
    var zoomActive = false;

    zoomActive = !zoomActive;
    if (zoomActive) {
        if ($(image).length > 0) {
            $(image).elevateZoom({
                cursor: "crosshair",
                easing: true,
                gallery: 'pr_item_gallery',
                zoomType: "inner",
                galleryActiveClass: "active"
            });
        }
    } else {
        $.removeData(image, 'elevateZoom'); //remove zoom instance from image
        $('.zoomContainer:last-child').remove(); // remove zoom container from DOM
    }

    $.magnificPopup.defaults.callbacks = {
        open: function () {
            $('body').addClass('zoom_image');
        },
        close: function () {
            // Wait until overflow:hidden has been removed from the html tag
            setTimeout(function () {
                $('body').removeClass('zoom_image');
                $('body').removeClass('zoom_gallery_image');
                //$('.zoomContainer:last-child').remove();// remove zoom container from DOM
                $('.zoomContainer').slice(1).remove();
            }, 100);
        }
    };

    // Set up gallery on click
    var galleryZoom = $('#pr_item_gallery');
    galleryZoom.magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
            enabled: true
        },
        callbacks: {
            elementParse: function (item) {
                item.src = item.el.attr('data-zoom-image');
            }
        }
    });

    // Zoom image when click on icon
    $('.product_img_zoom').on('click', function () {
        var atual = $('#pr_item_gallery a').attr('data-zoom-image');
        $('body').addClass('zoom_gallery_image');
        $('#pr_item_gallery .item').each(function () {
            if (atual == $(this).find('.product_gallery_item').attr('data-zoom-image')) {
                return galleryZoom.magnificPopup('open', $(this).index());
            }
        });
    });

    $('.plus').on('click', function () {
        if ($(this).prev().val()) {
            $(this).prev().val(+$(this).prev().val() + 1);
        }
    });
    $('.minus').on('click', function () {
        if ($(this).next().val() > 1) {
            if ($(this).next().val() > 1) $(this).next().val(+$(this).next().val() - 1);
        }
    });

    /*===================================*
    22. PRICE FILTER JS
    *===================================*/
    $('#price_filter').each(function () {
        var $filter_selector = $(this);
        var a = $filter_selector.data("min-value");
        var b = $filter_selector.data("max-value");
        var c = $filter_selector.data("price-sign");
        $filter_selector.slider({
            range: true,
            min: $filter_selector.data("min"),
            max: $filter_selector.data("max"),
            values: [a, b],
            slide: function (event, ui) {
                $("#flt_price").html(c + ui.values[0] + " - " + c + ui.values[1]);
                $("#price_first").val(ui.values[0]);
                $("#price_second").val(ui.values[1]);
            }
        });
        $("#flt_price").html(c + $filter_selector.slider("values", 0) + " - " + c + $filter_selector.slider("values", 1));
    });

    /*===================================*
    23. RATING STAR JS
    *===================================*/
    $(document).ready(function () {
        $('.star_rating span').on('click', function () {
            var onStar = parseFloat($(this).data('value'), 10); // The star currently selected
            var stars = $(this).parent().children('.star_rating span');
            for (var i = 0; i < stars.length; i++) {
                $(stars[i]).removeClass('selected');
            }
            for (i = 0; i < onStar; i++) {
                $(stars[i]).addClass('selected');
            }
        });
    });

    /*===================================*
    24. CHECKBOX CHECK THEN ADD CLASS JS
    *===================================*/
    $('.create-account,.different_address').hide();
    $('#createaccount:checkbox').on('change', function () {
        if ($(this).is(":checked")) {
            $('.create-account').slideDown();
        } else {
            $('.create-account').slideUp();
        }
    });
    $('#differentaddress:checkbox').on('change', function () {
        if ($(this).is(":checked")) {
            $('.different_address').slideDown();
        } else {
            $('.different_address').slideUp();
        }
    });

    /*===================================*
    25. Cart Page Payment option
    *===================================*/
    $(document).ready(function () {
        $('[name="payment_option"]').on('change', function () {
            var $value = $(this).attr('value');
            $('.payment-text').slideUp();
            $('[data-method="' + $value + '"]').slideDown();
        });
    });

    /*===================================*
    26. ONLOAD POPUP JS
    *===================================*/

    $(window).on('load', function () {
        setTimeout(function () {
            $("#onload-popup").modal('show', {}, 500);
        }, 3000);

    });

    /*===================================*
     *===================================*/
    // $(window).on("load", function() {
    //     document.onkeydown = function(e) {
    //         if (e.keyCode == 123) {
    //             return false;
    //         }
    //         if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
    //             return false;
    //         }
    //         if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
    //             return false;
    //         }
    //         if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
    //             return false;
    //         }

    //         if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
    //             return false;
    //         }
    //     };

    //     $("html").on("contextmenu", function() {
    //         return false;
    //     });
    // });


})(jQuery);



var swiper = new Swiper(".mySwiper", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
});
var swiper2 = new Swiper(".mySwiper2", {
    spaceBetween: 10,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    thumbs: {
        swiper: swiper,
    },
});




var distance;

// Check if .desktop-bnr element exists
if ($('.desktop-bnr').length > 0) {
    distance = $('.desktop-bnr').offset().top;

    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop();

        if (scrollTop >= distance) {
            $('.desktop-bnr').addClass("sticky");
        } else {
            $('.desktop-bnr').removeClass("sticky");
        }
    });
}





//    MULTIPLE IMAGE ADD


const imageInput = document.getElementById('imageInput');
const imageContainer = document.getElementById('image-container');
const uploadedImages = []; // Array to store uploaded images

function mergeFiles() {
    // Get the file input elements
    const fileInput1 = document.getElementById('imageInput');
    const fileInput2 = document.getElementById('imageInput2');

    if (fileInput2.files.length != 0) {

        console.log('yuska')

        const mergedFiles = Array.from(fileInput1.files).concat(Array.from(fileInput2.files));

        // Create a new file input element
        const mergedFileInput = document.createElement('input');
        mergedFileInput.type = 'file';
        mergedFileInput.multiple = true;
        mergedFileInput.setAttribute("id", "imageInput");
        mergedFileInput.setAttribute("name", "images");
        mergedFileInput.setAttribute("accept", "image/*");
        // id="imageInput" name="images" accept="image/*"

        // Create a new FileList
        const newFileList = new DataTransfer();
        mergedFiles.forEach(file => newFileList.items.add(file));

        // Set the value of the new file input to the new FileList
        mergedFileInput.files = newFileList.files;

        fileInput2.files = mergedFileInput.files

        // Replace the file input 1 with the new merged file input
        fileInput1.parentNode.replaceChild(mergedFileInput, fileInput1);

        // mergedFileInput.remove()
    }
    else {
        console.log('erkim')
        fileInput2.files = fileInput1.files

        console.log(fileInput2.files)
    }
}


if (imageInput) {
    imageInput.addEventListener('change', handleFileSelect);

    function handleFileSelect(event) {
        const files = event.target.files;

        for (const file of files) {
            if (file.type.startsWith('image/')) {
                displayImage(file);
                uploadedImages.push(file);
                console.log(imageInput.files);
                console.log(uploadedImages);
            }
        }

        const mergedFileInput = document.createElement('input');
        const mergedFiles = Array.from(uploadedImages);
        mergedFileInput.type = 'file';
        mergedFileInput.multiple = true;
        mergedFileInput.setAttribute("id", "imageInput");
        mergedFileInput.setAttribute("name", "images");
        mergedFileInput.setAttribute("accept", "image/*");

        const newFileList = new DataTransfer();
        mergedFiles.forEach(file => newFileList.items.add(file));
        mergedFileInput.files = newFileList.files;
        imageInput.files = mergedFileInput.files
        console.log('imageInput.files');
        console.log(imageInput.files);
    }
}

function displayImage(file) {
    const reader = new FileReader();

    reader.onload = function (e) {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('image-wrapper');

        // mainImageText.innerHTML = "Lütfən əsas şəkili seçin"
        // mainImageText.setAttribute("style", "margin-top: 20px; margin-bottom: -20px;")

        const img = document.createElement('img');
        var rotateDegree = document.createElement("input");
        var mainImageRadio = document.createElement("input");
        var lengthImages = document.querySelectorAll(".image-wrapper img")
        rotateDegree.setAttribute("type", "number")
        rotateDegree.setAttribute("value", "0")
        rotateDegree.setAttribute("style", "visibility: hidden; opacity: 0; position: absolute;")
        rotateDegree.setAttribute("name", "rotation_degrees[]")
        rotateDegree.setAttribute("id", `rotation_degree_${lengthImages.length}`)

        mainImageRadio.setAttribute("type", "radio")
        mainImageRadio.setAttribute("value", lengthImages.length)
        mainImageRadio.setAttribute("name", "mainImage")

        img.src = e.target.result;
        img.setAttribute("data-id", `rotation_degree_${lengthImages.length}`)

        const actionButtons = document.createElement('div');
        actionButtons.classList.add('action-buttons');

        const rotateBtn = document.createElement('button');
        rotateBtn.type = 'button';
        rotateBtn.classList.add('rotate-btn');
        rotateBtn.innerHTML = '↻';
        rotateBtn.addEventListener('click', () => rotateImage(img));

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerText = '❌';
        deleteBtn.style.color = 'white';
        deleteBtn.addEventListener('click', () => deleteImage(imageWrapper, file));

        actionButtons.appendChild(rotateBtn);
        actionButtons.appendChild(deleteBtn);

        imageWrapper.appendChild(img);
        imageWrapper.appendChild(rotateDegree);
        imageWrapper.appendChild(mainImageRadio);
        imageWrapper.appendChild(actionButtons);

        imageContainer.appendChild(imageWrapper);

        document.getElementsByName("mainImage")[0].checked = true;
    };

    reader.readAsDataURL(file);
}

function rotateImage(img) {
    const rotationAngle = 90; // Set the rotation angle (in degrees)

    const currentRotation = parseInt(img.dataset.rotation) || 0;
    const newRotation = (currentRotation + rotationAngle) % 360;

    img.style.transform = `rotate(${newRotation}deg)`;
    img.dataset.rotation = newRotation;
    img.nextSibling.setAttribute("value", newRotation);
}

function deleteImage(imageWrapper, file) {
    // Remove the image from the displayed container
    imageContainer.removeChild(imageWrapper);

    // Remove the deleted image from the array
    const index = uploadedImages.indexOf(file);
    if (index !== -1) {
        uploadedImages.splice(index, 1);
        console.log(uploadedImages);

        // Update the file input's files array
        updateImageInputFiles();
    }
}
function updateImageInputFiles() {
    // Create a new FileList
    const newFileList = new DataTransfer();
    uploadedImages.forEach(file => newFileList.items.add(file));

    // Set the value of the file input to the new FileList
    imageInput.files = newFileList.files;

    console.log('Updated imageInput.files:');
    console.log(imageInput.files);
}

// MULTIPLE IMAGE ENDS




// WISHLIST ADD
var wishlist = {
    'add': function (product_id, element) {
        var notificationMessage = 'Product added to Wishlist';
        var notificationImage = '<img src="image/demo/shop/product/e11.jpg" alt="">';
        var notificationContent = '<h3>You must <a href="#">login</a> to save <a href="#">Apple Cinema 30"</a> to your <a href="#">wish list</a>!</h3>';

        if (!element.classList.contains('active')) {
            addProductNotice(notificationMessage, notificationImage, notificationContent, 'success');
        } else {
            addProductNotice('Product removed from Wishlist', '<img src="image/demo/shop/product/e11.jpg" alt="">', '<h3>Removed from <a href="#">wish list</a>!</h3>', 'success');
        }

        element.classList.toggle('active');
        // alert('yes')

    }
}

// WISHLIST ADD


/* ---------------------------------------------------
    jGrowl – jQuery alerts and message box
-------------------------------------------------- */
function addProductNotice(title, thumb, text, type) {
    $.jGrowl.defaults.closer = false;
    //Stop jGrowl
    //$.jGrowl.defaults.sticky = true;
    var tpl = thumb + '<h3>' + text + '</h3>';
    $.jGrowl(tpl, {
        life: 4000,
        header: title,
        speed: 'slow',
        theme: type
    });
}



function toggleActiveClass(element) {
    element.classList.toggle('active');
}

// PHONE VALIDATION INPUT MASK


(function (jQuery, window, undefined) {
    "use strict";
    var matched, browser;

    jQuery.uaMatch = function (ua) {
        ua = ua.toLowerCase();

        var match = /(opr)[\/]([\w.]+)/.exec(ua) ||
            /(chrome)[ \/]([\w.]+)/.exec(ua) ||
            /(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(ua) ||
            /(webkit)[ \/]([\w.]+)/.exec(ua) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
            /(msie) ([\w.]+)/.exec(ua) ||
            ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(ua) ||
            ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
            [];

        var platform_match = /(ipad)/.exec(ua) ||
            /(iphone)/.exec(ua) ||
            /(android)/.exec(ua) ||
            /(windows phone)/.exec(ua) ||
            /(win)/.exec(ua) ||
            /(mac)/.exec(ua) ||
            /(linux)/.exec(ua) ||
            /(cros)/i.exec(ua) ||
            [];

        return {
            browser: match[3] || match[1] || "",
            version: match[2] || "0",
            platform: platform_match[0] || ""
        };
    };

    matched = jQuery.uaMatch(window.navigator.userAgent);
    browser = {};

    if (matched.browser) {
        browser[matched.browser] = true;
        browser.version = matched.version;
        browser.versionNumber = parseInt(matched.version);
    }

    if (matched.platform) {
        browser[matched.platform] = true;
    }

    // These are all considered mobile platforms, meaning they run a mobile browser
    if (browser.android || browser.ipad || browser.iphone || browser["windows phone"]) {
        browser.mobile = true;
    }

    // These are all considered desktop platforms, meaning they run a desktop browser
    if (browser.cros || browser.mac || browser.linux || browser.win) {
        browser.desktop = true;
    }

    // Chrome, Opera 15+ and Safari are webkit based browsers
    if (browser.chrome || browser.opr || browser.safari) {
        browser.webkit = true;
    }

    // IE11 has a new token so we will assign it msie to avoid breaking changes
    if (browser.rv) {
        var ie = "msie";

        matched.browser = ie;
        browser[ie] = true;
    }

    // Opera 15+ are identified as opr
    if (browser.opr) {
        var opera = "opera";

        matched.browser = opera;
        browser[opera] = true;
    }

    // Stock Android browsers are marked as Safari on Android.
    if (browser.safari && browser.android) {
        var android = "android";

        matched.browser = android;
        browser[android] = true;
    }

    // Assign the name and platform variable
    browser.name = matched.browser;
    browser.platform = matched.platform;


    jQuery.browser = browser;
})(jQuery, window);

(function (a) { var b = (a.browser.msie ? "paste" : "input") + ".mask", c = window.orientation != undefined; a.mask = { definitions: { 9: "[0-9]", a: "[A-Za-z]", "*": "[A-Za-z0-9]" }, dataName: "rawMaskFn" }, a.fn.extend({ caret: function (a, b) { if (this.length != 0) { if (typeof a == "number") { b = typeof b == "number" ? b : a; return this.each(function () { if (this.setSelectionRange) this.setSelectionRange(a, b); else if (this.createTextRange) { var c = this.createTextRange(); c.collapse(!0), c.moveEnd("character", b), c.moveStart("character", a), c.select() } }) } if (this[0].setSelectionRange) a = this[0].selectionStart, b = this[0].selectionEnd; else if (document.selection && document.selection.createRange) { var c = document.selection.createRange(); a = 0 - c.duplicate().moveStart("character", -1e5), b = a + c.text.length } return { begin: a, end: b } } }, unmask: function () { return this.trigger("unmask") }, mask: function (d, e) { if (!d && this.length > 0) { var f = a(this[0]); return f.data(a.mask.dataName)() } e = a.extend({ placeholder: "_", completed: null }, e); var g = a.mask.definitions, h = [], i = d.length, j = null, k = d.length; a.each(d.split(""), function (a, b) { b == "?" ? (k--, i = a) : g[b] ? (h.push(new RegExp(g[b])), j == null && (j = h.length - 1)) : h.push(null) }); return this.trigger("unmask").each(function () { function v(a) { var b = f.val(), c = -1; for (var d = 0, g = 0; d < k; d++)if (h[d]) { l[d] = e.placeholder; while (g++ < b.length) { var m = b.charAt(g - 1); if (h[d].test(m)) { l[d] = m, c = d; break } } if (g > b.length) break } else l[d] == b.charAt(g) && d != i && (g++, c = d); if (!a && c + 1 < i) f.val(""), t(0, k); else if (a || c + 1 >= i) u(), a || f.val(f.val().substring(0, c + 1)); return i ? d : j } function u() { return f.val(l.join("")).val() } function t(a, b) { for (var c = a; c < b && c < k; c++)h[c] && (l[c] = e.placeholder) } function s(a) { var b = a.which, c = f.caret(); if (a.ctrlKey || a.altKey || a.metaKey || b < 32) return !0; if (b) { c.end - c.begin != 0 && (t(c.begin, c.end), p(c.begin, c.end - 1)); var d = n(c.begin - 1); if (d < k) { var g = String.fromCharCode(b); if (h[d].test(g)) { q(d), l[d] = g, u(); var i = n(d); f.caret(i), e.completed && i >= k && e.completed.call(f) } } return !1 } } function r(a) { var b = a.which; if (b == 8 || b == 46 || c && b == 127) { var d = f.caret(), e = d.begin, g = d.end; g - e == 0 && (e = b != 46 ? o(e) : g = n(e - 1), g = b == 46 ? n(g) : g), t(e, g), p(e, g - 1); return !1 } if (b == 27) { f.val(m), f.caret(0, v()); return !1 } } function q(a) { for (var b = a, c = e.placeholder; b < k; b++)if (h[b]) { var d = n(b), f = l[b]; l[b] = c; if (d < k && h[d].test(f)) c = f; else break } } function p(a, b) { if (!(a < 0)) { for (var c = a, d = n(b); c < k; c++)if (h[c]) { if (d < k && h[c].test(l[d])) l[c] = l[d], l[d] = e.placeholder; else break; d = n(d) } u(), f.caret(Math.max(j, a)) } } function o(a) { while (--a >= 0 && !h[a]); return a } function n(a) { while (++a <= k && !h[a]); return a } var f = a(this), l = a.map(d.split(""), function (a, b) { if (a != "?") return g[a] ? e.placeholder : a }), m = f.val(); f.data(a.mask.dataName, function () { return a.map(l, function (a, b) { return h[b] && a != e.placeholder ? a : null }).join("") }), f.attr("readonly") || f.one("unmask", function () { f.unbind(".mask").removeData(a.mask.dataName) }).bind("focus.mask", function () { m = f.val(); var b = v(); u(); var c = function () { b == d.length ? f.caret(0, b) : f.caret(b) }; (a.browser.msie ? c : function () { setTimeout(c, 0) })() }).bind("blur.mask", function () { v(), f.val() != m && f.change() }).bind("keydown.mask", r).bind("keypress.mask", s).bind(b, function () { setTimeout(function () { f.caret(v(!0)) }, 0) }), v() }) } }) })(jQuery);

/*     My Javascript      */

$(function () {

    $(".phone-class").mask("(99) 999-99-99");

}

)






// STICKY TOP HEADER STARTS
// JavaScript
var lastScrollTop = 0;
window.addEventListener('scroll', function () {
    var currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    var header = document.getElementById('header');

    if (currentScroll > lastScrollTop && currentScroll > 250) {
        // Scrolling down and past 250px
        header.classList.remove('sticky-header');
    } else {
        // Scrolling up or not yet past 250px
        if (currentScroll <= 250) {
            // Ensure header is in its original position when scrolled to the top
            header.classList.remove('sticky-header');
        } else {
            // Header becomes sticky when scrolling up
            header.classList.add('sticky-header');
        }
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
});

//  STICKY TOP HEADER ENDS




// Dont Show Company Name Starts
document.addEventListener("DOMContentLoaded", function () {
    var istehsalatNovuSelect = document.getElementById('istehsalat_novu');
    var muessiseAdiRow = document.querySelector('.company-name');

    // Hide/Show "Müəssisə adı" row based on selected option
    istehsalatNovuSelect.addEventListener('change', function () {
        if (istehsalatNovuSelect.value === 'satici') {
            muessiseAdiRow.style.display = 'none';
        } else {
            muessiseAdiRow.style.display = 'block';
        }
    });
});
// Dont Show Company Name Ends




// Price Add Starts
function showDiv(className) {
    const divs = document.querySelectorAll('.option-row');
    divs.forEach(div => {
      if (div.classList.contains(className)) {
        div.style.display = 'block';
      } else {
        div.style.display = 'none';
      }
    });
  }
  document.addEventListener("DOMContentLoaded", function () {
    const plusButtons = document.querySelectorAll(".plus");

    plusButtons.forEach(button => {
      button.addEventListener("click", function () {
        const optionRow = this.closest(".option-row");
        const addPriceDiv = optionRow.querySelector(".add-price-for-people, .add-price-for-weight");
        const newInputContainer = addPriceDiv.cloneNode(true);

        optionRow.appendChild(newInputContainer);
      });
    });
  });
  // Price Add Ends