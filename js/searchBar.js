
var searchData = {};
$.get("/search.json", function(data) {
    searchData = data;
});
$('.genericon-search').on('click', function(e) {
    $('.searchText').animate({
        width: 'toggle'
    }, '200');
});
$("#searchInput").on('input', function() {
    searchJson($(this).val(), searchData);
});
$("#searchInput").on('keydown', function(e) {
    if (e.keyCode === 27) {
        $("#searchNoResults").hide();
        $("#searchInput").val("");
        $("#searchResults").html("");
        $('.searchText').animate({
            width: 'toggle'
        }, '200');
        setTimeout(function() {
            $("article").show();
        }, 250);
    }
});
function showNoSearchResults() {
    $("#searchNoResults").show();
    $("#searchNoResults").css("display", "inline-block");
}
function searchJson(text, dataSet) {
    if (text.length === 0) {
        $("#searchResults").html("");
        $("article").show();
        return;
    }
    text = text.toLowerCase();
    var foundArticles = [];
    for (var prop in dataSet) {
        if (prop.indexOf(text) > -1) {
            foundArticles.push(dataSet[prop]);
        }
    }
    var resultHtml = '';
    if (foundArticles.length === 0) {
        $("#searchResults").html("");
        showNoSearchResults();
    } else {
        foundArticles.forEach(function(article){
            resultHtml += loadData(article);
        });
        $("#searchNoResults").hide();
        $("#searchResults").html(resultHtml);
        $("article").hide();
    }
}
function loadData(data) {
    var template = searchStartTemplate.replace("{url}", data.url);
    template = template.replace("{title}", data.title);
    template = template.replace("{excerpt}", data.excerpt);
    template = template.replace("{author}", data.author);
    var tagsHtml = ' '; // space between {author} on <tags>
    for (var i = 0; i < data.tags.length; i++) {
        var tag = data.tags[i];
        var first = searchMiddleTemplate.replace("{tag}", tag);
        tagsHtml += first.replace("{tag}", tag);
        if ( i + 1 !== data.tags.length) {
            tagsHtml += ", ";
        }
    }
    template += tagsHtml;
    template += searchEndTemplate.replace("{date}", data.date)
    return template;
}
var searchStartTemplate = multiline(function(){/*
    <div class="post post">
        <header class="post-header">
            <h2 class="post-title"><a class="open-article" data-href="{url}">{title}</a></h2>
        </header>
        <section class="post-excerpt">
            <p>{excerpt}</p>
        </section>
        <footer class="post-meta">
            <img class="author-thumb" src="../images/logo.png" alt="Author image" nopin="nopin" /> {author} on
 */});
var searchMiddleTemplate = "<a href='/tags/{tag}/'>#{tag}</a>";
var searchEndTemplate = multiline(function(){/*
            <time class="post-date">
                {date}
            </time>
        </footer>
    </div>
*/});
