
if (Meteor .isClient){
console.log('client is working');

//set default value of 'hashtagID' from template to ''.
Session.setDefault("hashtagId","");

//HASHTAG SEARCH FORM TEMPLATE 
Template.hashtag.events({
	"submit form": function (event) {
		event.preventDefault();
		//get value from input field 'name' in hashtag template
		var hashtagIdVar = event.target.hashtagId.value;
		//assign value to 'hashtagId'
		Session.set('hashtagId',hashtagIdVar);

		console.log(hashtagIdVar);

		Meteor.call('searchInstagram', hashtagIdVar, function(error, results) {
			console.log("instagram loaded");

		});
		//return false; //prevent the form reload
		
	} //sumbit form	
})
//INSTAFEED TEMPLATE 
	Template.instafeed.helpers({
	
		'loadPictures': function () {
			//select data made available from subscription
			return Photographs.find({},{fields: {
				"data.caption.text":1, "data.images.low_resolution.url":1 } });	
		}, 
		// 'loadCustomer': function () {
		// 	return Customer.find({},{fields: {"tag":1, 'dateTagged':1}});
		// }
	}); //end of helpers

	Template.hashtag.helpers({
		'headline': function () {
			//display value of hashtagId
			return Session.get('hashtagId');
		},

	});

	Template.customerTag.helpers({
		'loadCustomer': function () {
			return Customer.find({},{fields: {"tag":1, 'dateTagged':1}});
		}

	});

	// Template.images.helpers({
	// 	'loadImages': function (){
	// 		return Photographs.find({},{fields: {"data.images.low_resolution":1}});
	// 	}
	// });

	// Template.caption.helpers({
	// 	'loadCaption': function () {
	// 		return Photographs.find({},{fields: {"data.caption.text":1}});
	// 	}
	// });

	Template.instafeed.events({

		'click .delete-image': function (event) {
			
			event.preventDefault();
			//delete button hooks into this._id assigned to this div
			var removeId = this._id;
			//call method, and send removeId as arg
			Meteor.call('deletePhoto', removeId); 	
		}
	}); //instafeed events

//SUBSCRIPTIONS --subscribe to instafeed publication from server
	Meteor.subscribe('instafeed', function() {
		//count number of photographs in Publication 'instafeed'
		console.log("photograph count:" + Photographs.find().count());
	});	

	Meteor.subscribe('customerFeed', function(){
		console.log('client customer ready');
	});

} //end of isClient
