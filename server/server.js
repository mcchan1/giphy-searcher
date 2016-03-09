if(Meteor.isServer){
	console.log('hello server');

	Meteor.methods ({
		ok: function () {
			
			for (var i = 0; i< 5; i++){
				console.log("ok");
				
			}
		}

	});

}