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
                 websiteService.findWebsiteById(model.websiteId)
                     .then(function (response) {
                         model.website = response;
                     });

               websiteService.findAllWebsitesForUser(model.userId)
                   .then(function (response) {
                       model.allWebsites= response;
                   })

            }
            
            function deleteevent() {
                websiteService.deleteWebsite(model.websiteId)
                    .then(function (response) {
                        $location.url("/user/"+model.userId+"/website");
                    })

            }

            function updateevent() {
                websiteService.updateWebsite(model.websiteId,model.website)
                    .then(function (response) {
                        $location.url("/user/"+model.userId+"/website");
                    });


                //console.log(model.website);
                //console.log("done");
            }
            
        }

    })();