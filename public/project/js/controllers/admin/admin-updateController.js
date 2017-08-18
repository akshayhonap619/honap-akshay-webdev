/**
 * Created by Akshay on 8/17/2017.
 */
(function () {
    angular.module("JobApp")
        .controller("adminUpdateController",adminUpdateController)
    
    
        function adminUpdateController($routeParams, $location, userService) {
            var model = this;
            model.userId = $routeParams.userId;
            console.log(model.userId);
        
            model.updateUser = updateUser; 
            
            init();

            function init() {
                userService.getUserById(model.userId)
                    .then(function (response) {
                        model.user = response;
                    })

            }
            
            function updateUser() {
                userService.updateUser(model.userId,model.user)
                    .then(function (response) {
                        $location.url('/admin/update/'+model.userId);
                    })
            }

        }
    
})();