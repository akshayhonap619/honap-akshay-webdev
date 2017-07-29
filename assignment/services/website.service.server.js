/**
 * Created by Akshay on 7/28/2017.
 */


var app = require("../../express");

app.get("/user/:userId/website", findAllWebsitesForUser);
app.get("/website/:websiteId",findWebsiteById);
app.post("/user/:userId/website",addWebsite );
app.delete("/website/:websiteId",deleteWebsite);
app.put("/website/:websiteId",updateWebsite);

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

        var results=[];

         for(v in websitesList)
        {
         if(websitesList[v].developerId === userId)
        {
            results.push(websitesList[v]);
        }
        }
        res.json(results);

}

function findWebsiteById(req,res) {
    var websiteId = req.params.websiteId;
    var result = {};
    for(v in websitesList)
    {
        if(websitesList[v]._id === websiteId)
        {
             result = websitesList[v];

        }
    }
    res.json(result);
}

function addWebsite(req, res) {
    var devid = req.params.userId;
    var website = req.body;
    console.log(website);
    website._id = (new Date()).getTime() +"";
    website.developerId= devid;
    websitesList.push(website);
    res.sendStatus(200);
}

function deleteWebsite(req,res) {
    var websiteId = req.params.websiteId;
    websitesList.forEach(function (value , index)
    {
        if(value._id == websiteId){
            websitesList.splice(index,1);
        }
    });
    res.sendStatus(200);
}

function updateWebsite(req,res){
    var websiteId = req.params.websiteId;
    var website = req.body;
    for(v in websitesList)
    {
        if(websitesList[v]._id == websiteId)
        {
            websitesList[v].name = website.name;
            websitesList[v].description = website.description;
        }
    }
    res.send(200);
}