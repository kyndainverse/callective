


    function loadSingleArticle(id){
          $('#articles').empty(); //Empty the list
            dpd.articles.get(id,function(articles, error) { 
            //Do something
            showArticle(articles);
        });
    }

    function addArticles(articles,i) {

            var intro = articles.Content.substring(0,500);
     //           console.log("row " + i)
            if (i === 1){ // create a row for the first line in the grid
                $('<div class="row-fluid">')
                .appendTo('#articles');
            }


            $('<div class="span4">')     
            .append('<a href="http://localhost:2403/article1.html?' + articles.id + '">' + articles.Title + '</a>')
            .append('<p>' + intro + '</p>')
            .append('</div>')     
//            .append("<button class = 'btn' onclick=loadSingleArticle('" +articles.id+ "')>View</button>")
            .appendTo('#articles');
            if (i % 3 === 0){ // start a new row for every fourth article
                $('</div> <div class="row-fluid">')
                 .appendTo('#articles');
            }   

    }


    function loadArticles() {
    dpd.articles.get(function(articles, error) { //Use dpd.js to send a request to the backend
        $('#articles').empty(); //Empty the list
        var i = 0
        articles.forEach(function(articles) { //Loop through the result
            i++
            addArticles(articles,i); //Add it to the DOM.
        });
    });
}


$(document).ready(function() {
    loadArticles();


});


