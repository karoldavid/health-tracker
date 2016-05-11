var app = app || {};

app.Food = Backbone.Model.extend({
    url: function() {
        return '/api/myfood/' + encodeURIComponent(this.id);
    },
    ocalStorage: true,
    idAttribute:"_id",
    defaults: {
        _id: '',
        name: '',
        fat: 0,
        carbs: 0,
        protein: 0,
        calories: 0
    },

    parse: function(response) {

        if (typeof response.fields != 'undefined') {
        var food = {};
            food._id          = response._id;
            food.name        = response.fields.item_name;
            food.calories    = response.fields.nf_calories;
            food.fat         = response.fields.nf_total_fat;
            food.carbs       = response.fields.nf_total_carbohydrate;
            food.protein     = response.fields.nf_protein;
            return food;
        } else
            return response;
    }
});