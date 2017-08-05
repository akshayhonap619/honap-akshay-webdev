/**
 * Created by Akshay on 7/22/2017.
 */
(function () {
    angular
        .module("WebApp")
        .factory("userService", userService);

    function userService($http) {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var objs = {"findUserByUserName" : findUserByUserName,
                    "findUserById": findUserById,
                    "findUserByUserNameonly": findUserByUserNameonly,
                    "addUser": addUser,
                    "updateUser" : updateUser,
                    "deleteUser" : deleteUser
        };
        return objs;

        function findUserByUserName(username, password) {
           var url = "/api/user?username="+username+"&password="+password;
            //var url = "http://localhost:8080/WebProject/text/user?username="+username+"&password="+password+"/profile";

           //var m= {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  };


            //var url = "http://localhost:8080/WebProject/user/*/website";

            return $http.get(url)
               .then(function (response) {
                   console.log("here");
                   console.log(response.data);
                   return response.data;
               });


           /* for(u in users)
            {
                var myuser = users[u];
                if(myuser.username === username  && myuser.password === password) {
                   return myuser;
                }

            }
                return null;
                */
        }
        
        function findUserById(userId) {
            var url = "/api/user/"+userId
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
                ;
            /*for(u in users)
            {
                if(users[u]._id === userId)
                {
                    return users[u];
                }

            }
            return null;*/
        }

        function findUserByUserNameonly(username) {

           var url = "/api/user?username="+username;
           return $http.get(url)
               .then(function (response) {
                   return response.data;
               })


            /*for(u in users)
            {
                if(users[u].username === username){
                    return username;
                }
            }
            return null;*/
        }

        function addUser(user) {

            var url = "/api/user";
            return $http.post(url,user)
                .then(function (response) {
                     return response.data;
                })

            /*var newUser = { _id : (new Date()).getTime() + "",
                            username : user.username,
                            password : user.password
            };

            users.push(newUser);
            return newUser._id;
            */
        }

        /*function updateUser(userId, firstName, lastName, username, email) {
            for(u in users){
                if(users[u]._id == userId){
                    users[u].firstName = firstName;
                    users[u].lastName = lastName;
                    users[u].username = username;
                    users[u].email = email;
                }
            }
            return;
        }*/

        function updateUser(userId, user) {
        var url = "/api/user/"+userId;

        return $http.put(url,user)
                    .then(function (response) {
                        return response.data;
                    });
        }



        function deleteUser(userId) {

            var url = "/api/user/"+userId;

            return $http.delete(url)
                .then(function (response) {
                    console.log("babu deleted");
                    return response.data;
                })

           /* var user = findUserById(userId);
            var index = users.indexOf(user);
            users.splice(index,1);
            return;
            */
        }
        
    }
})();