/**
 * Created by Akshay on 8/14/2017.
 */
(function () {
    angular.module("JobApp")
        .controller("studentSearchController",studentSearchController)

    function studentSearchController($location,jobSearchService,$routeParams,check, $anchorScroll) {
        var model= this;

        model.userId = check._id;
        model.searchJob = searchJob;
        model.applyForJob = applyForJob;


        console.log(model.userId);

        function searchJob(jobTitle,company,location,country,skill,jobType) {
            console.log(jobTitle+"     "+company+"     "+location+"         "+country+"         "+skill+"    "+jobType);

            if(typeof jobTitle =='undefined' || jobTitle=="" || jobTitle==null){
                model.errorMessage="Search keyword cannot be empty";
                return;
            }

            var url = '/api/job/student/:userId/posting/search?jobTitle='+jobTitle+'&company='+company+'&location='+location+'&country='
                +country+'&skill='+skill;


            jobSearchService.searchStudentPosting(url)
                .then(function (response) {
                    model.results = response;
                })
        }


        function applyForJob(posting) {
            jobSearchService.applyForJob(posting._id, model.userId)
                .then(function (response) {
                    if(response== "exists"){
                        model.errorMessage = "You have already applied for the job."
                        return;
                    }

                    $anchorScroll();
                    model.appMessage = "You have successfully applied for "+posting.jobTitle+'.  Your Resume is shared with recruiter';
                })
        }
    }

})();