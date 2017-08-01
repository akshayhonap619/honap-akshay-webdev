/**
 * Created by Akshay on 7/27/2017.
 */
//require('mongoose');
var userModel =  require('../model/user/user.model.server');

var app = require("../../express");

app.get("/api/user/:userId", findUserById);
app.get("/api/user", findUser);

app.post("/api/user", createUser);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);

var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
];

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
    console.log("Password is "+password);
    /*for(u in users)
    {
        var myuser = users[u];
        if(myuser.username === username  && myuser.password === password) {
            res.json( myuser);
            return;
        }

    }*/
    if(typeof password == 'undefined'){
        /*var result = findUserByUsernameOnly(username);
        console.log(result);
        if(result === null){

                res.send(200);
        }
        else{
                res.send(404);
        }*/
        userModel.findUserByUsernameOnly(username)
            .then(function (user) {
              if(user!=null) {
                  res.send(404)
              }
                  else{
                      res.send(200)
                  }

            });

    }
    else
    {

        userModel.findUserByUsernamePassword(username,password)
            .then(function (user) {
                if(user!=null) {
                    res.send(user)
                }
                    else {
                    res.send(404);
                }
            });

    }



}

function createUser(req , res) {
    var newUser = {   //_id : (new Date()).getTime() + "",
    username : req.body.username,
    password : req.body.password
 };

userModel.createUser(newUser)
         .then(function (user) {
             console.log("babu user is "+user);
             res.send(user._id);
         });

 //users.push(newUser);


}

function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;

    //console.log(req.body);

    /*for(u in users){
        if(users[u]._id == userId){
            users[u].firstName = user.firstName;
            users[u].lastName = user.lastName;
            users[u].username = user.username;
            users[u].email = user.email;
            res.send(200);
            return;
        }
    }*/

    userModel.updateUser(userId,user)
        .then(function (status) {
            res.send(200);
        });



}


function deleteUser(req,res) {
    var userId = req.params.userId;
//    console.log(userId);

    userModel.deleteUser(userId)
        .then(function (user) {
            res.send(200);
        });
}

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

      /*for(u in users){
          if(users[u].username == username && users[u].password == password){
             return users[u];
          }
      }
      return null;*/
}
