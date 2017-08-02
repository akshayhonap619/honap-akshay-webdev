/**
 * Created by Akshay on 7/25/2017.
 */
(function () {
    angular.module("WebApp")
        .controller("widgetEditController", widgetEditController);
    
        function widgetEditController($location, widgetService, $routeParams, $sce) {
            var model = this;

            model.websiteId = $routeParams.websiteId;
            model.pageId = $routeParams.pageId;
            model.userId = $routeParams.userId;
            model.widgetId = $routeParams.widgetId;
            model.deleteevent = deleteevent;
            model.updateevent = updateevent;

            init();
            
            function init() {
                 widgetService.findWidgetById(model.widgetId)
                    .then(function (response) {
                        model.widget = response;
                    });
            }

            function deleteevent() {
                widgetService.deleteWidget(model.widgetId)
                    .then(function (response) {
                        $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                    });

            }

            function updateevent(){

                widgetService.updateWidget(model.widget,model.widgetId)
                    .then(function (response) {
                        $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget");
                    })



            }

        }
})();