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
		//only two fields from Photographs Collection will be available for publication -'text' and 'url'
		return Photographs.find({},{fields: {"data.caption.text":1,"data.images.low_resolution.url":1} });
		
	}); //end of publish
//METHODS 
	Meteor.methods({
		//search instagram, using http-request package 
		//Use Session variable 'hashtagIdVar' for the 'tag' value in instagram
		searchInstagram: function (hashtagIdVar) {
			console.log('checking instagram...');

			HTTP.call( 'GET', 'https://api.instagram.com/v1/tags/'+hashtagIdVar+'/media/recent?access_token=1634185146.1677ed0.d05110c153ab4f86b27f2e99d58a3f3c', {
				params: {
					  	
				  'count': 2, //return two instagram posts
				}
			}, function( error, data ) {

			  if ( error ) {
			    console.log( error );
			  } 
			  else {
			  	//assign 'data' response and first'data' layer in instagram endpoint to 'photos'
			  	photos = data.data; 
				//Insert all data into Photographs Collection. 
			    Photographs.insert(photos);
			  } //else 
			}); //http call 
		}, //searchInstagram()
		deletePhoto: function() {
			console.log("deletePhoto");
		}
	}); //methods
} //ifServer