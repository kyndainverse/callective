
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

var NewArticleView = Backbone.View.extend({

  template: _.template($('#new-template').html()),

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
    'click #new-btn' : 'createNewArticle',
    'click #add-btn': 'addArticle',   
  },

  initialize: function() {
    this.articles = new Articles();

    this.articles.bind('all', this.render, this);
    this.articles.bind('reset', this.renderArticles, this);
    this.articles.bind('add', this.renderOneArticle, this);
    this.articles.bind('add', this.viewWholeArticle, this);
    this.articles.bind('add', this.createNewArticle, this);

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
       var article = this.articles.get(id);
      var view = new WholeArticleView({model: article});
      this.$('#articles').append(view.render().el);

  },

  createNewArticle: function(){

    this.$('#articles').empty();
    var article = new Article;
    var view = new NewArticleView({model: article});
    this.$('#articles').append(view.render().el);
  },

    addArticle: function() {
     var title = this.$('#newTitle').val();
     var contents = this.$('#newArticle').val();
     console.log(contents);
     new Article({
          Title: title,
          Content: contents
      });

       // article.create({
       //   Title: title,
       //   Contents: contents
       // });
       // this.$('#newTitle').val('');
       // this.$('#newArticle').val('');
       // return false;
  },

});



var app = new ArticleAppView();
