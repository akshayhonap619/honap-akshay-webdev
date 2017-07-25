/**
 * Created by Akshay on 7/23/2017.
 */
(
    function () {

        angular.module("WebApp")
            .controller("editWebsiteController",editWebsiteController);
        
        function editWebsiteController($routeParams, websiteService, $location) {
            
            var model = this;

            model.websiteId = $routeParams.websiteId;
            model.userId = $routeParams.userId;
            
             model.deleteevent = deleteevent;
             model.updateevent = updateevent;



            init();
            
            function init() {
               model.website =  websiteService.findWebsiteById(model.websiteId);
               model.allWebsites= websiteService.findAllWebsitesForUser(model.userId);
               //console.log(model.allWebsites);
               //console.log(model);
            }
            
            function deleteevent() {
                websiteService.deleteWebsite(model.websiteId);
                $location.url("/user/"+model.userId+"/website");
            }

            function updateevent() {
                websiteService.updateWebsite(model.websiteId,model.website.name, model.website.description);
                $location.url("/user/"+model.userId+"/website");
                console.log(model.website);
                console.log("done");
            }
            
        }

    })();