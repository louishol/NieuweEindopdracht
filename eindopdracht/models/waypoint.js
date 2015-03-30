init = function(mongoos){
	console.log('Initializing Waypoint database schema');
		var waypointSchema = new mongoos.Schema({
			placeid: {type: String, required:true },
			name: { type: String, required: true },
			latitude: {type:Number, required:true },
			longitude: {type:Number, required:true },
			users: [ {type : mongoos.Schema.ObjectId, ref : 'User'} ]
	    });

	    waypointSchema.statics.createIfNotExists = function(waypoint){
			waypoint._id = waypoint._id.toLowerCase();
			this.findById(waypoint._id, function(err, existingWaypoint){
				if(!existingWaypoint){
					var Waypoint = mongoos.model('Waypoint');
					new Waypoint(waypoint).save();
				}
			})
		};	
		mongoos.model('Waypoint', waypointSchema);
};
module.exports = init;