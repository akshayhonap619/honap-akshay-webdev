/**
 * Created by Akshay on 8/12/2017.
 */

(function () {
    var app = angular.module("JobApp");



    app.controller("registerController", registerController);

    function registerController($location, userService) {

        var model = this;
        model.register = register;

        function register(username,password,password1,role) {

            if(username === null || username === '' || username === undefined ) {
                model.errorMessage = "UserName Cannot be null";
                return;
            }

            if(!(password === password1)){
                model.errorMessage = "Passwords must Match";
                return;
            }

            if(typeof role == 'undefined'){
                model.errorMessage = "Please select a role";
                return;
            }

            userService.getUserByUsernamePass(username)
                .then(successRegister);




            function successRegister(success) {
                if(success==null){
                    model.errorMessage="Username already taken"
                    return;
                }

                var user = {};
                user.username = username;
                user.password = password;
                user. role = role;
                userService.register(user)
                    .then(function (response) {
                        console.log(response);
                        $location.url('/'+response.role);
                    })



            }



        }

    }

})();
