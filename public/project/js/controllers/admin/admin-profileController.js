/**
 * Created by Akshay on 8/17/2017.
 */
(function () {

    angular.module("JobApp")
        .controller("adminProfileController",adminProfileController)

        function adminProfileController(check,adminService,userService,$location, jobSearchService) {
            var model = this;
            model.userId = check._id;
            model.getAllUsers = getAllUsers;
            model.getAllpostings = getAllpostings;

            model.logoutUser = logoutUser;

            model.deleteUser = deleteUser;
            model.getAllPostings = getAllPostings;
            
            model.deleteJob = deleteJob;

           // model.showUsers=showUsers;
          //  model.showPostings=showPostings;

            model.flagUsers=false;
            model.flagPostings = false;
            init()

            function init() {
                 adminService.getAdmin()
                    .then(function (response) {
                        model.user = response
                    })


                    adminService.getAllUsers()
                        .then(function (users) {
                            model.allUsers = users;
                        })

                adminService.getAllPostings()
                    .then(function (postings) {
                        model.allPostings = postings;
                    })

                model.flagUsers=false;
                model.flagPostings = false;
            }

            function getAllUsers() {
                model.flagUsers=true;
                model.flagPostings=false;
                //model.allUsers = model.user
            }

            function getAllpostings() {
                model.flagUsers=false;
                model.flagPostings=true;

                model.allPostings = model.userId;
            }

            function deleteUser(userId) {
                    console.log(userId)
                    adminService.deleteUser(userId)
                        .then(function (response) {
                            adminService.getAllUsers()
                                .then(function (users) {
                                    model.allUsers = users;
                                })
                        })
            }
            
            function deleteJob(jobId) {
                jobSearchService.deletePosting(jobId)
                    .then(function (response) {
                        adminService.getAllPostings()
                            .then(function (postings) {
                                model.allPostings = postings;
                            })

                    })
            }

            
            function getAllPostings() {
                model.flagUsers=false;
                model.flagPostings=true;

            }

            function logoutUser() {
                userService.logoutUser()
                    .then(function (response) {
                        $location.url('#/login')
                    })
            }

        }

})();