/**
 * Created by Akshay on 8/13/2017.
 */

var mongoose = require('mongoose');

var userSchema = require('./userSchema');

var userModel =  mongoose.model('userModel', userSchema);


userModel.createUser = createUser;
userModel.getUserByCredentials = getUserByCredentials;
userModel.findUserById = findUserById;
userModel.deleteUser = deleteUser;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.deleteUser = deleteUser;
userModel.updateUser = updateUser;
userModel.updateStudentProfile = updateStudentProfile;
userModel.findUserByUsernameOnly = findUserByUsernameOnly;
//Admin
userModel.getAdmin = getAdmin;
userModel.getAllUsers = getAllUsers;

module.exports = userModel;


function createUser(user) {
   // console.log("In user model")
   // console.log(user);
    return userModel.create(user)
}

/*function deleteUser(req, res) {
    var userId = req.params.userId;

    return userModel.deleteUser(userId)
        .then(function (response) {
            res.send(200);
        })

}*/

function getUserByCredentials(username,password) {
     return userModel.findOne({username : username, password : password});
}

function findUserById(userId) {
    return userModel.findById({_id : userId});
}

function findUserByGoogleId(googleId) {
    return userModel.findOne({'google.id' : googleId})
}

function deleteUser(userId) {
    return userModel.remove({_id : userId})
}

function updateStudentProfile(userId,profile) {
  //  console.log("userModel");
   // console.log(userId)
    return userModel.findById({_id : userId})
        .then(function (user) {
           // console.log("model user");
           // console.log(user);
            user.profile = profile;
            return user.save();
        })

}

function updateUser(userId, user) {
    return userModel.update({_id : userId},
        {$set : {
            firstName : user.firstName,
            lastName : user.lastName,
            email : user.email
        }}
    )
}

function findUserByUsernameOnly(username) {
console.log("username is "+username)
    return userModel.findOne({username: username});
}

function getAdmin() {
    return userModel.findOne({username : 'admin', password: 'admin'})
}

function getAllUsers() {
    return userModel.find();

}