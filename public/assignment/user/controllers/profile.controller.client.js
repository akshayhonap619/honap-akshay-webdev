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

            userService.findUserById(model.userId)
                .then(getUser);


            function getUser(response) {
                model.user = response;
            }
        }
        function updateUser() {
            userService.updateUser(model.userId, model.user)
                .then(function () {
                    $location.url("/user/"+model.userId);
                });

        }

        function deleteUser() {
            userService.deleteUser(model.userId)
                        .then(function () {
                            $location.url("/login")
                        });




        }

    }

})();
