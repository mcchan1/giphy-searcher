

if (Meteor .isClient){
console.log('client is working');

Template.hashtag.events({
	"submit .hashtagSearch": function (event) {
		event.preventDefault();

		//var input = event.target.text.value;

		// $('#submit').click(function() {
		// 	loadPictures();
		// })
		Meteor.call('searchInstagram',function(error, results) {
			console.log("insta photo loaded");//); //results shoudl be json obj.
		});
	}
})


//could also put into onwn javascript file e.g. instafeed.js 
Template.instafeed.helpers({
	'headline': function () {
		return "some  helper Template"
	}, 

	'loadPictures': function () {
		var caption = find({},{fields: {"data.caption.text":1} });
		console.log(caption); 
	}

//
}); //end of helpers
Meteor.subscribe('Photographs');	
} //end of isClient
