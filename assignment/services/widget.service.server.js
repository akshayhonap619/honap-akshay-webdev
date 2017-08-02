/**
 * Created by Akshay on 8/1/2017.
 */
var app = require("../../express");

var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/uploads' });

app.post ("/api/upload", upload.single('myFile'), uploadImage);


app.post("/api/page/:pageId/widget", createWidget);
app.get("/api/page/:pageId/widget",findWidgetsByPageId);
app.get("/api/widget/:widgetId",findWidgetById);
app.put("/api/widget/:widgetId",updateWidget);
app.delete("/api/widget/:widgetId",deleteWidget);
app.put('/page/:pageId/widget', reorderWidgetPosition);


var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p> If you smell what the rock is cooking</p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];


function findWidgetsByPageId(req,res) {
    var pageId = req.params.pageId;
    var results=[];
    for(w in widgets){
        if(widgets[w].pageId == pageId)
        {
            results.push(widgets[w]);
        }
    }
    res.json(results);
}

function findWidgetById(req,res) {
    var widgetId = req.params.widgetId;
    for(w in widgets){
        if(widgets[w]._id == widgetId)
        {
            widgets[w].size = widgets[w].size + "";
            widgets[w].width = widgets[w].width + "";
            res.json(widgets[w]);
        }
    }
   // res.send(404);
}

function deleteWidget(req,res) {
    var widgetId = req.params.widgetId;
    var myWidget = {};
    for(w in widgets){
        if(widgets[w]._id==widgetId){
            myWidget = widgets[w];
        }
    }
    var index = widgets.indexOf(myWidget);
    widgets.splice(index,1);
    res.send(200);

}

function updateWidget(req, res) {
    var widgetId = req.params.widgetId;
    var newWidget = req.body;

    for (var w in widgets) {
        if (widgets[w]._id === widgetId) {

            widgets[w] = newWidget;
       //     res.sendStatus(200);
        }
    }
    res.sendStatus(200);
}

function createWidget(req, res) {
    var newWidget = req.body;
    var pageId = req.params.pageId;
//console.log(newWidget);
    //newWidget.pageId = pageId;
    widgets.push(newWidget);
    res.send(200);
}



function uploadImage(req, res) {
    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename;     // new file name in upload folder
    var path = myFile.path;         // full path of uploaded file
    var destination = myFile.destination;  // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;

    console.log(myFile);
    //var appp = require("../../public/uploads")
    for(var w in widgets) {
        if (widgets[w]._id == widgetId) {
            widgets[w].url = "../../uploads/" + filename;
            widgets[w].width = width;
            console.log(widgets[w].url);
        }
    }

    //widget = getWidgetById(widgetId);
    //widget.url = '/assignment/uploads/' + filename;

    var callbackUrl = "/assignment/index.html#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/";

    res.redirect(callbackUrl);
}


function reorderWidgetPosition(req, res) {
    var pageId = req.params.pageId;
    var initial = parseInt(req.query.initial);
    var final = parseInt(req.query.final);
    var widgetsOfThisPage = [];
    var i=0;

    for(var w in widgets) {
        if(widgets[w].pageId === pageId){
            if(widgets[w].hasOwnProperty('order') === false) {
                widgets[w].order = i;
                i++;
            }
            widgetsOfThisPage.push((widgets[w]));

        }
    }
    //console.log(widgetsOfThisPage);

    if(widgetsOfThisPage === []) {
        res.sendStatus(404);
    } else {
        for(var w in widgetsOfThisPage) {
            if(initial < final) {
                if (widgetsOfThisPage[w].order === initial) {
                    widgetsOfThisPage[w].order = final;
                }
                else if (widgetsOfThisPage[w].order > initial && widgetsOfThisPage[w].order <= final) {
                    widgetsOfThisPage[w].order--;
                }
            }
            else {
                if (widgetsOfThisPage[w].order === initial) {
                    widgetsOfThisPage[w].order = final;
                }
                else if (widgetsOfThisPage[w].order < initial && widgetsOfThisPage[w].order >= final) {
                    widgetsOfThisPage[w].order++;
                }
            }
        }
        res.json(widgetsOfThisPage);
    }
}