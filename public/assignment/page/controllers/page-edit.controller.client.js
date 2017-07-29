/**
 * Created by Akshay on 7/23/2017.
 */
(function () {

    angular.module("WebApp")
        .controller("editPageController",editPageController);

    function editPageController($routeParams, pageService, $location) {
            var model = this;
            model.userId = $routeParams.userId;
            model.websiteId = $routeParams.websiteId;
            model.pageId = $routeParams.pageId;
            model.updateevent = updateevent;
            model.deleteevent = deleteevent;

            init();

            function init() {
                 pageService.findPageById(model.pageId)
                     .then(function (response) {
                         model.page = response;
                     });

                pageService.findPageByWebsiteId(model.websiteId)
                     .then(function (response) {
                         model.pages = response;
                     });
            }

            function  deleteevent() {
                pageService.deletePage(model.pageId)
                    .then(function (response) {
                        $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page");
                    });

            }


            function updateevent() {
                pageService.updatePage(model.pageId, model.page)
                    .then(function (response) {
                        $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page");
                    });


            }

    }

    })();