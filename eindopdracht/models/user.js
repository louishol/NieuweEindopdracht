var bcrypt   = require('bcrypt-nodejs');

init = function(mongoos){
	console.log('Initializing User database schema');

		var userSchema = new mongoos.Schema({
			firstName: { type: String, required: true },
			middleName: {type: String, required:false},
			lastName: { type: String, required: true },
			age: { type: Number, required: true },
			admin: {type: Boolean, required: true},
			local            : {
		        username        : String,
		        password     : String
	    	}
	    },
	    { // settings:
			toObject: { virtuals: true },
    		toJSON: { virtuals: true }
		}
	   	);
		userSchema.methods.generateHash = function(password) {
	    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
		};

		userSchema.methods.validPassword = function(password) {
		    return bcrypt.compareSync(password, this.local.password);
		};

		userSchema.virtual('fullName').get(function(){
			var fullName = this.firstName + ' ';
			if(this.middleName && this.middleName.length){
				fullName += this.middleName + ' ';
			}
			fullName += this.lastName;
			return fullName;
		});	

		userSchema.statics.createIfNotExists = function(user){
			user._id = user._id.toLowerCase();
			this.findById(user._id, function(err, existingUser){
				if(!existingUser){
					var User = mongoos.model('User');
					new User(user).save();
				}
			})
		};	
		mongoos.model('User', userSchema);
};

module.exports = init;