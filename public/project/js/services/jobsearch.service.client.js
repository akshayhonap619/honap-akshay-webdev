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

            this.getPostingById = getPostingById;

            //student
            this.getStudentJobs = getStudentJobs;

            this.searchStudentPosting = searchStudentPosting;

            this.applyForJob = applyForJob;
            this.jobDecision = jobDecision;

            this.getApplicationsForStudent = getApplicationsForStudent;

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
                        console.log("response from server is ")
                        console.log(response);
                        console.log(response.data);
                        return "Deleted";
                    })

            }


            function getStudentJobs(url) {
               return $http.get(url)
                   .then(function (response) {
                       return response.data;
                   })
            }


            function getPostingById(postingId) {
                var url = '/api/job/posting/'+postingId
                return $http.get(url)
                    .then(function (response) {
                        return response.data;
                    })
            }

            function searchStudentPosting(url) {
                return $http.get(url)
                    .then(function (response) {
                        console.log(response)
                        return response.data;
                    })
            }

            function applyForJob(postingId, userId) {
                var url = '/api/job/student/'+userId+'/posting/'+postingId+'/apply'
                console.log(url);
               return $http.put(url)
                   .then(function (response) {
                       console.log(response);
                       return response.data;
                   })

            }
            
            function jobDecision(userId,postingId,decision) {
                var url = '/api/job/student/'+userId+'/posting/'+postingId+'/decision?decision='+decision;
                console.log(url);
                return $http.post(url)
                    .then(function (response) {
                        return response.data;
                    })
                
            }

            function getApplicationsForStudent(userId) {
                var url = '/api/job/student/'+userId+'/applications';

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