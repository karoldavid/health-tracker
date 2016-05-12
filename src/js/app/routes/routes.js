/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	var FoodRoutes = Backbone.Router.extend({
		routes: {
			'hide': 'hideAll'
		},

		initialize: function() {
			console.log('routes initialized');
		},

		goto: function(url) {
        	app.FoodRoutes.navigate(url, {trigger: true});
    	},

    	// test
		hideAll: function() {
			$('#healthTracker').hide();
		}
	});

	app.FoodRoutes = new FoodRoutes();

	// route the initial URL
	Backbone.history.start();

	//test
	//app.FoodRoutes.goto('hide');

})();

