function displayArticles() {
    console.log("Getting Articles...");
    $("#results").empty();

    // var newList = $('<div class="list-group">');
    $.getJSON("/all", function (data) {
        for (var i = 0; i < data.length; i++) {

            var newArticleDiv = $('<div class="list-group">');
            // var newArticle = $('<a href="#" class="list-group-item list-group-item-action data-id="' + data[i]._id + '>');
            
            // newArticleDiv.append(newArticle);

            for (var i = 0; i < data.length; i++) {
                var newArticleList = $('<a href="#" class="list-group-item list-group-item-action data-id="' + data[i]._id + '>' + data[i].title + '</a>');

                newArticleDiv.append(newArticleList);
                $("#results").append(newArticleDiv)
            }
    //         // var newListHref = $('<a href="#" class="list-group-item list-group-item-action flex-column align-items-start active">');
    //         var newListHeading = $('<h5 class="mb-1>' + data[i].title + '</h5>');

    //         newList.append(newListHeading);
    //         // newList.append(newListHref);
    //         $("#results").append(newList);
    //         // $("#results").prepend("<ul class='list-group' data-id=" + data[i]._id + "><span class='dataTitle' data-id=" +
    //         //     data[i]._id + ">" + data[i].title + "</span></ul>");
        }
    });
}
displayArticles();