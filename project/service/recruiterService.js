/**
 * Created by Akshay on 8/12/2017.
 */

var app = require('./../../express')

var postingModel = require('./../model/posting/postingModel')

app.put('/api/job/recruiter/:userId+/posting/new',addJob);

app.get('/api/job/recruiter/:userId/posting', getPostingsForRecruiter)

app.delete('/api/job/posting/:postingId', deletePosting)


function addJob(req,res) {
    var userId = req.params.userId;
    var job = req.body;

    console.log(userId)
   // console.log(job)
    postingModel.createPosting(userId,job)
        .then(function (response) {
            console.log(response);
            res.send(response);
        });
}


/*function getPosting(req, res) {
     var userId = req.params.userId;
     postingModel.getPosting(userId)
         .then(function (response) {
             console.log(response);
             res.send(response);
         })
}*/

function getPostingsForRecruiter(req,res) {
    var userId = req.params.userId;
    console.log("Main")
    console.log(userId)
    postingModel.getPostingsForRecruiter(userId)
        .then(function (postings) {
            console.log(postings)
           res.json(postings);
        })
}

function deletePosting(req, res) {
    var postingId = req.params.postingId;

    postingModel.deletePosting(postingId)
        .then(function (reponse) {
            res.send(200);
        })
}