/**
 * Created by Akshay on 8/12/2017.
 */

(function () {
    angular.module("JobApp")
        .controller("studentProfileController", studentProfileController)
    
    
    function studentProfileController($location, userService, $routeParams, check) {
        
        var model = this;
        model.userId = check._id;
        model.click = click;

        init();
        console.log(model.userId +"   us")
        function init() {

            userService.getUserById(model.userId)
                .then(function (response) {
                    model.user = response.profile;
                    console.log("here")
                    console.log(response)
                })

        }
        
        function click() {
            userService.updateProfile(model.userId, model.user)
                .then(function (response) {
                    console.log("response from server");
                })


        }
    }
})();