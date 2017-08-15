/**
 * Created by Akshay on 8/4/2017.
 */

(function () {

    angular.module("JobApp")
        .controller("searchController",searchController);

    function searchController($location, $sce, jobSearchService, $routeParams) {

        var model = this;
        model.searchJob = searchJob;
        model.addJob = addJob;
        model.saveJob  = saveJob;

        model.userId = $routeParams.userId;

        function searchJob(text,country,skill) {

            if(typeof text =='undefined'){
                model.errorMessage = "Search Query cannaot be null";
                return;
            }
            var url = "http://service.dice.com/api/rest/jobsearch/v1/simple.json?text="+text;

            if(typeof country != 'undefined'){
                url=url+"&country="+country
            }

            if(typeof skill != 'undefined'){
                url=url+"&skill="+skill
            }

            console.log(url);
            jobSearchService.searchJobs(url)
                .then(function (response) {
                    //console.log(response);
                    console.log("here");
                    model.results = response;
                    return;
                })

        }

        function addJob(result) {
            jobSearchService.addJob(result)
                .then(function (response) {
                    console.log("DOne");
                },function (error) {
                    console.log(error);
                })
        }

        function saveJob(result) {
            jobSearchService.savePosting(result);
            $location.url('/recruiter/'+model.userId+'/posting/new')

        }

    }

})();







/*

function searchJob(text) {
    var url2 = "http://service.dice.com/api/rest/jobsearch/v1/simple.json?text="+text;

    var url =   "https://authenticjobs.com/api/?api_key=e83067aa5a22e95e99214b5f44ba9372&method=aj.jobs.search&keywords="+text+"&format=json&callback=JSON_CALLBACK";
    //  var url =   "https://authenticjobs.com/api/?api_key=e83067aa5a22e95e99214b5f44ba9372&method=aj.jobs.getcompanies&format=json&callback=JSON_CALLBACK";

    console.log(url);

    $http.jsonp(url)
        .then(function (response) {
            //console.log(response.data);

            // model.results = response.data.resultItemList;
            model.results = response.data.listings.listing;
            //model.results = response.data.companies.company;
            searchDiceJobs(url2);
            //console.log(model.results);
            //return response.data.listings.listing;

        },function (error) {
            console.log(error);
        });

    function searchDiceJobs(url) {
        $http.get(url)
            .then(function (response) {
                model.results = model.results.concat(response.data.resultItemList);
                return;
            })
    }


}*/
