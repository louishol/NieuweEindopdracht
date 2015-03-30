var express = require('express');
var router = express.Router();




module.exports = function(passport, mongoose){
	router.route('/')
		.get(function(req, res, next) {

			var userSchema = mongoose.model("User");
			userSchema.find(function(err, users) {
	        if (err)
	        {
	          res.send(err);
	        }
	        else
	        {
	          res.json(users);
	        }
	      });
		});
		
	router.post('/login', passport.authenticate('local-login'),function(req, res) {
		console.log("IS auth " + req.isAuthenticated());
		res.send(req.user);
  	});
	router.route('/signup')
		.post(passport.authenticate('local-signup'), function(req, res) {
		console.log("Hij komt er");
	     res.send(req.user);
	    });

 	router.post('/logout', function(req, res) {
 		console.log("User loguit");
	  req.logout();
	  res.redirect('/login');
	});
	return router;
};
