/**
 * Created by Akshay on 8/11/2017.
 */


(function () {
    angular.module("JobApp")
        .config(configuration)

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl : "views/homePage.view.client.html"
            })
            .when('/search', {
                templateUrl : "views/searchPage.view.client.html",
                controller : "searchPageController as model"
            })
            .when('/login', {
                templateUrl : "views/login.view.client.html",
                controller : "loginController as model"
            })
            .when('/register', {
                templateUrl : "views/register.view.client.html",
                controller : "registerController as model"
            })
            .when('/student/profile', {
                templateUrl : "views/student-info.view.client.html",
                controller : "studentProfileController as model",
                resolve : {
                    check : checkLogin
                }
            })
            .when('/student', {
                templateUrl : "views/student-profile.view.client.html",
                controller : "studentWelcomeController as model",
                resolve : {
                    check : checkLogin
                }
            })
            .when('/recruiter', {
                templateUrl : "views/recruiter-profile.view.client.html",
                controller : "recruiterWelcomeController as model",
                resolve : {
                    check : checkLogin
                }
            })

            .when('/recruiter/posting/search', {
                templateUrl : "views/recruiter-search.view.client.html",
                controller : "searchController as model",
                resolve : {
                    check : checkLogin
                }
            })

            .when('/recruiter/posting/new', {
                templateUrl : "views/recruiter-posting-new.view.client.html",
                controller : "recruiterNewPostController as model",
                resolve : {
                    check : checkLogin
                }
            })

            .when('/recruiter/posting/:postingId/edit', {
                templateUrl : "views/recruiter-posting-edit.view.client.html",
                controller : "recruiterNewPostController as model",
                resolve : {
                    check : checkLogin
                }
            })

            .when('/student/posting/search', {
                templateUrl : "views/student-search.view.client.html",
                controller : "studentSearchController as model",
                resolve : {
                    check : checkLogin
                }
            })
            .when('/recruiter/posting/:postingId/applicants', {
                templateUrl : "views/recruiter-applicant.view.client.html",
                controller : "applicantViewController as model",
                resolve : {
                    check : checkLogin
                }
            })

            .when('/admin', {
                templateUrl : "views/admin/admin-profile.view.client.html",
                controller : "adminProfileController as model",
                resolve : {
                    check : checkLogin
                }
            })
            .when('/admin/add', {
                templateUrl : "views/admin/admin-adduser.view.client.html",
                controller : "adminAddController as model",
                resolve : {
                    check : checkLogin
                }
            })

            .when('/admin/update/:userId', {
                templateUrl : "views/admin/admin-update.view.client.html",
                controller : "adminUpdateController as model",
                resolve : {
                    check : checkLogin
                }
            })
    }
    function checkLogin(userService, $q, $location, $rootScope) {
        var defered = $q.defer()
        userService.checkLogin()
            .then(function (user) {
                if(user=='0'){
                    defered.reject();
                    $location.url('/login');
                }else{
                    $rootScope.$emit("login", {user:user});
                    defered.resolve(user);
                }

            });
        return defered.promise;
    }
})();