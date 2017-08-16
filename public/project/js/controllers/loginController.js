/**
 * Created by Akshay on 8/12/2017.
 */
(function () {
    angular.module("JobApp")
        .controller("loginController", loginController)


    function loginController($location,userService) {
        var model = this;

            model.errorMessage ="";
            model.login = login;


        function login(user) {

            userService.login(user.username, user.password)
                .then(function (response) {
                        if(response =="Unauthorized"){
                                model.errorMessage = "Invalid username or password"
                        }
                    else{
                            $location.url('/'+response.role);
                        }
                })
        }

    }
})();