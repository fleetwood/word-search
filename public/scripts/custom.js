(function(){
    $(window).scroll(function () {
        var top = $(document).scrollTop();
        if(top > 50)
          $('#home > .navbar').removeClass('navbar-transparent');
        else
          $('#home > .navbar').addClass('navbar-transparent');
    });
  
    $("a[href='#']").click(function(e) {
      e.preventDefault();
    });
  
})();