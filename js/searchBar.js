var searchData = {};
$.get("/search.json", function(data) {
    searchData = data;
});
$('.genericon-search').on('click', function(e) {
    $('.search-text').animate({
        width: 'toggle'
    }, '200');
});
var searchTerm = '';
$(".search-text").on('keydown', function(e) {
    var EscapeKeyCode = 27;
    var BackspaceKeyCode = 8;
    if (e.keyCode === EscapeKeyCode) {
        searchTerm = '';
        $("#searchInput").val("");
        $("#searchResults").html("");
        $('.search-text').animate({
            width: 'toggle'
        }, '200');
        setTimeout(function() {
            $("article").show();
        }, 250);
    }
    if (e.keyCode === BackspaceKeyCode) {
        if (searchTerm.length >= 1) {
            searchTerm = searchTerm.substring(0, searchTerm.length - 1);
            searchJson(searchTerm, searchData);
        } else {
            $("article").show();
            $("#searchResults").html("");
        }
    } else {
        searchTerm += String.fromCharCode(e.keyCode);
        searchJson(searchTerm, searchData);
    }
});
function searchJson(text, dataSet) {
    text = text.toLowerCase();
    var foundArticles = [];
    for (var prop in dataSet) {
        if (prop.indexOf(text) > -1) {
            foundArticles.push(dataSet[prop]);
        }
    }
    var resultHtml = '';
    foundArticles.forEach(function(article){
        resultHtml += loadData(article);
    });
    $("#searchResults").html(resultHtml);
    $("article").hide();
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
