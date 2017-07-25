/**
 * Created by Akshay on 7/24/2017.
 */
(function () {
    angular.module("WebApp")
        .service("widgetService", widgetService);


    function widgetService() {
        this.findWidgetsByPageId = findWidgetsByPageId;
        this.findWidgetById = findWidgetById;
        this.deleteWidget = deleteWidget;
        this.updateWidget = updateWidget;
        this.createWidget = createWidget;
        this.newHeadingCreate = newHeadingCreate;
        this.newImageCreate = newImageCreate;
        this.newYoutubeCreate = newYoutubeCreate;

        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p> If you smell what the rock is cooking</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        function findWidgetsByPageId(pageId) {
            var results=[];
            for(w in widgets){
                if(widgets[w].pageId == pageId)
                {
                    results.push(widgets[w]);
                }
            }
                return results;
        }

        function findWidgetById(widgetId) {
            for(w in widgets){
                if(widgets[w]._id == widgetId)
                {
                    widgets[w].size = widgets[w].size + "";
                    widgets[w].width = widgets[w].width + "";
                    return widgets[w];
                }
            }
            return null;
        }

        function deleteWidget(widgetId) {
                var myWidget = findWidgetById(widgetId);
                var index = widgets.indexOf(myWidget);
                widgets.splice(index,1);
                return;

        }

        function createWidget(widget) {
            widgets.push(widget);
            return;
        }

        function newHeadingCreate(pageId){
            var newHeader={"name":"", "widgetType": "HEADING", "pageId": pageId, "size": undefined, "text": ""};
            newHeader._id=(new Date()).getTime()+"";
            return newHeader;
        }

        function newImageCreate(pageId){
            var newImage={ "name":"",  "widgetType": "IMAGE", "pageId": pageId, "width": "","text": "",
                "url": ""};
            newImage._id=(new Date()).getTime()+"";
            return newImage;
        }

        function newYoutubeCreate(pageId){
            var newYouTube={ "name":"", "widgetType": "YOUTUBE", "pageId": pageId, "width": "",
                "url": "","text": "" };
            newYouTube._id=(new Date()).getTime()+"";
            return newYouTube;
        }

        function updateWidget(widgetId,widget) {

            if(widget.widgetType=="HEADING")
            {

                for(var u in widgets)
                {
                    if(widgets[u]._id==widgetId)
                    {

                        widgets[u].text=widget.text;
                        widgets[u].size=widget.size;
                        widgets[u].name=widget.name;
                    }
                }

            }
            else if (widget.widgetType =="IMAGE")
            {

                for(var u in widgets)
                {
                    if(widgets[u]._id==widgetId)
                    {

                        widgets[u].url=widget.url;
                        widgets[u].text=widget.text;
                        widgets[u].name=widget.name;
                       // widgets[u].width=widget.width;
                        //widgets[u].upload=widget.upload;

                    }
                }

            }
            else if (widget.widgetType=="YOUTUBE")
            {
                for(var u in widgets)
                {
                    if(widgets[u]._id==widgetId)
                    {

                        widgets[u].url=widget.url;
                        widgets[u].text=widget.text;
                        widgets[u].name=widget.name;
                        widgets[u].width=widget.width;

                    }
                }

            }
        }

    }
})();