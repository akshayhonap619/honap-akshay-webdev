/**
 * Created by Akshay on 7/23/2017.
 */
(function () {
    angular.module("WebApp")
        .controller("pageListController", pageListController);
    
        function pageListController($routeParams, pageService) {
            var model = this;
            model.websiteId = $routeParams.websiteId;
            model.userId = $routeParams.userId;

            init();

            function init()
            {
                model.pages = pageService.findPageByWebsiteId(model.websiteId);
            }
        }
    
    
})();