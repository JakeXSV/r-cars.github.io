var lastScrollTop = 0;
var isSplashMinimized = false;
var articleWaypointsInitialized = false;
var articleHoverpointsInitialized = false;
$(window).scroll(
    function(event) {

        /* on any mobile devices, scrolling changes splash image */
        function setWaypoints() {
            if (!articleWaypointsInitialized && isMobile.any) {
                // Scroll down first article
                new Waypoint({
                    element: document.getElementById("article2"),
                    handler: function(direction) {
                        if (isSplashMinimized) {
                            $("#splashHeader").css("background-image", "url(images/posts/cayman/header.jpg)");
                        }
                    },
                    offset: '50%'
                });
                // Scroll up first article
                new Waypoint({
                    element: document.getElementById("article2"),
                    handler: function(direction) {
                        if (isSplashMinimized) {
                            $("#splashHeader").css("background-image", "url(images/posts/cayman/header.jpg)");
                        }
                    },
                    offset: '40%'
                });
                new Waypoint({
                    element: document.getElementById("article1"),
                    handler: function(direction) {
                        if (isSplashMinimized) {
                            $("#splashHeader").css("background-image", "url(images/posts/hellcat/header.jpg)");
                        }
                    },
                    offset: '40%'
                });
                new Waypoint({
                    element: document.getElementById("article0"),
                    handler: function(direction) {
                        if (isSplashMinimized) {
                            $("#splashHeader").css("background-image", "url(images/posts/camaro/header.jpg)");
                        }
                    },
                    offset: '40%'
                });
                articleWaypointsInitialized = true;
            }
        }

        function setHoverpoints() {
            if (!articleHoverpointsInitialized && !isMobile.any) {
                $("#article2").hover(function(){
                    if (isSplashMinimized) {
                        $("#splashHeader").css("background-image", "url(images/posts/cayman/header.jpg)");
                    }
                });
                $("#article1").hover(function(){
                    if (isSplashMinimized) {
                        $("#splashHeader").css("background-image", "url(images/posts/hellcat/header.jpg)");
                    }
                });
                $("#article0").hover(function(){
                    if (isSplashMinimized) {
                        $("#splashHeader").css("background-image", "url(images/posts/camaro/header.jpg)");
                    }
                });
                articleHoverpointsInitialized = true;
            }
        }

        function maximize() {
            $("#splashHeader").css("height", "100vh");
            $("#splashHeader").css("position", "relative");
            $("#splashHeader").css("background-image", "url(http://r-cars.github.io/images/background.jpg)");
        }

        function minimize() {
            $("#splashHeader").css("height", "15vh");
            $("#splashHeader").css("position", "fixed");
            $("#splashHeader").css("top", "0px");
            setWaypoints();
            setHoverpoints();
        }

        var st = $(this).scrollTop();
        if (st > lastScrollTop) {
            //down
        } else {
            //up
        }
        lastScrollTop = st;
        if (lastScrollTop === 0) {
            isSplashMinimized = false;
            maximize();
        } else {
            if (!isSplashMinimized) {
                isSplashMinimized = true;
                minimize();
            }
        }
    }
);
