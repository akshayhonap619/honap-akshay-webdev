/**
 * Created by Akshay on 8/13/2017.
 */

(function () {
    angular.module("JobApp")
        .controller("studentWelcomeController", studentWelcomeController)

    function studentWelcomeController($location, userService, $routeParams, jobSearchService,check) {
        var model = this;
         model.userId = check._id;     //$routeParams.userId;
        
        //model.searchJob = searchJob;



        model.getApplicationsForStudent = getApplicationsForStudent;

         console.log(model.userId);

        init();

        function init() {
            userService.getUserById(model.userId)
                .then(function (response) {
                    model.user = response;
                })
        }
        function getApplicationsForStudent() {
            console.log("init")
            jobSearchService.getApplicationsForStudent(model.userId)
                .then(function (response) {
                    model.applications = response;
                })
        }

    }
})();