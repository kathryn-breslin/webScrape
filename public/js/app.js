
// function displayArticles() {
//     console.log("Getting Articles...");
//     $("#results").empty();

// var newList = $('<div class="list-group">');
var newArticleDiv = $('<div class="list-group">');

$.getJSON("/all", function (data) {

    // var newArticleDiv = $('<div class="list-group">');

    for (var i = 0; i < data.length; i++) {
        var newArticleList = $('<a href="#" class="list-group-item list-group-item-action>');
        var newArticleHeader = $('<h5 class"mb-1">' + data[i].title + '</h5>');
        var newSummary = $('<p class="mb-1">' + data[i].teaser + '</p>');
        var commentSection = $('<div class="form-group"><textarea class="form-control" id="commentSection" rows="3"></textarea></div>')
        var commentButton = $('<button id="comment" type="button" class="btn btn-primary btn-sm" value=' + data[i]._id + '>').html("Add Comment");
        var deleteButton = $('<button id="delete" type="button" class="btn btn-primary btn-sm" value=' + data[i]._id + '>').html("Delete");

        var spacer = $('<br>');

        newArticleDiv.append(newArticleList);
        newArticleDiv.append(newArticleHeader);
        newArticleDiv.append(newSummary);
        newArticleDiv.append(commentSection);
        newArticleDiv.append(commentButton);
        newArticleDiv.append(spacer);
        newArticleDiv.append(deleteButton);
        newArticleDiv.append(spacer);

        $("#results").append(newArticleDiv)
    }
});

$("#results").on("click", "#comment", function (event) {
    event.preventDefault();

    // var commentSection = $("#commentSection").val();
    // console.log(commentSection);

    // var newComment = $('<div class="newComment"><p class"data-entry" data-id="' + data._id + '<span class="delete">Delete Comment</span>/p></div>')
    // newArticleDiv.append(newComment);
    // console.log(newComment);

    var thisId = $(this).attr("data-id");

    $.ajax({
       method: "POST",
       url: "/all/" + thisId,
       data: {
           comment: $("#commentSection").val()
        }
    }).then(function (data) {
        console.log(data);
        $("#results").prepend('<p id="newComment" class="data-entry" data-id="' + data._id + '</p>');
        $("#commentSection").val();
     })
})


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

// $("comment").on("click", function (req, res) {
//     event.preventDefault();

//     $.ajax({
//         type: "POST", 
//         dataType: "json", 
//         url: "/comment", 
//         data: {
//             comment: $("#commentSection").val()
//         }
//     }).then(function(data) {
//         var newComment = $('<div class="newComment"><p class"data-entry" data-id="' + data._id + '<span class="delete">Delete Comment</span>/p></div>')
//         newArticleDiv.append(newComment);
//         console.log(newComment);

//         $("#commentSection").val();
//     });
// });

// $(document).on("click", "comment", function () {
    // var thisId = $(this).attr("data-id");

    // $.ajax({

    //     method: "POST", 
    //     url: "/articles/" +thisId, 
    //     data : {
    //         comment: $("#commentSection").val()
    //     }
    // })
    // .then(function(data) {
    //     console.log(data);

    //     $("#commentSection").empty()
    // })
// })