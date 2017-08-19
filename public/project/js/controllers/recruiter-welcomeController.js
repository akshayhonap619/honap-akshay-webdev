/**
 * Created by Akshay on 8/13/2017.
 */
(function () {
    angular.module("JobApp")
        .controller("recruiterWelcomeController", recruiterWelcomeController)

    function recruiterWelcomeController($location, userService, $routeParams,  jobSearchService, check, $rootScope, $route) {
        var model = this;
        model.userId = check._id;  //$routeParams.userId;

        model.deleteUser = deleteUser;
        model.getPosting = getPosting;
        model.deletePosting = deletePosting;
        model.logoutUser = logoutUser;
        model.updateUser = updateUser;


        init();

        function init() {
            userService.getUserById(model.userId)
                .then(function (response) {
                    model.user = response;
                })
            getPosting();
        }

        function deleteUser() {
            //console.log(model.userId)
            userService.deleteUser(model.userId)
                .then(function (response) {
                    $location.url("/login");
                })
        }

        function getPosting() {
            jobSearchService.getPostingsForRecruiter(model.userId)
                .then(function (response) {
                    model.postings = response;
                    console.log("Final");

                })

        }

        function logoutUser() {
            userService.logoutUser()
                .then(function (response) {
                    $location.url('#/login')
                })
        }

        function updateUser() {
            userService.updateUser(model.userId,model.user)
                .then(function (response) {
                    $location.url('#/student');
                })
        }
        
        function deletePosting(postingId) {
            console.log(postingId)
            jobSearchService.deletePosting(postingId)
                .then(function (response) {
                    $route.reload();
                })
            
        }

        $rootScope.$on("recruiterlogout", function(){
            logoutUser();
        });


    }
})();