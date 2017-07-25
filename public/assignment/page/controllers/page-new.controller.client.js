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
                model.pages = pageService.findPageByWebsiteId(model.websiteId);
            }

            function addevent(page) {
                pageService.addPage(page, model.websiteId);
                $location.url("/user/"+model.userIdId+"/website/"+model.websiteId+"/page");
            }

        }

    }
)();