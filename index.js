var navOffset = 55; //This should be 56, but 56 is putting the visuals a pixel off.

$(".navbar li a[href^='#']").on('click', function(event) {
    var target = this.hash;
  
    event.preventDefault();
  
    return $('html, body').animate({
      scrollTop: $(this.hash).offset().top - navOffset
    }, 800, function() {
      return window.history.pushState(null, null, target);
    });
  });