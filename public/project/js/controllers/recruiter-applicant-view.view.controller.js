/**
 * Created by Akshay on 8/15/2017.
 */
(function () {

    angular.module("JobApp")
        .controller("applicantViewController",applicantViewController)

    function applicantViewController($routeParams, jobSearchService) {
        var model = this;

        model.userId = $routeParams.userId;
        model.postingId = $routeParams.postingId;
        model.decision = decision;

        init();

        function init() {
             jobSearchService.getPostingById(model.postingId)
                .then(function (response) {
                    model.posting = response;
                })
        }
        
        function decision(userId,decision) {
            console.log(userId);
            jobSearchService.jobDecision(userId,model.postingId,decision)
                .then(function (decision) {
                    console.log("decision is "+ decision);
                })
        }

    }

})();