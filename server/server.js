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
		return Photographs.find({},{fields: {"data.caption":-1,"data.url":-1,"data.rating":-1,
		 "data.source":-1,"data.images.fixed_height":-1,"data.username":-1,
			'dateTagged':-1,'tag':-1, 'memory':-1,  }});
	}); //end of publish


//METHODS 
	Meteor.methods({
		//search Giphy using http-request package 
		//Use Session variable 'hashtagIdVar' for the 'tag' value in instagram
		searchInstagram: function (hashtagIdVar) {
			console.log('checking giphy...');

			HTTP.call( 'GET', 'http://api.giphy.com/v1/gifs/search?q='+hashtagIdVar+'&api_key=dc6zaTOxFJmzC', {
				params: {
					  	
				  'limit': 4, //return gifs ...
				  'fmt': JSON, //return json in server for debugging
				}
			}, function( error, data ) {

			  if ( error ) {
			    console.log( error );
			  } 
			  else {
			  	//assign 'data' response and first'data' layer in giphy endpoint to 'photos'
			  	//photos = data.data; 

				//Insert all data into Photographs Collection. 
				console.log(data.data);
				console.log(hashtagIdVar);
				
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

		addNote: function(noteId, gifNote){
	
			Photographs.update(
				{ _id: noteId },
				{$set:
					{
						memory: gifNote,
					}
				}
			);
			//db.photographs.update({"tag":"qoobear"},{$set:{"memory":"dubba"}})
			//Photographs.update(noteId,{$set:{memory:gifNote}});		
		}, //addNote

		shareAlbum: function(email) {
			console.log('album shared with..' + email);
		}
	}); //methods
} //ifServer