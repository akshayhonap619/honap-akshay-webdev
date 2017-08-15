/**
 * Created by Akshay on 8/13/2017.
 */

(function () {
    angular.module("JobApp")
        .controller("studentWelcomeController", studentWelcomeController)

    function studentWelcomeController($location, userService, $routeParams, jobSearchService) {
        var model = this;
         model.userId = $routeParams.userId;
        
        //model.searchJob = searchJob;
         console.log(model.userId);
        init();

        function init() {
            userService.getUserById(model.userId)
                .then(function (response) {
                    model.user = response;
                })
        }
        

    }
})();