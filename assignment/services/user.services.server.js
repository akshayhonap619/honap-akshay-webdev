/**
 * Created by Akshay on 7/27/2017.
 */
var app = require("../../express");

app.get("/user/:userId", findUserById);
app.get("/user", findUser);

app.post("/user", createUser);
app.put("/user/:userId", updateUser);
app.delete("/user/:userId", deleteUser);

var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
];

function findUserById(req, res) {
    var userId = req.params.userId;
    var result ={};
        for(u in users)
        {
            if(users[u]._id === userId)
            {
                result =  users[u];
            }

        }
    res.send(result);
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
        var result = findUserByUsernameOnly(username);
        console.log(result);
        if(result === null){

                res.send(200);
        }
        else{
                res.send(404);
        }
    }
    else
    {

        var result = findUserByUsernamePassword(username,password)
        if(result == null){
            res.send(404);
        }
        else{
            res.json(result);
        }
    }

    //res.send(404);

}

function createUser(req , res) {
    var newUser = { _id : (new Date()).getTime() + "",
    username : req.body.username,
    password : req.body.password
 };

 users.push(newUser);

    res.send(newUser);
}

function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;

    //console.log(req.body);

    for(u in users){
        if(users[u]._id == userId){
            users[u].firstName = user.firstName;
            users[u].lastName = user.lastName;
            users[u].username = user.username;
            users[u].email = user.email;
            res.send(200);
            return;
        }
    }


}


function deleteUser(req,res) {
    var userId = req.params.userId;
    console.log(userId);

    var user;
    for(u in users){
        if(users[u]._id === userId){
            user = users[u];
        }
    }
    var index = users.indexOf(user);
    console.log("iindex is "+index);
    users.splice(index,1);

    res.send(200);
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

      for(u in users){
          if(users[u].username == username && users[u].password == password){
             return users[u];
          }
      }
      return null;
}
