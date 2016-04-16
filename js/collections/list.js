var app = app || {};

app.List = Backbone.Collection.extend({
    model: app.Item,

    url: "https://api.nutritionix.com/v1_1/search/apple?results=0:5&appId=45d2f648&appKey=554a56cde5749526f1c5bb56190fda39",

    parse: function(response) {
        return response.hits;
    },

    sync: function(method, model, options) {
        var that = this;
        var params = _.extend({
            type: 'GET',
            url: that.url,
            processData: false
        }, options);

        return $.ajax(params);
    }
});