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
                model.widget = widgetService.findWidgetById(model.widgetId);
            }

            function deleteevent() {
                widgetService.deleteWidget(model.widgetId);
                $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget')
            }

            function updateevent(){

                widgetService.updateWidget(model.widgetId,model.widget);
                $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget");
            }

        }
})();