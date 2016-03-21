if(Meteor.isServer){
	//server is awake
	console.log('server is awake');

	Meteor.startup(function(){
		console.log("startup server function");

	});

	Meteor.publish('instafeed', function publishFunction(){
		//wait 2s before loading data
		Meteor._sleepForMs(2000);
		console.log('publication ready');
		//only two fields from Photographs Collection for publication -'text' and 'url'
		return Photographs.find({},{fields: {"data.caption.text":1,"data.images.low_resolution.url":1} });
		
	});
	Meteor.publish('hashtag', function getHashtag() {
			console.log('hashtag publication');
			// MAKE THIS RETURN A VAR?  SO searchInstagram() could get this value?
			return Hashtag.find({},{sort: { Hashtag:-1 } });
			
			
			
	})

	Meteor.methods({
		//search instagram, using http-request package 
		searchInstagram: function (hashtagIdVar) {
			console.log('checking instagram..');
			//console.log(hashtagIdVar[0]); --return value from collection store as var

			//tag = 'qoobear';
			HTTP.call( 'GET', 'https://api.instagram.com/v1/tags/'+hashtagIdVar+'/media/recent?access_token=1634185146.1677ed0.d05110c153ab4f86b27f2e99d58a3f3c', {
				params: {
					  	
				  'count': 2,
				}
			}, function( error, data ) {

			  if ( error ) {
			    console.log( error );
			  } 
			  else {
			  	photos = data.data;
			    
			    //NOTE: MongoDB command
			    //db.photographs.find({},{"data.images.low_resolution.url":1,
			    //"data.caption.text":1,"_id":0}).pretty();

					//Insert all data into Photographs Collection. 
			    Photographs.insert(photos);
			  } //else 
			}); //http call 
		}, //searchInstagram 

		'insertHashtagData': function(hashtagIdVar) {
			Hashtag.insert({Hashtag: hashtagIdVar
			});
		} //insertHashtagData
	}); //methods

} //ifServer