
var Article = Backbone.Model.extend({
  defaults: {
    Title: '',
    Content: '',
    Comments: '',
    Summary: ''
  }
});

var Articles = Backbone.Collection.extend({
  url: '/articles',
  model: Article
});

var ArticleView = Backbone.View.extend({


  template: _.template($('#article-template').html()),

   events: {
  //   'change .completed-chk': 'completedChanged'
   },

  initialize: function() {
    this.model.bind('change', this.render, this);
    this.model.bind('destroy', this.remove, this);
  },


  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }

});

var WholeArticleView = Backbone.View.extend({

  template: _.template($('#whole-template').html()),

   events: {
  //   'change .completed-chk': 'completedChanged'
   },

  initialize: function() {
    this.model.bind('change', this.render, this);
    this.model.bind('destroy', this.remove, this);
  },


  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }

});




var ArticleAppView = Backbone.View.extend({
  el: '#articles-app',

  events: {
    'click #view-btn': 'viewWholeArticle',
  },

  initialize: function() {
    this.articles = new Articles();

    this.articles.bind('all', this.render, this);
    this.articles.bind('reset', this.renderArticles, this);
    this.articles.bind('add', this.renderOneArticle, this);
    this.articles.bind('add', this.viewWholeArticle, this);

    this.articles.fetch();


  },
  render: function() {
    console.log(articles);
    if (this.articles.length) {
      this.$('#empty').hide();
    } else {
      this.$('#empty').show();
    }
  },
  renderArticles: function() {
    this.$('#articles').empty();
    this.articles.each(this.renderOneArticle.bind(this.Content));
  },
    renderOneArticle: function(article) {
    article.attributes.Summary = article.attributes.Content.substring(0,500);
    var view = new ArticleView({model: article});
    this.$('#articles').append(view.render().el);
  },
  
  viewWholeArticle: function(button){
       this.$('#articles').empty();
       var id = button.currentTarget.name;
       console.log(id);
//       var articles = new Articles ;
//       articles.fetch();
       console.log(articles);
       var article = this.articles.get(id);
      console.log(article.attributes.Summary);
      var view = new WholeArticleView({model: article});
      this.$('#articles').append(view.render().el);

  }

});



var app = new ArticleAppView();
