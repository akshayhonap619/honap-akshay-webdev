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

        this.updateProfile = updateProfile;

        //Login
        this.login = login;
        this.checkLogin = checkLogin;
        this.logoutUser = logoutUser;
        this.register = register;



        function getUserByUsernamePass(username) {
            var url = "/api/job/check/"+username  //?username=" +username;
            console.log(url);
            return $http.get(url)
                .then(function (response) {
                    console.log("response from server ")
                    console.log(response.data);
                    return response.data;
                }, function (error) {
                    console.log("here got an error")
                    return null;
                })


        }

        function addUser(user) {
            console.log("uS");
            console.log(user);
            var url = "/api/job/admin/add";
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

        function updateProfile(userId, profile) {
            var url = "/api/job/user/" + userId+'/profile';
            console.log(url);
            return $http.put(url, profile)
                .then(function (response) {
                    return response.data;
                });
        }


        function register(user) {

            console.log(user);
            var url = "/api/job/user/register";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                },function (error) {
                    console.log(error)
                })
        }
        
        function deleteUser(userId) {

            var url = "/api/job/user/" + userId;
            //console.log(url);
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

        function removeUser(userId) {
                var url = '/api/job/user/'+userId;
                console.log(url);
                return $http.delete(url)
                    .then(function (response) {
                        console.log("del response")
                        console.log(response.data);
                        return response.data;
                    })

        }
        
        function logoutUser() {
            var url = '/api/job/user/logout';
            return $http.post(url)
                .then(function (response) {
                    return response.data;
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