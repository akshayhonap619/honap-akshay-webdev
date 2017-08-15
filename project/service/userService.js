/**
 * Created by Akshay on 8/12/2017.
 */
var app = require('../../express')

var userModel = require('../model/user/userModel')

app.get('/api/job/user',findUser);

app.get("/api/job/user/:userId", findUserById);
app.post("/api/job/user", createUser);
app.put("/api/job/user/:userId", updateUser);
app.delete("/api/job/user/:userId", deleteUser);



function getUserByUsernamePass(req, res) {
    console.log("Here");
    var username = req.query.username;
    var password = req.query.password;
    var role= req.query.role;

    console.log(username);
    console.log(password);
    console.log(role);

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
    var username = req.query.username;
    var password = req.query.password;
    var role = req.query.role;
    console.log("Password is "+password);


    if(password === 'undefined'){

        /*userModel.findUserByUsernameOnly(username)
            .then(function (user) {
                if(user!=null) {
                    res.send(404)
                }
                else{
                    res.send(200)
                }

            });*/
            res.send("Only username");

    }
    else
    {

        /*userModel.findUserByUsernamePassword(username,password)
            .then(function (user) {
                if(user!=null) {
                    res.send(user)
                }
                else {
                    res.send(404);
                }
            });*/

        userModel.getUserByCredentials(username,password,role)
            .then(function (response) {
                if(response != null){
                    res.send(response);
                }
                else{
                    res.sendStatus(404);
                }

            })
    }



}

function createUser(req , res) {

    var newUser = req.body;

    console.log(newUser);
    console.log("nU");
    userModel.createUser(newUser)
        .then(function (user) {
            console.log("new user created");
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

    //console.log(req.body);

  /*  userModel.updateUser(userId,user)
        .then(function (status) {
            res.send(200);
        });
*/
console.log(user);
res.send("done");
}


function deleteUser(req,res) {
    var userId = req.params.userId;
//    console.log(userId);

   /* userModel.deleteUser(userId)
        .then(function (user) {
            res.send(200);
        });*/
   res.send("deleted user");
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
