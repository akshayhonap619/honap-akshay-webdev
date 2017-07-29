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
            websiteService.findAllWebsitesForUser(model.userId)
                .then(function (response) {
                    model.allWebsites=response;
                })
        }

        function addevent(website) {
            websiteService.addWebsite(website, model.userId)
                .then(function (response) {
                    $location.url("/user/"+model.userId+"/website");
                });
        }

    }

})();