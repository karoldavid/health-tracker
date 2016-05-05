var app = app || {};

app.MyFoodListView = Backbone.View.extend({
    el: $('#myFood'),
    events: {
        //
    },
    initialize: function() {
        this.listenTo(app.myfoodlist, 'add', this.addOne);

    },
    render: function() {

    },
    addOne: function(food) {
        var view = new app.MyFoodView({ model: food });
        this.$el.append(view.render().el);
    }
});


// @TODO: integrate custom search properties
// @TODO: save selected data to database