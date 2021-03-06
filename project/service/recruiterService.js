/**
 * Created by Akshay on 8/12/2017.
 */

var app = require('./../../express');

var postingModel = require('./../model/posting/postingModel');

app.put('/api/job/recruiter/:userId/posting/new',addJob);

app.post('/api/job/recruiter/:userId/posting/edit',updateJob);

app.get('/api/job/recruiter/:userId/posting', getPostingsForRecruiter);

app.delete('/api/job/posting/:postingId', deletePosting);

app.get('/api/job/student/:userId/posting/search', searchStudentPosting);

app.put('/api/job/student/:userId/posting/:postingId/apply', applyForJob);

app.get('/api/job/posting/:postingId', getPostingById)

app.post('/api/job/student/:userId/posting/:postingId/decision', jobDecision);

app.get('/api/job/student/:userId/applications',getApplicationsForStudent)


function addJob(req,res) {
    var userId = req.params.userId;
    var job = req.body;


    postingModel.createPosting(userId,job)
        .then(function (response) {
            console.log(response);
            res.send(response);
        });
}


function updateJob(req,res) {
    var userId = req.params.userId;
    var job = req.body;


    postingModel.updatePosting(userId,job)
        .then(function (response) {
         //   console.log(response);
            res.send(response);
        });
}


function getPostingsForRecruiter(req,res) {
    var userId = req.params.userId;
    console.log("Main");
    console.log(userId);
    postingModel.getPostingsForRecruiter(userId)
        .then(function (postings) {
           // console.log(postings);
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

function searchStudentPosting(req,res) {
    var userId = req.params.userId;

    var jobTitle,company,location,country,skill,description;

    jobTitle = req.query.jobTitle.toLowerCase();
    company = req.query.company.toLowerCase();
    location = req.query.location.toLowerCase();


    console.log(jobTitle);

    postingModel.getallPostings()
        .then(function (allPostingsResponse) {
           var allPostings = allPostingsResponse;
            var output = [];



            for(p in allPostings){
                if((jobTitle.includes(allPostings[p].jobTitle.toLowerCase()) ||  allPostings[p].jobTitle.toLowerCase().includes(jobTitle))
                    || (company.includes(allPostings[p].company.toLowerCase()) ||  allPostings[p].company.toLowerCase().includes(company)))
                {

                    output.push(allPostings[p]);
                }
            }

            console.log(output);

            res.send(output);

        })
}

function applyForJob(req,res) {
    var postingId = req.params.postingId;
    var userId = req.params.userId;



    postingModel.addApplicant(postingId,userId)
        .then(function (response) {
            res.send(response);
        })


}

function getPostingById(req, res) {
    var postingId = req.params.postingId;



    postingModel.getPostingById(postingId)
        .then(function (response) {
            res.send(response);
        })
}

function jobDecision(req, res) {
    var userId = req.params.userId;
    var postingId = req.params.postingId;

    var decision = req.query.decision;

    console.log("In Job Decision")


    console.log("userId");
    console.log(userId);

    console.log("postingId")
    console.log(postingId);
    console.log(decision)

    postingModel.jobDecision(userId,postingId,decision)
        .then(function (response) {
            console.log("final response");
            console.log(response);
            res.sendStatus(200);
        })



}

function    getApplicationsForStudent(req,res) {
    var userId = req.params.userId;

    console.log(userId);
    postingModel.getallPostings()
        .then(function (postings) {
            var result = [];

            for(p in postings){
                var applicants = postings[p].applicants;
                //console.log(applicants);
                for(a in applicants){

                    if(applicants[a]._id == userId){
                        var post = {}

                        post._id = postings[p]._id;
                        post.jobTitle = postings[p].jobTitle;
                        post.company = postings[p].company;
                        post.location = postings[p].location;
                        post.date = postings[p].date;
                        post.jobType = postings[p].jobType;
                        post.description = postings[p].description;

                        var status = applicants[a].status;
                        post.status = status;
                        console.log(post);
                        result.push(post);
                        break;
                    }
                }

            }

            res.send(result);
        })

}