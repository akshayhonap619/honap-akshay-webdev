(function () {

    angular.module("JobApp")
        .controller("searchPageController",searchPageController);

    function searchPageController($location, $sce, jobSearchService, $routeParams) {

        var model = this;
        model.searchJob = searchJob;
       // model.addJob = addJob;
      //  model.saveJob  = saveJob;

       // model.userId = check._id;
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
/**
 * Created by Akshay on 8/17/2017.
 */
