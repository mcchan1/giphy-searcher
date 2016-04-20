
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
			return Photographs.find({},{fields: {"data.caption.text":1, "data.images.low_resolution.url":1,
				'tag':1,'dateTagged':1}});	
		}, 
	}); //end of helpers

	Template.hashtag.helpers({
		'headline': function () {
			//display value of hashtagId
			return Session.get('hashtagId');
		},

	});

	Template.instafeed.events({
		'click .delete-image': function (event) {
			event.preventDefault();
			//delete button hooks into this._id assigned to this div
			var removeId = this._id;
			//call method, and send removeId as arg
			Meteor.call('deletePhoto', removeId); 	
		}
	}); //instafeed events

	Template.notes.events({
		'submit .new-note': function (event) {
			event.preventDefault();
			var noteId = this._id;
			var newInstagramNote = event.target.instagramNote.value;
			console.log(newInstagramNote);
			Meteor.call('addNote', newInstagramNote, noteId, function(error,results){
				console.log('note added');
			});

		}
	});

//SUBSCRIPTIONS --subscribe to instafeed publication from server
	Meteor.subscribe('instafeed', function() {
		//count number of photographs in Publication 'instafeed'
		console.log("photograph count:" + Photographs.find().count());
	});	

} //end of isClient
