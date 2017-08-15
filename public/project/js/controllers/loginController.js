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

            userService.getUserByUsernamePass(user)
                .then(function (response) {
                    if(response!= null){
                        console.log(response.role)
                        $location.url('/'+response.role+'/'+response._id);
                    }
                    else{
                        model.errorMessage="Invalid Username or Password";
                    }
                })
        }

    }
})();