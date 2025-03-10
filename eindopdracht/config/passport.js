var LocalStrategy   = require('passport-local').Strategy;
var passport        = require('passport');


var init = function(User) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    var localStrategyOptions = {
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    };

    passport.use('local-signup', new LocalStrategy(localStrategyOptions, function(req, username, password, done) {
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ 'local.username' :  username }, function(err, user) {
                // if there are any errors, return the error
                if (err){
                    return done(err);
                }

                // check to see if theres already a user with that email
                if (user) {
                    return done(null, false, null);
                } else {

                    // if there is no user with that email
                    // create the user
                    var newUser            = new User(req.body);

                    // set the user's local credentials
                    newUser.local.username    = username;
                    newUser.local.password = newUser.generateHash(password);
                    // save the user
                    newUser.save(function(err) {
                        if (err)
                        {
                            console.log("Error : " + err);
                        }
                        return done(null, newUser);
                    });
                }
            });    
        });
    }));

    passport.use('local-login', new LocalStrategy(localStrategyOptions, function(req, username, password, done) { // callback with email and password from our form
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.username' :  username }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);
            // if no user is found, return the message
            if (!user)
                return done(null, false, null); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, null); // create the loginMessage and save it to session as flashdata
            // all is well, return successful user
            return done(null, user);
        });

    }));

    return passport;
};

module.exports = init;