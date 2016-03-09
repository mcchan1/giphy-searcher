

if (Meteor .isClient){
console.log('client is working');

Template.hashtag.events({
	"submit .hashtagSearch": function (event) {
		event.preventDefault();

		//var input = event.target.text.value;

		// $('#submit').click(function() {
		// 	loadPictures();
		// })
		Meteor.call('ok');
	}
})


//could also put into onwn javascript file e.g. instafeed.js 
Template.instafeed.helpers({
	'headline': function () {
		return "some  helper Template"

	},

	'loadPictures' : function () {
	
	var tag = 'qoobear'//input.val(); //assign the input value to 'tag'

	var api_key = '1634185146.5b9e1e6.ebf4b224796843379782a86ea0664c24'

	var url = 'https://api.instagram.com/v1/tags/'+ tag +'/media/recent?access_token='+api_key

	$.ajax({
		type: "GET",
		dataType: "jsonp",
		cache: false,
		url: url,
	 	success: function(data) {
		 	photos = data.data; 
			if (photos.length > 0) {

			  $('.instagramPhoto').html(''); 

			 for (var i = 0; i < 6; i++) {
			      $(".instagramPhoto").append(
			      	'<div class = "instagram">' + 
			      	'<div class = "user">' + 
			      	'<img src="' + photos[i].user.profile_picture + ' " />' + 
			      	'<h1>' + photos[i].user.username + '</h1>' + 
			      	'</div>' + 
			      	'<img src="' + photos[i].images.low_resolution.url + '"/>' +
			      	'</div'
				)} //for loop
			} //if
			else {
				$('.instagramPhoto').html('no pics with that #');
			}

			$(".instagram").click(function(){
				$(this).remove();
			})

		 	},	//sucess
	}); //ajax call 

	} //load pictures

}); //end of helpers
	
} //end of isClient

