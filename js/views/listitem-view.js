var app = app || {};


app.ListitemView = Backbone.View.extend({
    tagName: 'li',
    //className: 'collection-item',
    template: _.template( $( '#listitemTemplate' ).html() ),

    render: function() {
        this.$el.html( this.template(this.model));
        return this;
    },
    events: {
        'click .addToMyFood': 'addToMyFood',
        'click .delete': 'deleteItem'
    },
    addToMyFood: function() {
        var item = this.model;
        app.myfoodlist.add(item);
    },
    deleteItem: function() {
        //Delete model
        this.model.destroy();

        //Delete view
        this.remove();

    }
});