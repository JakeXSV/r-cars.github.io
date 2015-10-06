
$('.genericon-search').on('click', function(e) {
    $('.search-text').animate({width: 'toggle'}, '200');;
})

var $articleTitles = $('.post-title');
var searchTerm = "";

function search() {

  $articleTitles.each(function(i, elem) {
    if ($(elem).text().toUpperCase().indexOf(searchTerm) === -1) {
      $(elem).closest('article').hide();
    } else {
      $(elem).closest('article').show();
    }
  });
    if ($('article:hidden').length === $articleTitles.length) {
      $('#no-results').show();
    }
  }

  $(".search-text").on('keydown', function(e) {
    if (e.keyCode === 8) {
      if (searchTerm.length > 0) {
        searchTerm = searchTerm.substring(0, searchTerm.length - 1);
        $('#no-results').hide();
        search();
      }
    } else {
      searchTerm += String.fromCharCode(e.keyCode);
      search();
    }
  });
