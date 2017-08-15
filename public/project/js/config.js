/**
 * Created by Akshay on 8/11/2017.
 */


(function () {
    angular.module("JobApp")
        .config(configuration)

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl : "views/recruiter-search.view.client.html",
                controller : "searchController as model"
            })
            .when('/home', {
                templateUrl : "views/recruiter-search.view.client.html",
                controller : "searchController as model"
            })
            .when('/login', {
                templateUrl : "views/login.view.client.html",
                controller : "loginController as model"
            })
            .when('/register', {
                templateUrl : "views/register.view.client.html",
                controller : "registerController as model"
            })
            .when('/profile', {
                templateUrl : "views/student-info.view.client.html",
                controller : "studentProfileController as model"
            })
            .when('/student/:userId', {
                templateUrl : "views/student-profile.view.client.html",
                controller : "studentWelcomeController as model"
            })
            .when('/recruiter/:userId', {
                templateUrl : "views/recruiter-profile.view.client.html",
                controller : "recruiterWelcomeController as model"
            })

            .when('/recruiter/:userId/posting/search', {
                templateUrl : "views/recruiter-search.view.client.html",
                controller : "searchController as model"
            })

            .when('/recruiter/:userId/posting/new', {
                templateUrl : "views/recruiter-posting-new.view.client.html",
                controller : "recruiterNewPostController as model"
            })

            .when('/student/:userId/posting/search', {
                templateUrl : "views/student-search.view.client.html",
                controller : "studentSearchController as model"
            })




    }
})();