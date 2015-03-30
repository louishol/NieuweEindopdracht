init = function(mongoos){
	console.log('Initializing Race database schema');

		var raceSchema = new mongoos.Schema({
			name: { type: String, required: true },
			description: { type: String, required: true },
			startdatum: { type: Date, required: true },
			status: {type: String, required:true},
			users: [ {type : mongoos.Schema.ObjectId, ref : 'User'} ],
			//waypoints: [ {type : mongoos.Schema.ObjectId, ref : 'Waypoint'} ]
			waypoints: [{
					placeid: {type: String, required:true },
					name: { type: String, required: true },
					latitude: {type:Number, required:true },
					longitude: {type:Number, required:true },
					users: [ {type : mongoos.Schema.ObjectId, ref : 'User'} ]
			}]
		});
		raceSchema.path('startdatum').validate(function (value) {
			  return value >= Date.now();
			}, 'Datum moet gelijk of groter dan vandaag zijn.');

		mongoos.model('Race', raceSchema);
};
module.exports = init;