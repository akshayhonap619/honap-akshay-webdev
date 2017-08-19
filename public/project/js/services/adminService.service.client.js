/**
 * Created by Akshay on 8/17/2017.
 */
(function () {
    angular.module("JobApp")
        .service("adminService",adminService)


    function adminService($http) {

        this.getAdmin = getAdmin;
        this.getAllUsers = getAllUsers;

        this.deleteUser = deleteUser;

        this.getAllPostings = getAllPostings;



        function getAdmin() {
            var url = '/api/job/admin';
            console.log(url);
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function getAllUsers() {
            var url = '/api/job/admin/users'

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function getAllPostings() {
            var url = '/api/job/allp';

           return $http.get(url)
               .then(function (response) {
                   return response.data;
               })
        }

        function deleteUser(userId) {
            var url = '/api/job/admin/'+userId;
            console.log(url);
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })

        }

    }
})();