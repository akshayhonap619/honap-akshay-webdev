/**
 * Created by Akshay on 8/17/2017.
 */

var app = require('../../express')

var userModel = require('../model/user/userModel')
var postingModel = require('../model/posting/postingModel')

app.get('/api/job/admin', getAdmin)
app.get('/api/job/admin/users' , getAllUsers)
app.delete('/api/job/admin/:userId', deleteUser)

app.get('/api/job/allp', getAllpostings)


function getAdmin(req, res) {
    userModel.getAdmin()
        .then(function (response) {
            res.send(response);
        })
}

function getAllUsers(req,res) {
    userModel.getAllUsers()
        .then(function (response) {

           for(u in response){
               if(response[u].username=='admin'){
                   var index = response.indexOf(response[u]);
                   response.splice(index,1);
                   break;
               }
           }

            res.send(response);
        })
}

function deleteUser(req,res) {
    var userId = req.params.userId;

    userModel.deleteUser(userId)
        .then(function () {
            res.send(200);
        })

}

function getAllpostings(req,res) {
   postingModel.getallPostings()
       .then(function (postings) {
           res.send(postings);
       })

}