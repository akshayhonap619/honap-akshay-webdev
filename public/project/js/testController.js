/**
 * Created by Akshay on 8/4/2017.
 */

(function () {

    angular.module("JobApp", [])
        .controller("searchController",searchController);

    function searchController($http ,$location) {

        var model = this;

        model.searchJob = searchJob;


        function searchJob(text) {
            var url = "http://service.dice.com/api/rest/jobsearch/v1/simple.json?text="+text;
            console.log(text);
            $http.get(url)
               .then(function (response) {
                   model.results = response.data.resultItemList;
                   //return response.data.resultItemList;
               });

           //console.log(model.results);

        }
        




    }

})();