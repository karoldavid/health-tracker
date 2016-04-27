var app = app || {};

app.ListView = Backbone.View.extend({
    el: $('#healthTracker'),
    events: {
        'keyup #search input': 'getResults',
        'click #search i': 'resetSearch',
        'click .addToMyFood': 'addToMyFood',
    },
    initialize: function() {
        _.bindAll(this, 'render', 'getResults');
        this.collection = new app.List();
        this.render();
    },
    render: function() {
        //console.log(this.collection);
    },
    renderList: function() {
        $("#list").empty();
        var that = this,
            results = that.collection;

        results.models.forEach(function(item){
            that.renderListItem(item);
        });

    },
    renderListItem: function(item) {
        var listItemView = new app.ListitemView({
            model: item
        });

        $('#list').append( listItemView.render().el )
    },
    getResults: function( e ) {
        e.preventDefault();
        var query = $('#search input').val(),
            //query = e.target.value,
            that = this,
            newUrl = "https://api.nutritionix.com/v1_1/search/" + query +"?results=0:5&appId=45d2f648&appKey=554a56cde5749526f1c5bb56190fda39";
            this.collection.query = query;
            this.collection.url = newUrl;
        if (query != '') {
            this.collection.fetch({
                data: $.param({ phrase: query, cal_min: 0, cal_max: 50000, limit: 10, results: {0:5}, fields: '*'}),
                success: function() {
                    that.renderList();
                },
                error: function() {
                    console.log('Failed to fetch!');
                }
            });
        } else {
            that.collection.reset();
            that.renderList();
        }
    },
    addToMyFood: function(item) {
        var view = new app.TodoView({ model: item });
        this.$list.append(view.render().el);
    },
    resetSearch: function( e ) {
        e.preventDefault();
        $('input').val('');
        this.collection.reset();
        this.renderList();
    }
});


// @TODO: integrate custom search properties
// @TODO: save selected data to database