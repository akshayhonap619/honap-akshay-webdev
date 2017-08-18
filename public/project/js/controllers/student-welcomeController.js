/**
 * Created by Akshay on 8/13/2017.
 */

(function () {
    angular.module("JobApp")
        .controller("studentWelcomeController", studentWelcomeController)

    function studentWelcomeController($location, userService, $routeParams, jobSearchService, check, $rootScope) {
        var model = this;
         model.userId = check._id;     //$routeParams.userId;

        //model.searchJob = searchJob;
            model.deleteUser = deleteUser;
        model.getApplicationsForStudent = getApplicationsForStudent;
        model.logoutUser = logoutUser;
        model.updateUser = updateUser;
         console.log(model.userId);

        init();

        function init() {
            userService.getUserById(model.userId)
                .then(function (response) {
                    model.user = response;
                })
        }

        function deleteUser() {
            userService.deleteUser(model.userId)
                .then(function (response) {
                    $location.url('/login')
                })
        }

        function logoutUser() {
            userService.logoutUser()
                .then(function (response) {
                    $location.url('#/login')
                })
        };

        function getApplicationsForStudent() {
            console.log("init")
            jobSearchService.getApplicationsForStudent(model.userId)
                .then(function (response) {
                    model.applications = response;
                })
        }

        function updateUser() {
            userService.updateUser(model.userId,model.user)
                .then(function (response) {
                    $location.url('#/student');
                })
        }

        $rootScope.$on("studentLogout", function(){
            logoutUser();
        });



    }
})();