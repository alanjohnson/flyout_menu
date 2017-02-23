/*
 * @author Alan Johnson
 */

// PLACEHOLDER DATA - generating a list of social "share this" links as data for developemnt purposes.
var flyout_urlPath = encodeURIComponent(window.location.href)
var flyout_title = encodeURIComponent(document.title)

data_elements = {
    // can be any object of data we choose to pass to it.
    facebook : {// Share on Facebook
        name: 'Facebook',
        url : 'http://www.facebook.com/sharer.php?u=' + flyout_urlPath + '&t=' + flyout_title
    },
    twitter : { // Tweet This
        name: 'Twitter',
        url : 'http://twitter.com/share?text=' + flyout_title + '&url=' + flyout_urlPath
    },
    linkedin : {// Share on Linkedin
        name: 'Linkedin',
        url : 'http://www.linkedin.com/shareArticle?mini=true&url=' + flyout_urlPath + '&flyout_title=' + flyout_title + '&source=FaxionOnline'
    },
    email : { // Email This
        name: 'Email This',
        url : 'mailto:?subject=' + flyout_title + '&body=' + flyout_urlPath
    },
    delicious : {// Add to Del.icio.us
        name: 'Delicious',
        url : 'http://del.icio.us/post?url=' + flyout_urlPath + '&flyout_title=' + flyout_title
    },
    digg : { // Share on Digg
        name: 'Digg This',
        url : 'http://digg.com/submit?phase=2&url=' + flyout_urlPath + '&flyout_title=' + flyout_title
    },
    blogger : {// Post to Blogger
        name: 'Blogger',
        url : 'http://www.blogger.com/blog_this.pyra?t&u=' + flyout_urlPath + '&n=' + flyout_title + '&pli=1'
    },
    myspace : {// Share on Myspace
        name: 'Myspace',
        url : 'http://www.myspace.com/Modules/PostTo/Pages/?u=' + flyout_urlPath + '&t=' + flyout_title,
    },
    google: { //bookmark on google
        name: 'Google Bookmark',
        url : 'http://www.google.com/bookmarks/mark?op=add&bkmk=' + flyout_urlPath + '&flyout_title=' + flyout_title
    },
    googlebuzz : { //  Buzz This
        name: 'Google Buzz',
        url : 'http://www.google.com/buzz/post?url=' + flyout_urlPath
    },
    googlereader : { // Share on Google Reader
        name: 'Google Reader',
        url : 'http://www.google.com/reader/link?url=' + flyout_urlPath + '&flyout_title=' + flyout_title + '&srcUrl=http://www.faxiononline.com/&srcflyout_title=Faxion%20Online'
    },
    yahoo : { // Bookmark on Yahoo
        name: 'Yahoo Bookmark',
        url : 'http://bookmarks.yahoo.com/myresults/bookmarklet?u=' + flyout_urlPath + '&t=' + flyout_title
    },
    yahoobuzz : { // Yahoo Buzz
        name: 'Yahoo Buzz',
        url : 'http://buzz.yahoo.com/buzz?targetUrl=' + flyout_urlPath + '&headline=' + flyout_title
    },
    technorati : { // search technorati for links to this post
        name: 'Technorati',
        url : 'http://technorati.com/search/' + flyout_urlPath
    },
    reddit : {// Share on Reddit
        name: 'Reddit',
        url : 'http://reddit.com/submit?url=' + flyout_urlPath + '&flyout_title=' + flyout_title
    },
    friendfeed : {// Share on Friend Feed
        name: 'Friend Feed',
        url : 'http://www.friendfeed.com/share?link=' + flyout_urlPath + '&flyout_title=' + flyout_title
    },
    live : {// Bookmark on Windows Live
        name: 'Windows Live',
        url : 'https://favorites.live.com/quickadd.aspx?marklet=1&mkt=en-us&url=' + flyout_urlPath
    },
    favorites : {
        name: 'Add to Favorites',
        url : 'javascript:window.external.AddFavorite(location.href, document.flyout_title)'
    },
    stumbleupon : {
        name: 'Stumble Upon',
        url : 'http://www.stumbleupon.com/submit?url=' + flyout_urlPath + '&flyout_title=' + flyout_title
    }
}
// END PLACEHOLDER DATA

// just add easing we want without grabbing the whole library
$.extend($.easing, {
  easeOutElastic: function (x, t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
    if (a < Math.abs(c)) { a=c; var s=p/4; }
    else var s = p/(2*Math.PI) * Math.asin (c/a);
    return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
  }
})


$.fn.addFlyout = function(options) {
  var flyout_container = this;
  options = $.extend({
    item_data: data_elements,
    flyout_size: 35,
    flyout_radius: flyout_container.outerWidth() + (options.flyout_size),
    flyout_theme: 'light'
  }, options);
  var flyout_home = $("<div>", {class: "flyout_home"});
  var flyout_linkNames = []
  var visible = false
  var mousein = false
  var containerWidth = options.flyout_radius - (options.flyout_size)
  var containerHeight = options.flyout_radius - (options.flyout_size)
  var center = {
      x: $(flyout_container).width() / 2,
      y: $(flyout_container).height() / 2
  }
  flyout_container.append(flyout_home);
  flyout_home.append('<div class="flyout_tooltip">Share This</div>').addClass(options.flyout_theme);

  $.each(options.item_data, function(key, data) {
    if (data != 0) {
      flyout_container.append('<a href="'+data.url+'" class="flyout_link '+key+' '+options.flyout_theme+'  " alt="'+data.name+'" data-title="'+data.name+'" style="width:'+options.flyout_size+'px;height:'+options.flyout_size+'px"></a>')
      flyout_linkNames.push(data.name)
    }
  });

  //start them all in the center of the container
  flyout_container.find('.flyout_link').each(function() {
      $(this).css({
          top: center.y - (options.flyout_size/2),
          left: center.x - (options.flyout_size/2)
      })
  })
  function showLinks() {
      mousein = true
      if (!visible) {
          visible = true
          flyout_container.find('.flyout_link').each(function(index) {
              speed = Math.floor(Math.random() * (1000 - 700 + 1) + 1000)
              var theta = (2 * Math.PI) * index / flyout_container.find('.flyout_link').length - 1.5 //-1.5 to start at 12:00 position
              $(this).stop().animate({
                  top: center.y  - (options.flyout_size/2) + (Math.sin(theta)*(options.flyout_radius / 2) ),
                  left: center.x - (options.flyout_size/2) + (Math.cos(theta)*(options.flyout_radius / 2) ),
                  opacity: 1,
                  width: (options.flyout_size + 'px'),
                  height: (options.flyout_size + 'px')
              },speed, "easeOutElastic", function() {
                var myX = $(this).position().left
                var myY = $(this).position().top
                $(this).bind('mouseenter', (function() {
                    mousein = true
                    $(this).clearQueue()
                    .animate({
                        width: options.flyout_size * 1.2,
                        height: options.flyout_size * 1.2,
                        top: myY - (((options.flyout_size * 1.2) - options.flyout_size) / 2),
                        left: myX - (((options.flyout_size * 1.2) - options.flyout_size) / 2)
                    }, 100).animate({
                        width: options.flyout_size+'px',
                        height: options.flyout_size+'px',
                        top: myY,
                        left: myX
                    }, 100)
                    flyout_container.find(".flyout_tooltip").css({height: $(this).height(), top: $(this).position().top, left: $(this).position().left})
                    flyout_container.find(".flyout_tooltip").html(flyout_linkNames[index])
                })).bind('mouseleave', (function() {
                    $(this)
                    .animate({
                        width: options.flyout_size+'px',
                        height: options.flyout_size+'px'
                    }, 50)
                    flyout_container.find("flyout_tooltip").html('Share This')
                }))
              })
          })
      }
  }
  function hideLinks() {
      mousein = false
      window.setTimeout(function() {
          if (visible && !mousein) {
              visible = false
              flyout_container.find('.flyout_link').each(function() {
                  speed = Math.floor(Math.random() * (200 - 100 + 1) + 200)
                  $(this).unbind().stop().animate({
                      top: center.y,
                      left: center.x,
                      opacity: 0,
                      width: 0,
                      height: 0
                  },speed, "linear")
              })
          }
      }, 1000, true);
  }
  flyout_container.bind('mouseleave', (hideLinks))
  flyout_home.bind('mouseenter', (showLinks))
};

$(document).ready(function() {

  $('.flyout_menu').on('mouseenter', function(e){
    if ( $(this).has('.flyout_home').length == 0 ) {
      $(this).addFlyout({
        item_data: $(this).data('flyoutdata'),
        flyout_radius: $(this).data('flyoutradius'),
        flyout_size: $(this).data('flyoutsize')
      })
    }
  })

})
