/**
 * Created by Akshay on 8/12/2017.
 */
var app = require('../../express')

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new LocalStrategy(localStrategy))
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);


var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};

passport.use(new GoogleStrategy(googleConfig, googleStrategy));

var userModel = require('../model/user/userModel')

app.get("/api/job/check/:username", findUser)
app.get("/api/job/user/:userId", findUserById);
app.post("/api/job/admin/add", createUser);
app.put("/api/job/user/:userId", updateUser);
app.delete("/api/job/user/:userId", deleteUser);

app.put("/api/job/user/:userId/profile", updateStudentProfile);

//Authentication
app.post('/api/job/user/login',passport.authenticate('local'),login)
app.get('/api/job/checkLogin', checkLogin)
app.post('/api/job/user/logout', logout)
app.post('/api/job/user/register', register)

//Google
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

app.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/project/#/student',                          //'/#/newGoogleUser',
        failureRedirect: '/project/#/login'
    }));


function localStrategy(username, password, done) {
    userModel.getUserByCredentials(username,password)
        .then(
            function(user) {
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            },
            function(err) {
                if (err) { return done(err); }
            }
        );
}

function register(req, res) {
    var newUser = req.body;
    userModel.createUser(newUser)
        .then(function (user) {
           req.login(user,function (status) {
               res.send(user);
           })

        },function (error) {
            res.send(404);
        })
}

function login(req,res){
    var user = req.user;
    res.send(user);
}

function checkLogin(req, res) {

    res.send(req.isAuthenticated() ? req.user : '0');
}

function logout(req, res) {
    req.logOut();
    res.send(200);
}

function updateStudentProfile(req,res) {
    var userId = req.params.userId;
    var profile = req.body;
       // console.log(userId + "userId")
    userModel.updateStudentProfile(userId,profile)
        .then(function (user) {
            res.send(user);
        })

}

function getUserByUsernamePass(req, res) {
    console.log("Here");
    var username = req.query.username;
    var password = req.query.password;
    var role= req.query.role;

   /* console.log(username);
    console.log(password);
    console.log(role);*/

    res.send("user recieved");
}

function findUserById(req, res) {
    var userId = req.params.userId;

    userModel.findUserById(userId)
        .then(function (user) {
            res.send(user);
        });
}

function findUser(req, res) {
    var result=null;
    var username = req.params.username;
   // var password = req.query.password;
   // var role = req.query.role;
    console.log("Password is "+username);


        userModel.findUserByUsernameOnly(username)
            .then(function (user) {
             /*   console.log("res")
                console.log(user)
             */   if(user!=null) {
                    res.send(404)
                }
                else{
                    res.send(200)
                }

            });
            //res.send("Only username");


   /* else
    {

        /!*userModel.findUserByUsernamePassword(username,password)
            .then(function (user) {
                if(user!=null) {
                    res.send(user)
                }
                else {
                    res.send(404);
                }
            });*!/

        userModel.getUserByCredentials(username,password,role)
            .then(function (response) {
                if(response != null){
                    res.send(response);
                }
                else{
                    res.sendStatus(404);
                }

            })
    }*/



}

function createUser(req , res) {

    var newUser = req.body;

   // console.log(newUser);

    userModel.createUser(newUser)
        .then(function (user) {
           // console.log("new user created");
            res.send(user);
        },function (error) {
            res.send(404);
        })

    /*userModel.createUser(newUser)
        .then(function (user) {
            console.log("babu user is "+user);
            res.send(user._id);
*/
           // res.send(200);
       // });

    //users.push(newUser);

}

function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;

   // console.log(userId)
   // console.log(req.body);

   userModel.updateUser(userId,user)
        .then(function (status) {
            res.send(200);
        });

}


function deleteUser(req,res) {
    var userId = req.params.userId;


    userModel.deleteUser(userId)
        .then(function (user) {
            console.log("returned");
            res.sendStatus(200);
        });
   //res.send("deleted user");
}


/*
function findUserByUsernameOnly(username) {
    for(u in users){
        if(users[u].username == username){
            return users[u];
        }
    }
    return null;
}

function findUserByUsernamePassword(username, password) {

    userModel.findUserByUsernamePassword(username,password)
        .then(function (user) {

        });


}
*/

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        role : 'student',
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}