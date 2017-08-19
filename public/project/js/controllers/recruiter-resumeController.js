/**
 * Created by Akshay on 8/18/2017.
 */


(function () {

    angular.module("JobApp")
        .controller("recruiterResumeController",recruiterResumeController)

    function recruiterResumeController($routeParams, userService, check) {
        
        var model = this;
        
        model.studentId = $routeParams.userId;
        
        console.log(model.studentId);
        
        init();
        
        function init() {

            userService.getUserById(model.studentId)
                .then(function (response) {
                    model.user = response.profile;
                    //console.log("here")
                    //console.log(response)
                })

        }

    }

})();