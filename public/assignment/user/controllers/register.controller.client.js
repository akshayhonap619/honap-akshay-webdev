/**
 * Created by Akshay on 7/21/2017.
 */
(function () {
    var app = angular.module("WebApp");



    app.controller("registerController", registerController);

    function registerController($location, userService) {

        var model = this;
        model.register = function (username, password, password1) {

            if(username === null || username === '' || username === undefined ) {
                model.errorMessage = "UserName Cannot be null";
                return;
            }

            if(!(password === password1)){
                model.errorMessage = "Passwords must Match";
                return;
            }


            var myuser = userService.findUserByUserNameonly(username);

            if(myuser!=null)
            {
                model.errorMessage = "User already exists";
                return;
            }
            else{

                var id = userService.addUser(username, password);
                $location.url("/user/"+id);
            }




        }

    }




})();
