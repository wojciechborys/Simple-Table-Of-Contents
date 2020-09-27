
$(document).ready(function () {
  if (!$('body').hasClass('your-custom-class')) {
    // Create wrapper
    $('.sidebar-wrapper').append('<div class="toc"><h3>Table of Contents</h3></div>');
    var headers = [];
    var list = $('.toc');
    // Fetch all H3 headers and add IDs to them. If you wish, you can change H3 to anything else. 
    $('.entry-content h3').each(function (n) {
      var cur = $(this).text();
      var stripped = cur.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-');
      $(this).nextUntil("h3").addBack().wrapAll('<div class="slice" id=' + stripped + ' />');
      headers[n] = $(this).text();
      // Add table of contents list and add href attribute to the sections
      list.append('<p><a href="#' + stripped + '" class="toc--elem">' + $(this).text() + '</a></p>');
    })

    // Cache selectors
    var lastId,
      topMenu = $(".toc"),
      topMenuHeight = 100,
      // All list items
      menuItems = topMenu.find("a"),
      // Anchors corresponding to menu items
      scrollItems = menuItems.map(function () {
        var item = $($(this).attr("href"));
        if (item.length) {
          return item;
        }
      });

    // Bind click handler to menu items
    menuItems.click(function (e) {
      var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
      $('html, body').stop().animate({
        scrollTop: offsetTop
      }, 300);
      e.preventDefault();
    });

    // Bind to scroll
    $(window).scroll(function () {
      // Get container scroll position
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
        menuItems
          .parent().removeClass("active")
          .end().filter("[href='#" + id + "']").parent().addClass("active");
      }
    });
  }
})
