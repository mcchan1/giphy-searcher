if(Meteor.isServer){
	//server is awake
	console.log('server is awake');

	Meteor.startup(function(){
		console.log("startup server function");

	});
//PUBLICATIONS 
	Meteor.publish('instafeed', function publishFunction(){
		//wait 2s before loading data
		Meteor._sleepForMs(2000);
		console.log('publication ready');
		// fields from Photographs Collection available for publication -'text' and 'url from instagram
		//plus fields created before insert using collection-hooks package'
		return Photographs.find({},{fields: {"data.caption.text":-1,"data.images.low_resolution.url":-1, 
			'dateTagged':-1,'tag':-1, 'memory':-1, "data.user.username":-1, "data.user.profile_picture":-1}});
	}); //end of publish


//METHODS 
	Meteor.methods({
		//search instagram, using http-request package 
		//Use Session variable 'hashtagIdVar' for the 'tag' value in instagram
		searchInstagram: function (hashtagIdVar) {
			console.log('checking instagram...');

			HTTP.call( 'GET', 'https://api.instagram.com/v1/tags/'+hashtagIdVar+'/media/recent?access_token=1634185146.1677ed0.d05110c153ab4f86b27f2e99d58a3f3c', {
				params: {
					  	
				  'count': 8, //return two instagram posts
				}
			}, function( error, data ) {

			  if ( error ) {
			    console.log( error );
			  } 
			  else {
			  	//assign 'data' response and first'data' layer in instagram endpoint to 'photos'
			  	//photos = data.data; 

				//Insert all data into Photographs Collection. 
				
				Photographs.before.insert(function (userId, doc) { 
					doc.dateTagged = new Date();
					doc.tag = hashtagIdVar;
					doc.memory = '';
				});
				Photographs.insert(data.data);
				
			    //Photographs.insert({photos:data.data,tag:hashtagIdVar,dateTagged: new Date()});
		
			  } //else 
			}); //http call 
		}, //searchInstagram()

		deleteHashtag: function(removeId) {
			//removeId is arg from client side
			Photographs.remove(removeId);
		},//deletePhoto()
		deletePhoto: function (photoUrl) {
			console.log(photoUrl);
			//Photographs.update({id:id}, {$pull:{data.images.low_resolution.url}})
			//Photographs.update({}, {$unset:{'images.low_resolution':{url:photoUrl}}});
			//Photographs.update({}, {$pull:{'images.low_resolution':{url:photoUrl}}});
			//Photographs.remove({},{url:photoUrl});  //removes everything
		},

		addNote: function(newInstagramNote, noteId){
			console.log(newInstagramNote);
			//db.photographs.update({"tag":"qoobear"},{$set:{"memory":"dubba"}})
			Photographs.update(noteId,{$set:{memory:newInstagramNote}});		
		} //addNote
	}); //methods
} //ifServer