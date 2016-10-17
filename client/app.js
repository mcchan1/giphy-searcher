
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
			console.log("gifs loaded");

		});
		//return false; //prevent the form reload		
	} //sumbit form	
});

Template.hashtag.helpers({
	'headline': function () {
		//display value of hashtagId
		return Session.get('hashtagId');
	},
});

//SHARE TEMPLATE
Template.share.events({
	'click #share-album': function () {
		const email = document.getElementById("sharedEmail").value;
		console.log('share this: ' + email);
		Meteor.call('shareAlbum', email)
	}
});

//INSTAFEED TEMPLATE 
	Template.instafeed.helpers({
	
		'loadPictures': function () {
			//select data made available from subscription
			console.log('loadPictures');
			return Photographs.find({},{fields: { "data.url":1,"data.images.fixed_height":1,"data.rating":1,"data.source":1,"data.username":1,
				'tag':1,'dateTagged':1, }});
		},

	}); //end of helpers




	Template.instafeed.events({
		'click .delete-hashtag': function (event) {
			event.preventDefault();
			//delete button hooks into this._id assigned to this div
			var removeId = this._id;
			//call method, and send removeId as arg
			Meteor.call('deleteHashtag', removeId); 	
		}, 

		'click #close': function(event) {
			event.preventDefault();
			console.log('removing instagramDisplay div...');
			//consider using photoUrl to remove via $pull in collection. 
			var photoUrl = this.fixed_height;
			
			//jquery to remove div
			var closeX = $(event.target);
			var closeDiv = $(closeX.closest('div'));
			closeDiv.remove(photoUrl);
		
			Meteor.call('deletePhoto', photoUrl, function(error, results){
				console.log('photos method deleting...');
			});	
		},
	}); //instafeed events

//NOTES TEMPLATE	
	Template.notes.events({
		'submit form': function() {
			event.preventDefault();
			var noteId = this._id;
		
			var gifNote = event.target.gifNote.value
			console.log(gifNote);
			console.log(noteId );
			Meteor.call('addNote', noteId, gifNote, function(error, results){
				console.log('note: ' + gifNote + ' added to: ' + noteId);
			});
		}
	})

	Template.notes.helpers({
		'loadMemory': function() {
			var noteId = this._id; 
			return Photographs.find({_id: this._id}, {fields: {'memory':1} });
		}
	});

//SUBSCRIPTIONS --subscribe to instafeed publication from server
	Meteor.subscribe('instafeed', function() {
		//count number of photographs in Publication 'instafeed'
		console.log("photograph count:" + Photographs.find().count());
	});	

} //end of isClient
