/**
 * Created by Akshay on 7/23/2017.
 */
(function(){

    angular.module("WebApp")
        .service("pageService",pageService);


    function pageService() {

        this.findPageByWebsiteId = findPageByWebsiteId;
        this.findPageById = findPageById;
        this.addPage = addPage;
        this.updatePage = updatePage;
        this.deletePage = deletePage;

        var pages =
            [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" },
                { "_id": "1", "name": "Post 4", "websiteId": "123", "description": "Lorem" },
                { "_id": "2", "name": "Post 5", "websiteId": "123", "description": "Lorem" },
                { "_id": "3", "name": "Post 6", "websiteId": "123", "description": "Lorem" },
                { "_id": "4", "name": "Post 7", "websiteId": "234", "description": "Lorem" },
                { "_id": "5", "name": "Post 8", "websiteId": "234", "description": "Lorem" },
                { "_id": "6", "name": "Post 9", "websiteId": "234", "description": "Lorem" },
            ];

        function findPageByWebsiteId(websiteId)
        {
            var result=[];
            for (p in pages)
            {
                if(pages[p].websiteId == websiteId)
                {

                    result.push(pages[p]);
                }
            }
            return result;
        }

        function findPageById(pageId)
        {
            var result ={};
            for (p in pages)
            {
                if(pages[p]._id == pageId)
                {
                    result._id = pages[p]._id;
                    result.name = pages[p].name;
                    result.websiteId = pages[p].websiteId;
                    result.description = pages[p].description;
                    //return pages[p];
                }
            }
            return result;
        }

        function addPage(page, websiteId) {
            page._id = (new Date()).getTime()+"";
            page.websiteId=websiteId;

            pages.push(page);
        }

        function updatePage(pageId, name, description) {
            for(p in pages)
            {
                if(pages[p]._id == pageId)
                {
                    pages[p].name = name;
                    pages[p].description = description;
                }
            }
        }

        function deletePage(pageId) {
           // var page = findPageById(pageId);
           // var index = pages.indexOf(page);
           // pages.splice(index,1);
            //return;

            pages.forEach(function (value , index)
            {
                if(value._id == pageId){
                    pages.splice(index,1);
                }
            })
            return;
        }


    }

})();