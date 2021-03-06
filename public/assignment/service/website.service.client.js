/**
 * Created by Akshay on 7/23/2017.
 */
(function () {
       angular.module("WebApp")
           .service("websiteService", websiteService);

       function websiteService($http) {
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
               /*var results=[];

               for(v in websitesList)
               {
                   if(websitesList[v].developerId === userId)
                   {

                       results.push(websitesList[v]);
                   }
               }
               //  console.log(results);
               return results;*/

               var url = "/api/user/"+userId+"/website";
               return $http.get(url)
                   .then(function (response) {
                       return response.data;
                   })

           }

           function findWebsiteById(websiteId) {

               var url = "/api/website/"+websiteId;
               return $http.get(url)
                   .then(function (response) {

                       return response.data;
                   });

           }

           function deleteWebsite(websiteId) {

             /*websitesList.forEach(function (value , index)
             {
                 if(value._id == websiteId){
                     websitesList.splice(index,1);
                 }
             });
               return;*/
             var url = "/api/website/"+websiteId;
             return $http.delete(url)
                 .then(function (response) {
                     return response.data;
                 });
           }

           function addWebsite(website, userId) {

               /*
               website._id = (new Date()).getTime() +"";
               website.developerId= devid;
               websitesList.push(website);
               return;*/
               var url = "/api/user/"+userId+"/website";
               return $http.post(url,website)
                   .then(function (response) {
                       return response.data;
                   });
           }

           function updateWebsite(websiteId, website){
               var url = "/api/website/"+websiteId;

               return $http.put(url,website)
                   .then(function (response) {
                       return response.data;
                   });

               /*for(v in websitesList)
                   {
                       if(websitesList[v]._id == websiteId)
                       {
                           websitesList[v].name = name;
                           websitesList[v].description = description;
                       }
                   }
                   return;*/
           }

       }
    }
)();