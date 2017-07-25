/**
 * Created by Akshay on 7/21/2017.
 */
(function () {
    var app = angular.module("WebApp");



    app.controller("loginController", loginController);

    function loginController($location, userService) {

        var model = this;
        model.login = login;
        model.register = register;
        model.welcomeUser = undefined;
            function login(user) {

            var myuser = userService.findUserByUserName(user.username, user.password);

            if (myuser != null) {
                $location.url("user" + "/" + myuser._id);
            }
            else {
                model.welcomeUser = "User not found ";
            }
        }

             function register() {
                $location.url("register");
            }

        }




})();
