/**
 * Created by Akshay on 7/22/2017.
 */
(function () {
    angular
        .module("WebApp")
        .factory("userService", userService);

    function userService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {"findUserByUserName" : findUserByUserName,
                    "findUserById": findUserById,
                    "findUserByUserNameonly": findUserByUserNameonly,
                    "addUser": addUser,
                    "updateUser" : updateUser,
                    "deleteUser" : deleteUser
        };
        return api;

        function findUserByUserName(username, password) {
            for(u in users)
            {
                var myuser = users[u];
                if(myuser.username === username  && myuser.password === password) {
                   return myuser;
                }

            }
                return null;

        }
        
        function findUserById(userId) {
            for(u in users)
            {
                if(users[u]._id === userId)
                {
                    return users[u];
                }

            }
            return null;
        }

        function findUserByUserNameonly(username) {
            for(u in users)
            {
                if(users[u].username === username){
                    return username;
                }
            }
            return null;
        }

        function addUser(username,password) {

            var newUser = { _id : (new Date()).getTime() + "",
                            username : username,
                            password : password
            }

            users.push(newUser);
            return newUser._id;
        }

        function updateUser(userId, firstName, lastName, username, email) {
            for(u in users){
                if(users[u]._id == userId){
                    users[u].firstName = firstName;
                    users[u].lastName = lastName;
                    users[u].username = username;
                    users[u].email = email;
                }
            }
            return;
        }

        function deleteUser(userId) {
            var user = findUserById(userId);
            var index = users.indexOf(user);
            users.splice(index,1);
            return;

        }
        
    }
})();