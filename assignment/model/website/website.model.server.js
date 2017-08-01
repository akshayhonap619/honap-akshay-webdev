/**
 * Created by Akshay on 8/8/2017.
 */
var mongoose = require('mongoose');

var websiteSchema = require('./website.schema.server');

var websiteModel = mongoose.model("websiteModel",websiteSchema );
var userModel = require('../user/user.model.server')

websiteModel.createWebsite = createWebsite;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.addPage = addPage;
websiteModel.removePage = removePage;

module.exports = websiteModel;



function createWebsite(website, developerid) {
        website.developerId = developerid;
        var websitedoc = null;
        return websiteModel.create(website)
            .then(function (website) {
                    websitedoc = website;
                    return userModel.addWebsite(developerid,website._id)
                        .then(function (userdoc) {
                            return websitedoc;
                        })
            })
}

function findAllWebsitesForUser(userId) {
        return websiteModel.find({developerId : userId});
}

function findWebsiteById(websiteId) {
    return websiteModel.findOne({_id : websiteId})
}

function updateWebsite(websiteId, website) {
    return websiteModel.update({_id : websiteId},
        {$set : {
            name : website.name,
            description : website.description
        }
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

function addPage(websiteId, pageId) {
    return websiteModel.findById(websiteId)
        .then(function (website) {
            console.log("website model "+website)
            website.pages.push(pageId);
            return website.save();
        })
}

function removePage(websiteId, pageId) {

    return websiteModel.findById(websiteId)
        .then(function (website) {

            var index = website.pages.indexOf(pageId);
            website.pages.splice(index, 1);
            console.log("websiteModel here");
            return website.save();
        },function (errr) {
            console.log(errr)
        })
}