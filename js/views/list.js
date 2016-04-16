var app = app || {};

app.ListView = Backbone.View.extend({
    el: $('#search'),
    events: {
        'keyup input': 'getResults',
        'click i': 'deleteQuery',
    },
    initialize: function() {
        _.bindAll(this, 'render', 'getResults');
        this.collection = new app.List();
        this.render();
    },
    render: function() {
        var self = this;
    },
    renderList: function() {
        $("#list").empty();
        var that = this,
            results = that.collection;

        results.forEach(function(item){
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
        var query = e.target.value,
            that = this,
            newUrl = "https://api.nutritionix.com/v1_1/search/" + query +"?results=0:5&appId=45d2f648&appKey=554a56cde5749526f1c5bb56190fda39";
            this.collection.url = newUrl;
        this.collection.fetch({
            data: $.param({ phrase: query, cal_min: 0, cal_max: 50000, limit: 10}),
            success: function() {
                // console.log(that.collection.toJSON());
                that.renderList();
            },
            error: function() {
                console.log('Failed to fetch!');
            }
        });
    },
    deleteQuery: function( e ) {
        e.preventDefault();
        $('input').val('');
        $("#list").empty();
    }
});
