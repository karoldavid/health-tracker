var app = app || {};

app.ListView = Backbone.View.extend({
    el: $('#search'),
    events: {
        'keyup input': 'getResults',
        'click i': 'resetSearch'
    },
    initialize: function() {
        _.bindAll(this, 'render', 'getResults');
        this.collection = new app.List();
        this.results= $('#searchResults');
        this.myFood = $('#myFood');
        this.render();
    },
    render: function() {
        this.results.empty();
        var that = this,
            results = that.collection.toJSON();

        results.forEach(function(item){
            that.renderListItem(item);
        });
    },
    renderListItem: function(item) {
        var listItemView = new app.ListitemView({
            model: item
        });
        this.results.append(listItemView.render().el);
    },
    getResults: function(e) {
        e.preventDefault();
        var query = $('input').val(),
            //query = e.target.value,
            that = this,
            newUrl = "https://api.nutritionix.com/v1_1/search/" + query +"?results=0:5&appId=45d2f648&appKey=554a56cde5749526f1c5bb56190fda39";
            this.collection.query = query;
            this.collection.url = newUrl;
        if (query !=='') {
            this.collection.fetch({
                data: $.param({ phrase: query, cal_min: 0, cal_max: 50000, limit: 10, results: {0:5}, fields: '*'}),
                success: function() {
                    that.render();
                },
                error: function() {
                    console.log('Failed to fetch from Nutritionix API');
                }
            });
        } else {
            that.collection.reset();
            that.render();
        }
    },
    resetSearch: function(e) {
        e.preventDefault();
        $('input').val('');
        this.collection.reset();
        this.render();
    }
});


// @TODO: integrate custom search properties
// @TODO: save selected data to database