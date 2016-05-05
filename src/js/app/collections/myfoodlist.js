var app = app || {};

app.MyFoodList = Backbone.Collection.extend({
    model: app.Food
});


app.myfoodlist = new app.MyFoodList();