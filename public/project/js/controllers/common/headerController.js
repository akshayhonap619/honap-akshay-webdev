/**
 * Created by Akshay on 8/17/2017.
 */
(function () {
    angular.module("JobApp")
        .controller('headerController',headerController)
    
        function headerController($scope, $rootScope) {
            $scope.login = false;

            $scope.name= "";
            $rootScope.$on("login", function(ev, resp){
                console.log(resp);
                $scope.userType = resp.user.role;
                $scope.name = resp.user.firstName;
                $scope.login = true;
            });

            $scope.studentlogout = function(){
                $scope.name= "";
                $scope.login= false;
                $rootScope.$emit("studentLogout");
            }

            $scope.recruiterlogout = function(){
                $scope.name= "";
                $scope.login= false;
                $rootScope.$emit("recruiterlogout");
            }


        }
})();