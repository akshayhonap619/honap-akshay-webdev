/**
 * Created by Akshay on 8/9/2017.
 */
(function () {

    angular.module("WebApp")
        .controller("flickrController",flickrController)

    function flickrController(widgetService, flickrService, $location, $routeParams) {
        var model = this;

        var widgetId = $routeParams.widgetId;
        model.widgetId = widgetId;
        var userId = $routeParams.userId;
        model.userId = userId;
        var websiteId = $routeParams.websiteId;
        model.websiteId = websiteId;
        var pageId = $routeParams.pageId;
        model.pageId = pageId;

        model.searchPhoto = searchPhoto;
        model.selectPhoto = selectPhoto;


        function searchPhoto(searchText) {
            console.log(flickrService)
            console.log(searchText);
            flickrService.searchPhoto(searchText)
                .then(function(response) {
                    //console.log(response.data);
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });

        }



        function selectPhoto(photo) {

            //console.log(model.widgetId);
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            var newWidget={};

            newWidget._id = widgetId;

            newWidget.url = url;
            newWidget.widgetType = "IMAGE";
            newWidget.page = model.pageId;
            console.log(newWidget);
            widgetService
                .updateWidget(newWidget, widgetId)
                .then(function(widget){
                    $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" +widgetId);
                });
        }



    }

})();