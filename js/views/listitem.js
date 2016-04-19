var app = app || {};


app.ListitemView = Backbone.View.extend({
    tagName: 'li',
    className: 'collection-item',
    template: _.template( $( '#listitemTemplate' ).html() ),

    render: function() {
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

        console.log(app.ListView.collection);
    }
});