if(Meteor.isServer){
	console.log('hello server');

	Meteor.methods({
		searchInstagram: function () {
			console.log('checking..');
			tag = 'qoobear';
			HTTP.call( 'GET', 'https://api.instagram.com/v1/tags/'+tag+'/media/recent?access_token=1634185146.1677ed0.d05110c153ab4f86b27f2e99d58a3f3c', {
				params: {
					  	
				  'count': 1,
				}
			}, function( error, data ) {

			  if ( error ) {
			    console.log( error );
			  } 
			  else {
			  	photos = data.data;
			    
			    console.log(photos)
			  }
			});
		}, 
		//1634185146.a2df908.f0a32764c5eb4351a09b94b3df3d0e8d ---not working
	// loadPictures : function () {
	
	// var tag = 'qoobear'//input.val(); //assign the input value to 'tag'

	// var api_key = '1634185146.5b9e1e6.ebf4b224796843379782a86ea0664c24'

	// var url = 'https://api.instagram.com/v1/tags/'+ tag +'/media/recent?access_token='+api_key

	}); //methods
}