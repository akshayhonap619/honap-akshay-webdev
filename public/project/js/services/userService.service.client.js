/**
 * Created by Akshay on 8/12/2017.
 */
(function () {
    angular.module("JobApp")
        .service("userService", userService)

    function userService($http) {

        this.getUserByUsernamePass = getUserByUsernamePass;
        this.addUser = addUser;
        this.deleteUser = deleteUser;
        this.updateUser = updateUser;
        this.getUserById = getUserById;
        this.login = login;
        this.checkLogin = checkLogin;

        function getUserByUsernamePass(user) {
            var url = "/api/job/user?username=" + user.username + "&password=" + user.password + "&role=" + user.role;
            console.log(url);
            return $http.get(url)
                .then(function (response) {
                    console.log(response.data);
                    return response.data;
                }, function (error) {
                    return null;
                })


        }

        function addUser(user) {
            console.log("uS");
            console.log(user);
            var url = "/api/job/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                },function (error) {
                    console.log(error)
                })
        }


        function updateUser(userId, user) {
            var url = "/api/job/user/" + userId;
            console.log("here"
            );
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUser(userId) {

            var url = "/api/user/" + userId;

            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }
        
        function getUserById(userId) {
            var url ="/api/job/user/"+userId;
            console.log(url);
           return $http.get(url)
                .then(function (response) {
                    return response.data;
                },function (error) {
                    console.log("Error");
                })
        }

        function login(username,password) {
            var user = {username : username, password : password};
            var url = "/api/job/user/login";

            return $http.post(url , user)
                .then(function (response) {
                    //console.log(response);
                    //console.log("response in server");
                    return response.data;
                },function (error) {
                    return "Unauthorized";
                })

        }
        
        function checkLogin() {
            return $http.get('/api/job/checkLogin')
                .then(function (response) {
                   // console.log(response);
                    return response.data;
                })
        }

    }


})();