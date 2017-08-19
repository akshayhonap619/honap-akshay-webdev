/**
 * Created by Akshay on 8/19/2017.
 */
(function () {
    angular.module("JobApp")
        .controller("adminJobController",adminJobController)

    function adminJobController($location, jobSearchService, $routeParams, check) {
        var model = this;

        model.updateJob = updateJob;
        model.postingId =  $routeParams.postingId;
        model.updateJob = updateJob;

        init();

        function init() {

            if(typeof model.postingId == 'undefined') {
                model.posting = jobSearchService.sendPosting();

                //console.log(model.posting);
            }
            else{
                jobSearchService.getPostingById(model.postingId)
                    .then(function (posting) {
                        model.posting = posting;
                    })

            }
        }

        function updateJob() {


            if(typeof model.posting.jobTitle == 'undefined' || model.posting.jobTitle == "" || model.posting.jobTitle == null){
                model.errorMessage = "Job Title cannot be empty"
                return;
            }

            if(typeof model.posting.company == 'undefined' || model.posting.company == "" || model.posting.company == null){
                model.errorMessage = "Company name cannot be empty"
                return;
            }

            if(typeof model.posting.location == 'undefined' || model.posting.location == "" || model.posting.location == null){
                model.errorMessage = "Job Location cannot be empty"
                return;
            }

            if(typeof model.posting.date == 'undefined' || model.posting.date == "" || model.posting.date == null){
                model.errorMessage = "Posted Date cannot be empty"
                return;
            }

            if(typeof model.posting.jobType == 'undefined' || model.posting.jobType == "" || model.posting.jobType == null){
                model.errorMessage = "Job Type cannot be empty"
                return;
            }

            if(typeof model.posting.description == 'undefined' || model.posting.description == "" || model.posting.description == null){
                model.errorMessage = "Description cannot be empty"
                return;
            }
            console.log("Ithe")

            jobSearchService.updateJob(model.userId,model.posting)
                .then(function (response) {
                    //console.log("DOne");
                    $location.url('/admin/jobupdate/'+model.postingId);
                },function (error) {
                    console.log(error);
                })
        }

    }
})();