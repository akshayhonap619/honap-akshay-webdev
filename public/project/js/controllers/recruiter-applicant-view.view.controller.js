/**
 * Created by Akshay on 8/15/2017.
 */
(function () {

    angular.module("JobApp")
        .controller("applicantViewController",applicantViewController)

    function applicantViewController($routeParams, jobSearchService, check, userService,$location,$route ) {
        var model = this;

        model.userId = check._id;
        model.postingId = $routeParams.postingId;
        model.decision = decision;
        //console.log("aaya idhar")
        //console.log(model.postingId)

        model.users = [];

        init();
        //init2();

        function init() {
             jobSearchService.getPostingById(model.postingId)
                .then(function (response) {
                    model.posting = response;

                   /* console.log("posting info is ")
                    console.log(model.posting.applicants);*/

                    for(u in model.posting.applicants){

                        userService.getUserById(model.posting.applicants[u]._id)
                            .then(function (user) {
                                //console.log("User is")
                               // console.log(user)
                                model.posting.applicants[u].user = user;
                                //user.status = model.posting.applicants[u].status;
                                model.users.push(user);

                            })

                    }






                })



        }

        function decision(userId,decision) {
            console.log("userId is "+userId);
            console.log("decision is "+decision);
            jobSearchService.jobDecision(userId,model.postingId,decision)
                .then(function (decision) {
                    $route.reload();
                   // $location.url('/recruiter/posting/'+model.postingId+'/applicants')
                })
        }

    }

})();