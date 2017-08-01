/**
 * Created by Akshay on 7/28/2017.
 */


var app = require("../../express");

var websiteModel = require('../model/website/website.model.server')

app.get("/api/user/:userId/website", findAllWebsitesForUser);
app.get("/api/website/:websiteId",findWebsiteById);
app.post("/api/user/:userId/website",addWebsite );
app.delete("/api/website/:websiteId",deleteWebsite);
app.put("/api/website/:websiteId",updateWebsite);

var websitesList = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;

       /* var results=[];

         for(v in websitesList)
        {
         if(websitesList[v].developerId === userId)
        {
            results.push(websitesList[v]);
        }
        }
        res.json(results);*/
       websiteModel.findAllWebsitesForUser(userId)
           .then(function (websites) {
               res.json(websites);
           })


}

function findWebsiteById(req,res) {
    var websiteId = req.params.websiteId;

    websiteModel.findWebsiteById(websiteId)
        .then(function (website) {
            res.json(website);
        })


}

function addWebsite(req, res) {
    var devid = req.params.userId;
    var website = req.body;
    /*console.log(website);
    website._id = (new Date()).getTime() +"";
    website.developerId= devid;
    websitesList.push(website);*/

    websiteModel.createWebsite(website,devid)
        .then(function (website) {
            res.sendStatus(200);
        })


}

function deleteWebsite(req,res) {
    var websiteId = req.params.websiteId;
     var userId = req.params.userId;
    // .then(function (response) {
    //     console.log(response);
    //     res.send(200);
    // });
    websiteModel.deleteWebsite(websiteId, function(response){
        res.send(200);
    });

}

function updateWebsite(req,res){
    var websiteId = req.params.websiteId;
    var website = req.body;
    /*for(v in websitesList)
    {
        if(websitesList[v]._id == websiteId)
        {
            websitesList[v].name = website.name;
            websitesList[v].description = website.description;
        }
    }*/
    websiteModel.updateWebsite(websiteId,website)
        .then(function (website) {
            res.send(200);
        })


}

