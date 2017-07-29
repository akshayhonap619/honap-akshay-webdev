/**
 * Created by Akshay on 7/23/2017.
 */
(function () {
    angular.module("WebApp")
        .controller("websiteListController", websiteListController);
    
    function websiteListController($routeParams, websiteService) {
        var model = this;
        model.userId = $routeParams.userId;

        init();

        function init() {
                  websiteService.findAllWebsitesForUser(model.userId)
                      .then(function (response) {
                          model.websites = response;
                      })
        }
            

    }
    
})();