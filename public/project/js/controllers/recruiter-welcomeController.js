/**
 * Created by Akshay on 8/13/2017.
 */
(function () {
    angular.module("JobApp")
        .controller("recruiterWelcomeController", recruiterWelcomeController)

    function recruiterWelcomeController($location, userService, $routeParams,  jobSearchService, check) {
        var model = this;
        model.userId = check._id;  //$routeParams.userId;

        model.getPosting = getPosting;
        model.deletePosting = deletePosting;

        init();

        function init() {
            userService.getUserById(model.userId)
                .then(function (response) {
                    model.user = response;
                })
        }

        function getPosting() {
            jobSearchService.getPostingsForRecruiter(model.userId)
                .then(function (response) {
                    model.postings = response;
                    console.log("Final");

                })

        }
        
        function deletePosting(postingId) {
            console.log(postingId)
            jobSearchService.deletePosting(postingId)
                .then(function (response) {
                    //model.errorMessage = "Posting Successfully deleted";
                })
            
        }

    }
})();