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
                model.page = pageService.findPageById(model.pageId);
                model.pages = pageService.findPageByWebsiteId(model.websiteId);
            }

            function  deleteevent() {
                pageService.deletePage(model.pageId);
                $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page");
            }


            function updateevent() {
                pageService.updatePage(model.pageId, model.page.name, model.page.description);
                $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page");

            }

    }

    })();