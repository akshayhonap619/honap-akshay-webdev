/**
 * Created by Akshay on 8/11/2017.
 */
(function () {
    angular.module("JobApp")
        .service("jobSearchService", jobSearchService)

        function jobSearchService($http) {
            this.searchJobs = searchJobs;
            this.addJob = addJob;

            this.savePosting = savePosting;
            this.sendPosting = sendPosting;

            this.getPostingsForRecruiter= getPostingsForRecruiter;
            this.deletePosting = deletePosting;

            this.getStudentJobs = getStudentJobs;

            var tempPosting ={}

            function searchJobs(url) {
               return $http.get(url)
                    .then(function (response) {
                        return response.data.resultItemList;
                    },function (error) {
                        console.log(error);
                    })
            }

            function addJob(userId,result) {
                result.recruiter = userId;
                var url = '/api/job/recruiter/'+userId+'/posting/new';
                console.log(result);
                return $http.put(url,result)
                    .then(function (response) {
                        return response.data;
                    })
            }


            function getPostingsForRecruiter(userId) {
                var url = '/api/job/recruiter/'+userId+'/posting'
                console.log(url);
                return $http.get(url)
                    .then(function (response) {
                       return response.data;
                    })
            }

            function deletePosting(postingId) {
                var url = "/api/job/posting/"+postingId;

                $http.delete(url)
                    .then(function (response) {
                        console.log("response from server is "+response)
                        return response.data;
                    })

            }


            function getStudentJobs(url) {
               return $http.get(url)
                   .then(function (response) {
                       return response.data;
                   })
            }


            function savePosting(posting) {
                tempPosting = posting;
            }

            function sendPosting() {
                return tempPosting;
            }
        }
})();