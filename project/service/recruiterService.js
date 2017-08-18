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

    console.log(userId);
   // console.log(job)
    postingModel.createPosting(userId,job)
        .then(function (response) {
            console.log(response);
            res.send(response);
        });
}


function updateJob(req,res) {
    var userId = req.params.userId;
    var job = req.body;

    //console.log(userId);
    //console.log(job)
    postingModel.updatePosting(userId,job)
        .then(function (response) {
         //   console.log(response);
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
    console.log("Main");
    console.log(userId);
    postingModel.getPostingsForRecruiter(userId)
        .then(function (postings) {
            console.log(postings);
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

    var jobTitle,company,location,country,skill;

    jobTitle = req.query.jobTitle.toLowerCase();
    company = req.query.company.toLowerCase();
    location = req.query.location.toLowerCase();
    country = req.query.country.toLowerCase();
    skill = req.query.skill.toLowerCase();

    console.log(jobTitle);

    postingModel.getallPostings()
        .then(function (allPostingsResponse) {
           var allPostings = allPostingsResponse;
            var output = [];

           // console.log("HELLO".toLowerCase().includes("ell"));

            for(p in allPostings){
                if((jobTitle.includes(allPostings[p].jobTitle.toLowerCase()) ||  allPostings[p].jobTitle.toLowerCase().includes(jobTitle))
                    || (company.includes(allPostings[p].company.toLowerCase()) ||  allPostings[p].company.toLowerCase().includes(company)))
                {
                  //  console.log(allPostings[p])
                //    console.log("here")
                    output.push(allPostings[p]);
                }
            }
            //console.log("ap");
            //console.log(allPostings)
            for(p in allPostings){
              //  console.log("in loop 2")
               /* if((skill.includes(allPostings[p].skill.toLowerCase()) ||  allPostings[p].skill.toLowerCase().includes(skill))
                    || (country.includes(allPostings[p].country.toLowerCase()) ||  allPostings[p].country.toLowerCase().includes(country)))
                {
                    output.push(allPostings[p]);
                }*/
            }
            //console.log("out of 2");
            //console.log("Before sending output")
            console.log(output);

            res.send(output);

        })
}

function applyForJob(req,res) {
    var postingId = req.params.postingId;
    var userId = req.params.userId;

    console.log(postingId);
    console.log(userId);

    postingModel.addApplicant(postingId,userId)
        .then(function (response) {
            console.log(response);
            console.log("returned from model");
            res.sendStatus(200);
        })


}

function getPostingById(req, res) {
    var postingId = req.params.postingId;

    console.log("p id is "+postingId)

    postingModel.getPostingById(postingId)
        .then(function (response) {
            res.send(response);
        })
}

function jobDecision(req, res) {
    var userId = req.params.userId;
    var postingId = req.params.postingId;

    var decision = req.query.decision;




    console.log("userId");
    console.log(userId);


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
            //console.log(postings)
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

                        var status = applicants[a].status;
                        post.status = status;
                        console.log(post);
                        result.push(post);
                        break; //questionable
                    }
                }

            }
            console.log("result is")
            //console.log(result[0]);
            res.send(result);
        })

}