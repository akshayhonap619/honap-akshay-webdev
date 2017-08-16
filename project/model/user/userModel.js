/**
 * Created by Akshay on 8/13/2017.
 */

var mongoose = require('mongoose');

var userSchema = require('./userSchema');

var userModel =  mongoose.model('userModel', userSchema);


userModel.createUser = createUser;
userModel.getUserByCredentials = getUserByCredentials;
userModel.findUserById = findUserById;

module.exports = userModel;


function createUser(user) {
    console.log("In user model")
    console.log(user);
    return userModel.create(user)
}

function getUserByCredentials(username,password) {
     return userModel.findOne({username : username, password : password});
}

function findUserById(userId) {
    return userModel.findById({_id : userId});
}