var searchData = {};
$.get("/search.json", function(data) {
    console.log(data);
    searchData = data;
});
$('.genericon-search').on('click', function(e) {
    $('.search-text').animate({
        width: 'toggle'
    }, '200');;
})
var articleTitles = $('.post-title');
var searchTerm = '';
$(".search-text").on('keydown', function(e) {
    if (e.keyCode === 8) {
        if (searchTerm.length > 0) {
            searchTerm = searchTerm.substring(0, searchTerm.length - 1);
            searchJson(searchTerm, searchData);
        } else {
            // display all
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
    console.log(foundArticles);
}
