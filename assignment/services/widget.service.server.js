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

var widgetModel = require('../model/widget/widget.model.server');

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
    /*var results=[];
    for(w in widgets){
        if(widgets[w].pageId == pageId)
        {
            results.push(widgets[w]);
        }
    }*/

    widgetModel.findWidgetsByPageId(pageId)
        .then(function (widgets) {
            res.json(widgets);
        })


}

function findWidgetById(req,res) {
    var widgetId = req.params.widgetId;
    /*for(w in widgets){
        if(widgets[w]._id == widgetId)
        {
            widgets[w].size = widgets[w].size + "";
            widgets[w].width = widgets[w].width + "";
            res.json(widgets[w]);
        }
    }*/

    widgetModel.findWidgetById(widgetId)
        .then(function (widget) {
            res.json(widget);
        })

   // res.send(404);
}

function deleteWidget(req,res) {
    var widgetId = req.params.widgetId;
    /*var myWidget = {};
    for(w in widgets){
        if(widgets[w]._id==widgetId){
            myWidget = widgets[w];
        }
    }
    var index = widgets.indexOf(myWidget);
    widgets.splice(index,1);*/
    widgetModel.deleteWidget(widgetId, function (done) {
        res.send(200);
    })



}

function updateWidget(req, res) {
    var widgetId = req.params.widgetId;
    var newWidget = req.body;

    /*for (var w in widgets) {
        if (widgets[w]._id === widgetId) {

            widgets[w] = newWidget;
       //     res.sendStatus(200);
        }
    }*/

    widgetModel.updateWidget(widgetId,newWidget)
        .then(function (response) {
            res.send(200);
        });

    //res.sendStatus(200);
}

function createWidget(req, res) {
    var newWidget = req.body;
    var pageId = req.params.pageId;
    newWidget.page = pageId;
    /*widgets.push(newWidget);
    res.send(200);*/

    widgetModel.createWidget(newWidget, pageId)
        .then(function (response) {
            res.send(response);
        })

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

    //console.log(myFile);
    //var appp = require("../../public/uploads")
  /*  for(var w in widgets) {
        if (widgets[w]._id == widgetId) {
            widgets[w].url = "../../uploads/" + filename;
            widgets[w].width = width;
        //    console.log(widgets[w].url);
        }
    }*/

    var newWidget = {
        _id: widgetId,
        url: "../../uploads/" + filename,
        widgetType: "IMAGE",
        width: width
    };
    
    widgetModel.updateWidget(widgetId,newWidget)
        .then(function (success) {
            var callbackUrl = "/assignment/index.html#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/";

            res.redirect(callbackUrl);
        },function (err) {
            res.send(404);
        })
    

}


/*
function reorderWidgetPosition(req, res) {
    var pageId = req.params.pageId;
    var initial = parseInt(req.query.initial);
    var final = parseInt(req.query.final);
    var widgetsOfThisPage = [];
    var i=0;

    for(var w in widgets) {
        if(widgets[w].pageId === pageId){
            if (typeof widgets[w].order != 'undefined'){//widgets[w].hasOwnProperty('order') == true) {
               // widgets[w].order = i;
                i++;
                console.log("Equals   "+widgets[w].order);

            }
            widgetsOfThisPage.push((widgets[w]));

        }
    }
    //console.log(widgetsOfThisPage);

    for(w in widgetsOfThisPage){

        if (typeof widgetsOfThisPage[w].order === 'undefined'){//widgets[w].hasOwnProperty('order') == true) {
            widgetsOfThisPage[w].order=i;
            //i++;
            console.log("Assignment  "+widgetsOfThisPage[w].order);
            i++;
        }
    }





    //console.log(widgetsOfThisPage);

    if(widgetsOfThisPage === []) {

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
}*/

function reorderWidgetPosition(req, res) {
    var pageId = req.params.pageId;
    var initial = parseInt(req.query.initial);
    var final = parseInt(req.query.final);


    widgetModel.reorderWidget(pageId,initial,final)
        .then(function (response) {
            res.send(200);
        })

}