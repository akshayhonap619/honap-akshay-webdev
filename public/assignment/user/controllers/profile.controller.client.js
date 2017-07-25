/**
 * Created by Akshay on 7/21/2017.
 */
(function()
{
     angular.module("WebApp")
         .controller("profileController", profileController);




    function profileController($routeParams, userService,$location) {

        var model = this;
        model.userId = $routeParams.userId;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        init();

        function init() {

            model.user = userService.findUserById(model.userId);
            console.log(model.user.username);
        }

        function updateUser() {
            userService.updateUser(model.userId, model.user.firstName, model.user.lastName, model.user.username, model.user.email);
            $location.url("/user/"+model.userId);
        }

        function deleteUser() {
            userService.deleteUser(model.userId);
            $location.url("/login");
        }

    }

})();
