/**
 * Created by Akshay on 8/9/2017.
 */
var mongoose = require('mongoose');

var widgetSchema = require('./widget.schema.server');

var pageModel = require('../page/page.model.server');

var widgetModel = mongoose.model("widgetModel",widgetSchema);



widgetModel.findWidgetsByPageId = findWidgetsByPageId;
widgetModel.updateWidget = updateWidget;
widgetModel.findWidgetById = findWidgetById;
widgetModel.createWidget = createWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;
module.exports = widgetModel;




function findWidgetsByPageId(pageId) {
    return widgetModel.find({page : pageId})
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId)
}

function updateWidget(widgetId, newWidget) {
    if(newWidget.widgetType ==="HEADING") {
        //console.log(newWidget);
        return widgetModel
            .update({_id: newWidget._id},
                {
                    name: newWidget.name,
                    text: newWidget.text,
                    widgetType: newWidget.widgetType,
                    size: newWidget.size
                })
    }
    else if(newWidget.widgetType === "HTML") {
        return widgetModel
            .update({_id: newWidget._id},
                {
                    widgetType: newWidget.widgetType,
                    text: newWidget.text
                })
    }
    else if(newWidget.widgetType === "IMAGE") {
        //console.log(newWidget);
        return widgetModel
            .update({_id: newWidget._id},
                {
                    url : newWidget.url,
                    widgetType: newWidget.widgetType,
                    text : newWidget.text,
                    name: newWidget.name,
                    width : newWidget.width
                })
    }

    else if(newWidget.widgetType==="YOUTUBE") {
        return widgetModel
            .update({_id: newWidget._id},
                {
                    widgetType: newWidget.widgetType,
                    text : newWidget.text,
                    width : newWidget.width,
                    url : newWidget.url
                })
    }

    else if(newWidget.widgetType === "TEXT") {
        return widgetModel
            .update({_id:newWidget._id},
                {
                    widgetType: newWidget.widgetType,
                    text : newWidget.text,
                    rows : newWidget.rows,
                    placeholder : newWidget.placeholder,
                    formatted: newWidget.formatted
                })
    }
}

/*function createWidget(widget, pageId) {
    var newWidget = null;
    return widgetModel.create(widget)
            .then(function (widgetDoc) {
                console.log("wdoc "+widgetDoc);
                newWidget = widgetDoc;
                return pageModel.addWidget(pageId, widgetDoc._id)
                .then(function (pageDoc) {
                    return newWidget;
                })
        })
}*/

function createWidget(widget , pageId) {

    var newWidget = null;

    return widgetModel.create(widget)
         .then(function (widgetdoc) {
            newWidget = widgetdoc;
           return  pageModel.addWidget(pageId,widgetdoc._id)
                 .then(function (pagedoc) {
                     return newWidget;
                 })
         })

}

function deleteWidget(widgetId, done) {
    var pageId = null;
    return widgetModel.findById(widgetId)
        .then(function (widget) {
            pageId = widget.page;
            return widgetModel.remove({_id : widgetId})
                .then(function (response) {
                    return pageModel.removeWidget(pageId,widgetId)
                        .then(function (response) {
                            done(response);
                        });
                })
        })
}


function reorderWidget(pageId, start, end) {
    return widgetModel
        .find({page: pageId})
        .then(function (widgets) {
          //  console.log("widgets of this page")
          //  console.log(widgets);
          //  console.log("---------------------------------------")
            var initial = start;
            var final = end;
            var i=0;
            
            widgets.forEach(function (widgetsOfThisPage) {
                if (typeof widgetsOfThisPage.order != 'undefined'){//widgets[w].hasOwnProperty('order') == true) {
                   // console.log("---------- Widget has order--------");
                    i++;
                   // console.log("Equals   "+widgetsOfThisPage);
                   // console.log("************************");

                }
            })
            
            widgets.forEach(function (widgetsOfThisPage) {

                if (typeof widgetsOfThisPage.order == 'undefined'){//widgets[w].hasOwnProperty('order') == true) {
                 //   console.log("here in order")
                   // console.log(widgetsOfThisPage.order)
                    widgetsOfThisPage.order=i;
                    //i++;
                   // console.log("Assignment  "+widgetsOfThisPage.order);
                    i++;
                    return widgetsOfThisPage.save();
                }
            })
            
            widgets.forEach(function(widgetsOfThisPage){
                if(initial < final) {
                    if (widgetsOfThisPage.order === initial) {
                        widgetsOfThisPage.order = final;
                        return widgetsOfThisPage.save();
                    }
                    else if (widgetsOfThisPage.order > initial && widgetsOfThisPage.order <= final) {
                        widgetsOfThisPage.order--;
                        return widgetsOfThisPage.save();
                    }
                }
                else {
                    if (widgetsOfThisPage.order === initial) {
                        widgetsOfThisPage.order = final;
                        return widgetsOfThisPage.save();
                    }
                    else if (widgetsOfThisPage.order < initial && widgetsOfThisPage.order >= final) {
                        widgetsOfThisPage.order++;
                        return widgetsOfThisPage.save();
                    }
                }
            });
        })

}