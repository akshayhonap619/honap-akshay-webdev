/**
 * Created by Akshay on 8/5/2017.
 */

var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');

var userModel =  mongoose.model('UserModel', userSchema );


userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsernamePassword = findUserByUsernamePassword;
userModel.deleteUser = deleteUser;
userModel.updateUser = updateUser;
userModel.findUserByUsernameOnly = findUserByUsernameOnly;
userModel.addWebsite = addWebsite;
userModel.removeWebsite = removeWebsite;

module.exports = userModel;

function createUser(user) {
        return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findUserByUsernamePassword(username, password) {
                        return userModel.findOne({username : username, password : password});
}

function deleteUser(userId) {
    return userModel.remove({_id : userId});
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
    return userModel.findOne({username: username});
}

function addWebsite(developerid, websiteId) {
    return userModel.findUserById(developerid)
        .then(function (user) {
            user.websites.push(websiteId);
            return user.save();
        });
}

function removeWebsite(developerId, websiteId) {
  console.log(developerId);
    return userModel.findById(developerId)
        .then(function (user) {

            var index = user.websites.indexOf(websiteId);
            user.websites.splice(index, 1);
            return user.save();
        })
}