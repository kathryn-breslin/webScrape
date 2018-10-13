
// function displayArticles() {
//     console.log("Getting Articles...");
//     $("#results").empty();

// var newList = $('<div class="list-group">');
var newArticleDiv = $('<div class="list-group">');

$.getJSON("/all", function (data) {

    // var newArticleDiv = $('<div class="list-group">');

    for (var i = 0; i < data.length; i++) {
        var newArticle= $('<div data-id="' + data[i]._id + '</div>');
        var newArticleHeader = $('<h5 class"mb-1">' + data[i].title + '</h5>');
        var newSummary = $('<p class="mb-1">' + data[i].teaser + '</p>');
        var commentSection = $(`<div class="form-group"><textarea class="form-control" id=${'commentSection' + data[i]._id} rows="3"></textarea></div>`)
        var newComment = $('<p class"mb-1" id="newComment" name="body"</p>');
        var commentButton = $('<button type="button" class="btn btn-primary btn-sm comment" value=' + data[i]._id + '>').html("Add Comment");
        var deleteButton = $('<button id="delete" type="button" class="btn btn-primary btn-sm" value=' + data[i]._id + '>').html("Delete Comment");

        var spacer = $('<br>');

        newArticleDiv.append(newArticle);
        newArticleDiv.append(newArticleHeader);
        newArticleDiv.append(newSummary);
        newArticleDiv.append(newComment);
        newArticleDiv.append(commentSection);
        newArticleDiv.append(commentButton);
        newArticleDiv.append(spacer);
        newArticleDiv.append(deleteButton);
        newArticleDiv.append(spacer);
        $("#results").append(newArticleDiv)

    }
});


$("#results").on("click", ".comment", function (event) {
    event.preventDefault();

    var thisId = $(this).val();
    var comment = $("#commentSection" + thisId).val();

    console.log(comment);
    $.ajax({
       method: "POST",
       url: "/all/" + thisId,
       data: {
           body: comment
        }
    }).then(function (data) {
        console.log(data);

        if (data.comment) {
            $("#newComment").val(data.comment.body);
        }
        // var newComment = $('<p id="newComment" class="data-entry" data-id="' + data._id + data.comment + '"</p>')
        // newArticleDiv.append(newComment);

        // $("#results").prepend('<p id="newComment" class="data-entry" data-id="' + data._id + '"</p>');
        $("#commentSection" + thisID).val("");
     })
})


$("#results").on("click", "#clear", function (event) {
    event.preventDefault();

    $.ajax({
        method: "GET",
        url: "/all", 
        data: {
            title: title, 
            teaser: teaser, 
            link: link, 
            comment: comment
        }
    }).then(function(data) {
        $("#results").empty()
    })
});

