var app = app || {};

app.MyFoodView = Backbone.View.extend({
    tagName: 'li',
    //className: 'collection-item',
    template: _.template( $( '#myfooditemTemplate' ).html() ),

    initialize: function () {
        this.listenTo(this.model, 'change', this.render);
    },

    render: function () {
        this.$el.html( this.template( this.model.attributes ) );
        return this;
    },
    events: {
        'click .delete': 'deleteItem'
    },
    deleteItem: function() {
        //Delete model
        this.model.destroy();

        //Delete view
        this.remove();
    }
});