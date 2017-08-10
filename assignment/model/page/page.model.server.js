/**
 * Created by Akshay on 8/8/2017.
 */
var mongoose = require('mongoose');

var websiteModel = require('../website/website.model.server')

var pageSchema = require('./page.schema.server');

var pageModel = mongoose.model("pageModel",pageSchema);


pageModel.findPageById = findPageById;
pageModel.findAllPagesForWebsite =findAllPagesForWebsite;
pageModel.updatePage = updatePage;
pageModel.addPage = addPage;
pageModel.deletePage = deletePage;
pageModel.addWidget = addWidget;
pageModel.removeWidget = removeWidget;
module.exports = pageModel;

function findPageById(pageId) {
       return pageModel.findById(pageId);
}

function findAllPagesForWebsite(websiteId) {
    return pageModel.find({website : websiteId})
}

function updatePage(pageId,page) {
    return pageModel.update({_id : pageId},
        {$set : {
          name :  page.name,
            description : page.description
        }}
    )
}


function addPage(page , websiteId) {
    page.website = websiteId
    var newpage = null;

    return pageModel.create(page)
            .then(function(pagedoc){

                newpage = pagedoc
                websiteModel.addPage(websiteId,pagedoc._id)
                    .then(function (response) {
                        return newpage;
                    })
            })
}

function deletePage(pageId, done) {
    var websiteId=null;
    return pageModel.findById(pageId)
         .then(function (page) {
             console.log("returned page is "+page);
             websiteId = page.website;
                console.log("website Id of page to be removed "+websiteId);
           return  pageModel.remove({_id : pageId})
                 .then(function (page) {
                     console.log("page Deleted");
                    return websiteModel.removePage(websiteId,pageId)
                        .then(function (response) {
                            console.log("response is "+response)
                            done(response);
                        })
                 })
         })
}

function deleteWebsite(websiteId, done) {
    var userId = null;
    return websiteModel.findById(websiteId)
        .then(function (website) {
            userId = website.developerId;
            return websiteModel.remove({_id : websiteId})
                .then(function (response) {
                    return userModel.removeWebsite(userId,websiteId)
                        .then(function (response) {
                            done(response);
                        });
                })
        })
}

function addWidget(pageId, widgetId) {
    console.log("pmodel "+widgetId);
    return pageModel.findById(pageId)
        .then(function (page) {
            page.widgets.push(widgetId);
            return page.save();
        })
}

function removeWidget(pageId, widgetId) {
        //console.log("pageId is ds"+ pageId)
    return pageModel.findById(pageId)
        .then(function (page) {
          //  console.log("Page is ")
          //  console.log(page);
            var index = page.widgets.indexOf(widgetId);
            page.widgets.splice(index, 1);
           // console.log("pageModel here");
            return page.save();
        },function (errr) {
            console.log(errr)
        })
}