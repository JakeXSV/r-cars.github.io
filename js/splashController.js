var lastScrollTop = 0;
var isSplashMinimized = false;
var articleWaypointsInitialized = false;
$(window).scroll(
    function(event) {
        var articleWaypoints = [];

        function setWaypoints() {
            if (!articleWaypointsInitialized) {
                new Waypoint({
                    element: document.getElementById("article2"),
                    handler: function(direction) {
                        console.log('cayman - ' + direction);
                        $("#splashHeader").css("background-image", "url(images/posts/cayman/header.jpg)");
                    },
                    offset: '50%'
                });
                new Waypoint({
                    element: document.getElementById("article1"),
                    handler: function(direction) {
                        console.log('hellcat - ' + direction);
                        $("#splashHeader").css("background-image", "url(images/posts/hellcat/header.jpg)");
                    },
                    offset: '40%'
                });
                new Waypoint({
                    element: document.getElementById("article0"),
                    handler: function(direction) {
                        console.log('camaro - ' + direction);
                        $("#splashHeader").css("background-image", "url(images/posts/camaro/header.jpg)");
                    },
                    offset: '40%'
                });
                articleWaypointsInitialized = true;
            }
        }

        function maximize() {
            $("#splashHeader").css("height", "100vh");
            $("#splashHeader").css("position", "relative");
        }

        function minimize() {
            $("#splashHeader").css("height", "35vh");
            $("#splashHeader").css("position", "fixed");
            $("#splashHeader").css("top", "0px");
            setWaypoints();
        }

        var st = $(this).scrollTop();
        if (st > lastScrollTop) {
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
    }
);
