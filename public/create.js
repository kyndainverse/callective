  

$(document).ready(function() {
        $('#new-article').submit(function() {
        //Get the data from the form
       var newArticle = $('#newArticle').val();
       var newTitle = $('#newTitle').val();
console.log("hello");
        dpd.articles.post({
                Title: newTitle,
                Content: newArticle

        }, function(comment, error) {
                if (error) return showError(error);

             loadArticles();
        });

        return false;
    });

});


