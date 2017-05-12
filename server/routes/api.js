
var config = require('../config/config');

// Initialize Cloudant with settings from .env
var username = undefined,
    password = undefined,
    cloudant = undefined,
    configDB = undefined,
    Cloudant = undefined,
    bcrypt   = undefined,
    usersDB  = undefined;

if(config.requireAuth){
    configDB = require('../config/database');
    username = configDB.db_creds.username;
    password = configDB.db_creds.password;
    Cloudant = require('cloudant');
    cloudant = Cloudant({account:username, password:password});
    bcrypt   = require('bcrypt-nodejs');
    usersDB = cloudant.db.use(configDB.db_creds.usersDBName);
}



const fs = require('fs');

var imagesPath = 'dist/assets/images'; //images must be in src/assets/clue_images folder when deployed


module.exports = function(app, passport) {


	
    // PROFILE SECTION =========================
    app.post('/api/login', passport.authenticate('local-login', {}), function(req, res) {
        var isAd = req.user && req.user.admin;
        var isPriv = req.user && req.user.privileged;
        if(!isAd) {
            isAd = false;
        }
        if(!isPriv) {
            isPriv = false;
        }
        var response = {
            loggedIn: true,
            admin: isAd,
            privileged: isPriv
        }
        res.status(200).send(response);
    });

    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/',
            failureRedirect : '/login'
        }));

    app.post('/api/register', function(req, res) {
        if(!config.requireAuth){
            return res.status(200).send("Successfully Registered: Authentication Turned Off");
        }

        var errorJson = {};

        if(!req.body){
            errorJson.error = "No post body found - provide a user";
        } else if (!req.body.user) {
            errorJson.error = "No User found";
        } else if (!req.body.user.email) {
            errorJson.error = "No User Email found";
        } else if (!req.body.user.password) {
            errorJson.error = "No User Password found";
        } else if (!req.body.user.passwordConfirm) {
            errorJson.error = "No User Password Confirmation found";
        } else if (!req.body.user.company) {
            errorJson.error = "No User Company found";
        } else if (!req.body.user.firstName) {
            errorJson.error = "No User Company found";
        } else if (!req.body.user.lastName) {
            errorJson.error = "No User Company found";
        }

        if(errorJson.error){
            res.status(400).send(errorJson.error);
        } else {
            var user = req.body.user;
            user.email = user.email.toLowerCase();

            emailAvaliable(user.email, function (avaliable) {
                if(!avaliable) {
                    res.status(400).send("Email Unavaliable");
                } else {
                    if(user.password != user.passwordConfirm){
                        res.status(400).send("Passwords Don't Match");
                    } else { //passwords match
                        var hashed_pass = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);

                        var protectedUser = {
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            password: hashed_pass,
                            company: user.company,
                            tasksComplete: {}
                        }

                        usersDB.insert(protectedUser, function (er, body, headers) {
                          if (er) {
                            res.status(500).send("Failed to Register: " + protectedUser.email);
                          } else {
                            res.status(200).send("Successfully Registered: " + protectedUser.email);
                          }
                        });
                    }
                }
            });         
        }
    });

    //

    app.get('/api/authenticated', isLoggedIn, function(req, res) {
        var isAd = req.user && req.user.admin;
        var isPriv = req.user && req.user.privileged;
        if(!isAd) {
            isAd = false;
        }
        if(!isPriv) {
            isPriv = false;
        }
        var response = {
            authenticated: true,
            admin: isAd,
            privileged: isPriv
        }
        res.status(200).json(response);
    });

    // LOGOUT ==============================
    app.get('/api/logout', function(req, res) {
        req.logout();
        req.session.destroy(function (err) {
            res.status(200).send({loggedOut: true});
        });
    });


	//========== API Routes Below =============

	app.get('/api/unprotected/testcall', (req, res) => {
        res.status(200).send({data: 'SUCCESS'});
	});

    app.get('/api/protected/testcall', isLoggedIn, (req, res) => {
        res.status(200).send({data: 'SUCCESS'});
    });
}

function emailAvaliable(email, next) {
	usersDB.find({selector: {email: email}}, function(err, result) {
        if (err){
            next(false);
        } else if (result.docs.length == 0){
            next(true); // avaliable!
        } else {
        	next(false); // not avaliable
        }
    });
}

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if(!config.requireAuth){ //override logged in requirement
        return next();
    }
    if (req.isAuthenticated())
        return next();

    res.status(401).send('unauthenticated');
}

// route middleware to ensure user is admin
function isAdmin(req, res, next) {
    if(!config.requireAuth){ //override logged in requirement
        return next();
    }
    if (req.user.admin){
        return next();
    }
    res.status(401).json({'admin': false});
}

// route middleware to ensure user is admin
function isPrivileged(req, res, next) {
    if(!config.requireAuth){ //override logged in requirement
        return next();
    }
    if (req.user.privileged){
        return next();
    }
    res.status(401).json({'privileged': false});
}