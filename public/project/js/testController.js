/**
 * Created by Akshay on 8/4/2017.
 */

(function () {

    angular.module("JobApp", [])
        .controller("searchController",searchController);

    function searchController($http ,$location, $sce) {

        var model = this;

        model.searchJob = searchJob;


        function searchJob(text) {
          //  var url = "http://service.dice.com/api/rest/jobsearch/v1/simple.json?text="+text;

          var url =   "https://authenticjobs.com/api/?api_key=e83067aa5a22e95e99214b5f44ba9372&method=aj.jobs.search&format=json";
          //url = url.substring(0,url.length-2);
            console.log(url);
            $sce.trustAsResourceUrl(url);
            $http.jsonp(url)
               .then(function (response) {
                   console.log(response);

                   // model.results = response.data.resultItemList;
                   //return response.data.resultItemList;
                   console.log(model.results);
                },function (error) {
                   console.log(error);
               });



        }
        




    }

})();