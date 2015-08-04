var lastScrollTop = 0;
var isSplashMinimized = false;
$(window).scroll(function(event){
    function maximize() {
        $("#splashHeader").css("height", "100vh");
        $("#splashHeader").css("position", "relative");
    }
    function minimize() {
        $("#splashHeader").css("height", "35vh");
        $("#splashHeader").css("position", "fixed");
        $("#splashHeader").css("top", "0px");
    }
    var st = $(this).scrollTop();
    if (st > lastScrollTop){
       //down
   } else {
       //up
   }
   lastScrollTop = st;
   if (lastScrollTop === 0) {
       maximize();
       isSplashMinimized = false;
   } else {
       if (!isSplashMinimized) {
           minimize();
           isSplashMinimized = true;
       }
   }
});
