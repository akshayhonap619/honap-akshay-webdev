/**
 * Created by Akshay on 7/23/2017.
 */
(function () {

    angular.module("WebApp")
        .controller("newWebsiteController",newWebsiteController);

    function newWebsiteController($routeParams, websiteService, $location) {

        var model = this;
        model.userId = $routeParams.userId;

        model.addevent = addevent;

        init();

        function init() {
            model.allWebsites= websiteService.findAllWebsitesForUser(model.userId);
        }

        function addevent(website) {
            websiteService.addWebsite(website, model.userId);

            $location.url("/user/"+model.userId+"/website");
        }

    }

})();