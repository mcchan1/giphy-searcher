if(Meteor.isServer){
	console.log('hello server');

	Meteor.methods({
		searchInstagram: function () {
			console.log('checking..');
			
			HTTP.call( 'GET', 'https://api.instagram.com/v1/tags/qoobear/media/recent?access_token=1634185146.1677ed0.d05110c153ab4f86b27f2e99d58a3f3c', {
				params: {
					// 'ACCESS_TOKEN': '1634185146.1677ed0.d05110c153ab4f86b27f2e99d58a3f3c',
					 'COUNT': 1

				}
			}, function( error, data ) {

			  if ( error ) {
			    console.log( error );
			  } 
			  else {
			  	photos = data.data;
			    console.log( photos);
			    /*
			     This will return the HTTP response object that looks something like this:
			     {
			       content: "String of content...",
			       data: Array[100], <-- Our actual data lives here. 
			       headers: {  Object containing HTTP response headers }
			       statusCode: 200
			     }
			    */
			  }
			});
		}, 
		//1634185146.a2df908.f0a32764c5eb4351a09b94b3df3d0e8d ---not working
	// loadPictures : function () {
	
	// var tag = 'qoobear'//input.val(); //assign the input value to 'tag'

	// var api_key = '1634185146.5b9e1e6.ebf4b224796843379782a86ea0664c24'

	// var url = 'https://api.instagram.com/v1/tags/'+ tag +'/media/recent?access_token='+api_key

	// $.ajax({
	// 	type: "GET",
	// 	dataType: "jsonp",
	// 	cache: false,
	// 	url: url,
	//  	success: function(data) {
	// 	 	photos = data.data; 
	// 		if (photos.length > 0) {

	// 		  $('.instagramPhoto').html(''); 

	// 		 for (var i = 0; i < 6; i++) {
	// 		      $(".instagramPhoto").append(
	// 		      	'<div class = "instagram">' + 
	// 		      	'<div class = "user">' + 
	// 		      	'<img src="' + photos[i].user.profile_picture + ' " />' + 
	// 		      	'<h1>' + photos[i].user.username + '</h1>' + 
	// 		      	'</div>' + 
	// 		      	'<img src="' + photos[i].images.low_resolution.url + '"/>' +
	// 		      	'</div'
	// 			)} //for loop
	// 		} //if
	// 		else {
	// 			$('.instagramPhoto').html('no pics with that #');
	// 		}

	// 		$(".instagram").click(function(){
	// 			$(this).remove();
	// 		})

	// 	 	},	//sucess
	// }); //ajax call 

	// } //load pictures
	}); //methods
}