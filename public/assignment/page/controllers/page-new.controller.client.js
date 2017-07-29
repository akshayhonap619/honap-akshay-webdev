/**
 * Created by Akshay on 7/23/2017.
 */
(function () {

        angular.module("WebApp")
            .controller("newPageController",newPageController);

        function newPageController($routeParams, pageService, $location) {

            var model = this;
            model.websiteId = $routeParams.websiteId;
            model.addevent = addevent;
            model.userId = $routeParams.userId;
            init();

            function init() {
                 pageService.findPageByWebsiteId(model.websiteId)
                     .then(function (response) {
                         model.pages = response;
                     });
            }

            function addevent(page) {
                pageService.addPage(page, model.websiteId)
                    .then(function (response) {
                        $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page");
                    });

            }

        }

    }
)();