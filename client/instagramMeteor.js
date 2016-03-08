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

	'loadPictures' : function () {
	var tag = 'qoobear';//input.val(); //assign the input value to 'tag'

	var api_key = '1634185146.5b9e1e6.ebf4b224796843379782a86ea0664c24'

	var url = 'https://api.instagram.com/v1/tags/'+ tag +'/media/recent?access_token='+api_key

	$.ajax({
		type: "GET",
		dataType: "jsonp",
		cache: false,
		url: url,
	 	success: console.log('instagram'),
		
	}); //ajax call 

	} //load pictures

}); //end of helpers
	
} //end of isClient

