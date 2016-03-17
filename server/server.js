if(Meteor.isServer){
	console.log('hello server');

	Meteor.startup(function(){
		console.log("startup server function");

	});

	Meteor.publish('instafeed', function publishFunction(){
		//wait 2s before loading data
		Meteor._sleepForMs(2000);
		console.log('publication ready');
		return Photographs.find({},{fields: {"data.caption.text":1,"data.images.low_resolution.url":1} });
		
	})

	Meteor.methods({
		searchInstagram: function () {
			console.log('checking instagram..');
			tag = 'qoobear';
			HTTP.call( 'GET', 'https://api.instagram.com/v1/tags/'+tag+'/media/recent?access_token=1634185146.1677ed0.d05110c153ab4f86b27f2e99d58a3f3c', {
				params: {
					  	
				  'count': 2,
				}
			}, function( error, data ) {

			  if ( error ) {
			    console.log( error );
			  } 
			  else {
			  	photos = data.data;
			    
			     
			    //photos = Photographs.find({},{"data.images.low_resolution.url":1,});
			    //photographs.find({},{"data.images.low_resolution.url":1,
			    //"data.caption.text":1,"_id":0}).pretty();

			    Photographs.insert(photos);

				//
			  }
			});
		},

	// Meteor.methods({
	// 	'Instafeed': function() {
	// 		console.log('fetchImages');
	// 		   var feed = new Instafeed({
	//         get: 'popular',
	//         tagName: 'awesome',
	//         accessToken: '1634185146.1677ed0.d05110c153ab4f86b27f2e99d58a3f3c',
	//         template: '<a class="animation" href="{{link}}"><img src="{{image}}" /></a>'
	//     });
	//     feed.run();
	// 	},		
		//1634185146.a2df908.f0a32764c5eb4351a09b94b3df3d0e8d ---not working
	
	// var tag = 'qoobear'//input.val(); //assign the input value to 'tag'

	// var api_key = '1634185146.5b9e1e6.ebf4b224796843379782a86ea0664c24'

	// var url = 'https://api.instagram.com/v1/tags/'+ tag +'/media/recent?access_token='+api_key

	}); //methods
}