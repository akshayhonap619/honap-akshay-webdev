/**
 * Created by Akshay on 7/21/2017.
 */
(function () {
    var app = angular.module("WebApp");



    app.controller("registerController", registerController);

    function registerController($location, userService) {

        var model = this;
        model.register = register;

            function register(username, password, password1) {

            if(username === null || username === '' || username === undefined ) {
                model.errorMessage = "UserName Cannot be null";
                return;
            }

            if(!(password === password1)){
                model.errorMessage = "Passwords must Match";
                return;
            }


            userService.findUserByUserNameonly(username)
                .then(successRegister, errorRegister);

                        
            function errorRegister(error) {
                model.errorMessage = "User already exists";
                return;
            }    

            
            function successRegister(success) {

                var user = {};
                user.username = username;
                user.password = password;

                userService.addUser(user)
                    .then(function (response) {
                        $location.url("/user/" + response._id);
                    })

                //var id = userService.addUser(user);
                //$location.url("/user/"+id);

            }



        }

    }




})();