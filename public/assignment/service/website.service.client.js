/**
 * Created by Akshay on 7/23/2017.
 */
(function () {
       angular.module("WebApp")
           .service("websiteService", websiteService);

       function websiteService() {
            this.findAllWebsitesForUser = findAllWebsitesForUser;
            this.findWebsiteById = findWebsiteById;
            this.deleteWebsite = deleteWebsite;
            this.addWebsite = addWebsite;
            this.updateWebsite = updateWebsite;

           var websitesList = [
               { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
               { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
               { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
               { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
               { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
               { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
               { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
           ];

           function findAllWebsitesForUser(userId) {
               var results=[];

               for(v in websitesList)
               {
                   if(websitesList[v].developerId === userId)
                   {

                       results.push(websitesList[v]);
                   }
               }
               //  console.log(results);
               return results;
           }

           function findWebsiteById(id) {
               var  result = {};
               for(v in websitesList)
               {
                   if(websitesList[v]._id === id)
                   {
                      // result = websitesList[v];
                       result._id = websitesList[v]._id;
                       result.name = websitesList[v].name;
                       result.developerId = websitesList[v].developerId;
                       result.description = websitesList[v].description;
                   }
               }
               return result;
           }

           function deleteWebsite(websiteId) {
              // var myWebsite = findWebsiteById(websiteId);
               //var index = websitesList.indexOf(myWebsite);
               //websitesList.splice(index,1);
             /*  for(w in websitesList)
               {
                   if(websitesList[w]._id == websiteId){
                       var index = websitesList.indexOf(websitesList[w]);
                       websitesList.splice(index,1);
                   }
               }
            */
             websitesList.forEach(function (value , index)
             {
                 if(value._id == websiteId){
                     websitesList.splice(index,1);
                 }
             })
               return;
           }

           function addWebsite(website, devid) {
               website._id = (new Date()).getTime() +"";
               website.developerId= devid;
               websitesList.push(website);
               return;
           }

           function updateWebsite(websiteId, name, description){
                   for(v in websitesList)
                   {
                       if(websitesList[v]._id == websiteId)
                       {
                           websitesList[v].name = name;
                           websitesList[v].description = description;
                       }
                   }
                   return;
           }

       }
    }
)();