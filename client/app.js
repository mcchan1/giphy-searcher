

if (Meteor .isClient){
console.log('client is working');
Session.setDefault("hashtagId","");

Template.hashtag.events({
	"submit form": function (event) {
		event.preventDefault();
		//get value from input field in hashtag template
		var hashtagIdVar = event.target.hashtagId.value;
		
		Session.set('hashtagId',hashtagIdVar);

		console.log(hashtagIdVar);
		//put hashtagIdVar into Collection
		//Hashtag.insert({Hashtag: hashtagIdVar});
		//Meteor.call('insertHashtagData', hashtagIdVar);

		Meteor.call('searchInstagram', hashtagIdVar, function(error, results) {
			console.log("insta photo loaded");//); //results shoudl be json obj.
		});

		return false; //prevent the form reload
	}
})


//could also put into onwn javascript file e.g. instafeed.js 
Template.instafeed.helpers({
	'headline': function () {
		return Session.get('hashtagId');
	}, 

	'loadPictures': function () {

		return Photographs.find({},{fields: {
			"data.caption.text":1, "data.images.low_resolution.url":1} });	
	}	

//
}); //end of helpers

	//SUBSCRIPTIONS 
	Meteor.subscribe('instafeed', function() {
		//count number of photographs in Publication 'instafeed'
		console.log("photograph count:" + Photographs.find().count());
	});	

	// Meteor.subscribe('hashtag', function (){
	// 	console.log("hashtag searches count:" + Hashtag.find().count())
	// });


} //end of isClient
