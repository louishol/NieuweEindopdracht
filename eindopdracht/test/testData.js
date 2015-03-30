var async = require('async');
var mongoose = require('mongoose');


function fillUsers(done){
	var User = mongoose.model('User');
	User.remove({}, function(){
		async.parallel([
			function(cb) { new User({firstName: 'Louis', middleName: '', lastName: 'Hol', age: 20, admin: true, local: {username: "louis", password:"louis"}}).save(cb); },
			function(cb) { new User({firstName: 'Jarno', middleName: 'van', lastName: 'Wijgerden', age: 21, admin: true, local: {username: "jarno", password:"jarno"}}).save(cb); },
			function(cb) { new User({firstName: 'Rick', middleName: 'de', lastName: 'Jong', age: 24, admin: false, local: {username: "james", password:"dejong"}}).save(cb); },
			function(cb) { new User({firstName: 'James', middleName: 'de', lastName: 'Jong', age: 22, admin: false, local: {username: "rick", password:"dejong"}}).save(cb); },
			function(cb) { new User({firstName: 'Martijn', middleName: '', lastName: 'Schuurmans', age: 25, admin: true, local: {username: "martijn", password:"schuurmans"}}).save(cb); }
		], function() {
			done();
		})
	});
};

function fillRaces(done){
	var Race = mongoose.model('Race');
	Race.remove({}, function(){
		async.parallel([
			function(cb) 
			{ 
				var way = [{ placeid: "ChIJR10vFTJfxkcRaYKiRpR6sqY", name: "De Kletskop", latitude: "51.877266", longitude: "5.288234", waypoints: way}];
				new Race({name: 'Race 1', description: 'Leuke race 1', startdatum: '2015-10-10', status: "Open"}).save(cb); 
			},
			function(cb) { new Race({name: 'Race 2', description: 'Leuke race 2', startdatum: '2015-10-09', status: "Open"}).save(cb); },
			function(cb) { new Race({name: 'Race 3', description: 'Leuke race 3', startdatum: '2015-10-08', status: "Closed"}).save(cb); },
			function(cb) { new Race({name: 'Race 4', description: 'Leuke race 4', startdatum: '2015-10-07', status: "Open"}).save(cb); },
			function(cb) { new Race({name: 'Race 5', description: 'Leuke race 5', startdatum: '2015-10-06', status: "Open"}).save(cb); },

		], function() {

			done();
		})
	});
};

module.exports = {
	fillTestdata: function(done){
		async.parallel([
			fillUsers,
			fillRaces
		], function(){ done() });
	}
}