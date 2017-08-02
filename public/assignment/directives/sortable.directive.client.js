/**
 * Created by Akshay on 8/2/2017.
 */
(function () {
    angular.module("MyModule",[])
        .directive("wbdvSortable", sortWidget);

    function sortWidget(widgetService) {
        console.log("Here");
        return{
            link : linkFunction
        }

        function linkFunction(scope,element) {
            $(element).sortable({
                    axis:"y",
                    start : function (event,ui) {
                        initial = (ui.item).index();
                        //console.log(initial);
                    },
                stop : function (event,ui) {
                    final = (ui.item).index();
                    //console.log("finalpos"+final);
                    var pageId = scope.model.pageId;
                    widgetService.reorderWidgetPosition(initial,final,pageId);
                }})
        }


    }


})();