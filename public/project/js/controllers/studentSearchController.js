/**
 * Created by Akshay on 8/14/2017.
 */
(function () {
    angular.module("JobApp")
        .controller("studentSearchController",studentSearchController)

    function studentSearchController($location) {
        var model= this;

        model.searchJob = searchJob;


        function searchJob(text,country,skill) {
            
        }


    }

})();