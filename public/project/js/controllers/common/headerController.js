/**
 * Created by Akshay on 8/17/2017.
 */
(function () {
    angular.module("JobApp")
        .controller('headerController',headerController)
    
        function headerController($scope, $rootScope, userService, $location) {
            $scope.login = false;

            $scope.name= "";
            $rootScope.$on("login", function(ev, resp){
                console.log(resp);
                $scope.userType = resp.user.role;
                $scope.name = resp.user.firstName;
                $scope.login = true;
            });

            $scope.logout = function(){
                $scope.name= "";
                $scope.login= false;
                userService.logoutUser()
                    .then(function (response) {
                        $location.url('#/login')
                    });
            }




        }
})();