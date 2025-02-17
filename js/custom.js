$(document).ready(function() {
    var bigimage = $("#big");
    var thumbs = $("#thumbs");
    //var totalslides = 10;
    var syncedSecondary = true;

    bigimage
      .owlCarousel({
      items: 1,
      slideSpeed: 2000,
      nav: true,
      autoplay: false,
      dots: false,
      loop: false,
      margin:20,
      responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
      // // responsiveRefreshRate: 200,
      // navText: [
      //   '<i class="fa-solid fa-arrow-left oc-prev"></i>',
      //   '<i class="fa-solid fa-arrow-right oc-next"></i>'
      // ],
    })
      .on("changed.owl.carousel", syncPosition);

    thumbs
      .on("initialized.owl.carousel", function() {
      thumbs
        .find(".owl-item")
        .eq(0)
        .addClass("current");
    })
      .owlCarousel({
      items: 3,
      dots: false,
      nav: false,
      navText: [
        '<i class="fa-solid fa-arrow-left oc-prev"></i>',
        '<i class="fa-solid fa-arrow-right oc-next"></i>'
      ],
      smartSpeed: 200,
      slideSpeed: 500,
      slideBy: 3,
      // responsiveRefreshRate: 100
    })
      .on("changed.owl.carousel", syncPosition2);

    function syncPosition(el) {
      //if loop is set to false, then you have to uncomment the next line
      var current = el.item.index;

      //to disable loop, comment this block
    //   var count = el.item.count - 1;
    //   var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

    //   if (current < 0) {
    //     current = count;
    //   }
    //   if (current > count) {
    //     current = 0;
    //   }
      //to this
      thumbs
        .find(".owl-item")
        .removeClass("current")
        .eq(current)
        .addClass("current");
      var onscreen = thumbs.find(".owl-item.active").length - 1;
      var start = thumbs
      .find(".owl-item.active")
      .first()
      .index();
      var end = thumbs
      .find(".owl-item.active")
      .last()
      .index();

      if (current > end) {
        thumbs.data("owl.carousel").to(current, 100, true);
      }
      if (current < start) {
        thumbs.data("owl.carousel").to(current - onscreen, 100, true);
      }
    }

    function syncPosition2(el) {
      if (syncedSecondary) {
        var number = el.item.index;
        bigimage.data("owl.carousel").to(number, 100, true);
      }
    }

    thumbs.on("click", ".owl-item", function(e) {
      e.preventDefault();
      var number = $(this).index();
      bigimage.data("owl.carousel").to(number, 300, true);
    });
  });

  var TabBlock = {
    s: {
      animLen: 200
    },

    init: function() {
      TabBlock.bindUIActions();
      TabBlock.hideInactive();
    },

    bindUIActions: function() {
      $('.tabBlock-tabs').on('click', '.tabBlock-tab', function(){
        TabBlock.switchTab($(this));
      });
    },

    hideInactive: function() {
      var $tabBlocks = $('.tabBlock');

      $tabBlocks.each(function(i) {
        var
          $tabBlock = $($tabBlocks[i]),
          $panes = $tabBlock.find('.tabBlock-pane'),
          $activeTab = $tabBlock.find('.tabBlock-tab.is-active');

        $panes.hide();
        $($panes[$activeTab.index()]).show();
      });
    },

    switchTab: function($tab) {
      var $context = $tab.closest('.tabBlock');

      if (!$tab.hasClass('is-active')) {
        $tab.siblings().removeClass('is-active');
        $tab.addClass('is-active');

        TabBlock.showPane($tab.index(), $context);
      }
     },

    showPane: function(i, $context) {
      var $panes = $context.find('.tabBlock-pane');

      // Normally I'd frown at using jQuery over CSS animations, but we can't transition between unspecified variable heights, right? If you know a better way, I'd love a read it in the comments or on Twitter @johndjameson
      $panes.slideUp(TabBlock.s.animLen);
      $($panes[i]).slideDown(TabBlock.s.animLen);
    }
  };

  $(function() {
    TabBlock.init();
  });