/**
 * Created by Akshay on 8/13/2017.
 */
(function () {
    angular.module("JobApp")
        .controller("recruiterNewPostController",recruiterNewPostController)


        function recruiterNewPostController($location, jobSearchService, $routeParams) {
            var model = this;
            model.userId = $routeParams.userId;
            model.addJob = addJob;
            init();

            function init() {
                model.posting = jobSearchService.sendPosting();

                console.log(model.userId);
            }



            function addJob() {


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


                jobSearchService.addJob(model.userId,model.posting)
                    .then(function (response) {
                        console.log("DOne");
                    },function (error) {
                        console.log(error);
                    })
            }

        }
})();