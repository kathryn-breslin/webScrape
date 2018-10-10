
// function displayArticles() {
//     console.log("Getting Articles...");
//     $("#results").empty();

    // var newList = $('<div class="list-group">');
    $.getJSON("/all", function (data) {
      
            var newArticleDiv = $('<div class="list-group">');

            for (var i = 0; i < data.length; i++) {
                var newArticleList = $('<a href="#" class="list-group-item list-group-item-action>');
                var newArticleHeader = $('<h5 class"mb-1">' + data[i].title + '</h5>');
                var newSummary = $('<p class="mb-1">' + data[i].teaser + '</p>');
                var commentSection = $('<div class="form-group"><textarea class="form-control" id="commentSection" rows="3"></textarea></div>')
                var commentButton = $('<button id="comment" type="button" class="btn btn-primary btn-sm" value=' + data[i]._id + '>').html("Add Comment");
                var spacer = $('<br>');

                newArticleDiv.append(newArticleList);
                newArticleDiv.append(newArticleHeader);
                newArticleDiv.append(newSummary);
                newArticleDiv.append(commentSection);
                newArticleDiv.append(commentButton);
                newArticleDiv.append(spacer);

                $("#results").append(newArticleDiv)
            }
    });
// }
// displayArticles();

// $("#comment").on("click", function (req, res) {
//     event.preventDefault();
// })

$("#clear").on("click", function (req, res) {
    event.preventDefault();

    $.ajax({
        type: "GET", 
        dataType: "json", 
        url: "/clearall", 

        success: function (response) {
            $("#results").empty();
        }
    });
});

$("comment").on("click", function (req, res) {
    event.preventDefault();

    $.ajax({
        type: "POST", 
        dataType: "json", 
        url: "/comment", 
        data: {
            comment: $("#commentSection").val()
        }
    }).then(function(data) {
        var newComment = $('<div class="newComment"><p class"data-entry" data-id="' + data._id + '<span class="delete">Delete Comment</span>/p></div>')
        newArticleDiv.append(newComment);

        $("#commentSection").val();
    });
})