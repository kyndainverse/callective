
var article = '';
var id = location.search.substring(1);


    function loadSingleArticle(){
            dpd.articles.get(id,function(article, error) { 
            //Do something
            showArticle(article);
            loadComments(id);
        });
    }

    function showArticle(article) {
        $('<h1>' + article.Title + '</h1>')   
        .appendTo('#title');

        $('<div class="span12">')   
        .append('<p>'+ article.Content + '</p>')
        .appendTo('#content');

    }

    function loadComments(id) {
    dpd.comments.get(function(comments, error) { //Use dpd.js to send a request to the backend
        $('#comments').empty(); //Empty the list
        comments.forEach(function(comment) { //Loop through the result
        if (comment.articleId === id){
            addComment(comment); //Add it to the DOM.
        }
        });
    });
}

    function addComment(comment) {

        $('<div class="comment">')
            .append('<div class="author">Posted by: ' + comment.name + '</div>')
            .append('<p>' + comment.comment + '</p>')
            .appendTo('#comments');
    }


$(document).ready(function() {

    loadSingleArticle();
    
    $('#comment-form').submit(function() {
        //Get the data from the form
        var name = $('#name').val();
        var comment = $('#comment').val();

        dpd.comments.post({
                name: name,
                comment: comment,
                articleId: id

        }, function(comment, error) {
                if (error) return showError(error);
  
                addComment(comment);
                $('#name').val('');
                $('#comment').val('');
        });

        return false;
    });

});


