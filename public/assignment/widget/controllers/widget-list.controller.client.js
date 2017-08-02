/**
 * Created by Akshay on 7/24/2017.
 */
(function(){
    angular.module("WebApp")
        .controller("widgetListController", widgetListController);
    
    
    function widgetListController($location, widgetService, $routeParams, $sce) {
        var model = this;

        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.userId = $routeParams.userId;
        model.trustHtml = trustHtml;
        model.getYouTubeUrl = getYouTubeUrl;

        init();

        function init() {
             widgetService.findWidgetsByPageId(model.pageId)
                .then(function (response) {
                    model.widgets = response;
                });
        }

        function trustHtml(text) {
           // console.log($sce.trustAsHtml(text));
             return $sce.trustAsHtml(text);
        }
        
        function getYouTubeUrl(url) {
            var embedd = "https://www.youtube.com/embed/"
            var splitlink = url.split("/");
            embedd += splitlink[splitlink.length-1];
            return $sce.trustAsResourceUrl(embedd);
        }

    }
})();