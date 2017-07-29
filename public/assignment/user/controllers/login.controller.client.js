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

            userService.findUserByUserName(user.username, user.password)
                .then(successLogin, errorLogin);

            function successLogin(myuser) {

                $location.url("user" + "/" + myuser._id);
            }

            function errorLogin(error) {
                model.welcomeUser = "User not found " + user.username;
            }
        }

             function register() {
                $location.url("register");
            }




        }




})();