/**
 * Created by Akshay on 8/12/2017.
 */

(function () {
    angular.module("JobApp")
        .controller("studentProfileController", studentProfileController)
    
    
    function studentProfileController($location, userService, $routeParams) {
        
        var model = this;
        model.userId =414;
        model.click = click;

        //init();
        
        function init() {

            userService.getUserById(model.userId)
                .then(function (response) {
                    model.user = response;
                })

        }
        
        function click() {
            userService.updateUser(model.userId, model.user)
                .then(function (response) {
                    console.log("response from server");
                })


        }
    }
})();