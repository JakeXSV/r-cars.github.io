$("#articleSideBar").sidebar({side: "right"});
function openArticle(articleLink) {
    console.log(articleLink);
    $.get(articleLink, function(data) {
        var elements = $(data);
        var content = $(".content", elements);
        $("#articleSideBar").append("<div id=articleSideBarContent></div>");
        $("#articleSideBarContent").html(content);
        $.ajax({
            url: "/js/3rdParty/disqus.js",
            dataType: "script",
            success: function() {
                console.log("success.");
            }
        });
    });
    $("#articleSideBar").trigger("sidebar:open");
}
function closeMe() {
    $("#articleSideBarContent").remove();
    $("#articleSideBar").trigger("sidebar:close");
}

//open all articles from the right
$('.open-article').on('click', function() {
  openArticle($(this).data('href'));
});
