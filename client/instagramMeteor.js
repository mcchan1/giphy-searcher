Photographs = new Mongo.Collection('photographs');

if (Meteor .isClient){


Template.hashtag.events({
	"submit .hashtagSearch": function (event) {
		
	}
})


//could also put into onwn javascript file e.g. instafeed.js 
Template.instafeed.helpers({
	'headline': function () {
		return "some bullshit headline"
	},

	'loadPictures': function () {
		console.log ('qoo test');
		var feed = new Instafeed({
        get: 'popular',
        tagName: 'awesome',
        clientId: 	'a2df9087998b4356b28162781ccd2da1',
        template: '<a class="instafeed" href="{{link}}"><img src="{{image}}" /></a>'
    });
    feed.run();

	}

});
	
}