/**
 * Created by Akshay on 7/25/2017.
 */
(function () {
    angular.module("WebApp")
        .controller("widgetNewController",widgetNewController);

        function widgetNewController($location, widgetService, $routeParams) {
            var  model = this;
            model.websiteId = $routeParams.websiteId;
            model.pageId = $routeParams.pageId;
            model.userId = $routeParams.userId;
            model.widgetId = $routeParams.widgetId;

            model.newHeading = newHeading;
            model.newImage = newImage;
            model.newYoutube = newYoutube;



            function newHeading() {

                var newHeader= widgetService.newHeadingCreate(model.pageId);

                widgetService.createWidget(newHeader);

                $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget/"+newHeader._id);

            }

            function newImage() {

                var newHeader= widgetService.newImageCreate(model.pageId);
                widgetService.createWidget(newHeader);
                $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget/"+newHeader._id);
            }

            function newYoutube() {

                var newHeader= widgetService.newYoutubeCreate(model.pageId);
                widgetService.createWidget(newHeader);
                $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget/"+newHeader._id);
            }
            
        }
})();