/**
 * Created by Akshay on 7/28/2017.
 */

var app = require("../../express");


//console.log(app);

app.get("/website/:websiteId/page",findAllPagesForWebsite);
app.get("/page/:pageId",findPageById);
app.put("/page/:pageId",updatePage);
app.delete("/page/:pageId",deletePage);
app.post("/website/:websiteId/page",addPage);
var pages =
    [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" },
        { "_id": "1", "name": "Post 4", "websiteId": "123", "description": "Lorem" },
        { "_id": "2", "name": "Post 5", "websiteId": "123", "description": "Lorem" },
        { "_id": "3", "name": "Post 6", "websiteId": "123", "description": "Lorem" },
        { "_id": "4", "name": "Post 7", "websiteId": "234", "description": "Lorem" },
        { "_id": "5", "name": "Post 8", "websiteId": "234", "description": "Lorem" },
        { "_id": "6", "name": "Post 9", "websiteId": "234", "description": "Lorem" },
    ];

function findAllPagesForWebsite(req,res) {
    var websiteId = req.params.websiteId;
    var result=[];
    for (p in pages)
    {
        if(pages[p].websiteId == websiteId)
        {
            result.push(pages[p]);
        }
    }
    res.json(result);
}

function findPageById(req,res) {
        var pageId = req.params.pageId;
        var result;
        for (p in pages)
        {
            if(pages[p]._id == pageId)
            {

                result =pages[p];
            }
        }
        res.json(result);

}

function updatePage(req,res) {
    var pageId = req.params.pageId;
    var page = req.body;
    for(p in pages) {

         if(pages[p]._id == pageId) {

             pages[p].name = page.name;
             pages[p].description = page.description;
     }
     }
     res.sendStatus(200);
}

function deletePage(req, res) {
 var pageId = req.params.pageId;
    pages.forEach(function (value , index)
    {
        if(value._id == pageId){
            pages.splice(index,1);
        }
    });
    res.sendStatus(200);
}

function addPage(req, res) {
    var page = req.body;
    var websiteId = req.params.websiteId;

    page._id = (new Date()).getTime()+"";
    page.websiteId=websiteId;

    pages.push(page);

    res.sendStatus(200);
}