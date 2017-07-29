/**
 * Created by Akshay on 7/25/2017.
 */
(function () {
    angular.module("WebApp")
        .config(configuration);
    
    function configuration($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "user/views/login.view.client.html",
                controller: 'loginController as model'
            })
            .when("/user/:userId", {
                templateUrl: "user/views/profile.view.client.html",
                controller: 'profileController as model'
            })
            .when("/register", {
                templateUrl: 'user/views/register.view.client.html',
                controller: "registerController as model"
            })
            .when("/user/:userId/website", {
                templateUrl: 'website/views/website-list.view.client.html',
                controller: 'websiteListController as model'
            })
            .when("/user/:userId/website/new", {
                templateUrl : 'website/views/website-new.view.client.html',
                controller: 'newWebsiteController as model'
            })
            .when("/user/:userId/website/:websiteId", {
                templateUrl : 'website/views/website-edit.view.client.html',
                controller: 'editWebsiteController as model'
            })
            .when("/user/:userId/website/:websiteId/page", {
                templateUrl : 'page/views/page-list.view.client.html',
                controller: 'pageListController as model'
            })
            .when("/user/:userId/website/:websiteId/page/new", {
                templateUrl : 'page/views/page-new.view.client.html',
                controller: 'newPageController as model'
            })
            .when("/user/:userId/website/:websiteId/page/:pageId", {
                templateUrl : 'page/views/page-edit.view.client.html',
                controller: 'editPageController as model'
            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget", {
                templateUrl : 'widget/views/widget-list.view.client.html',
                controller: 'widgetListController as model'
            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget/new", {
                templateUrl : 'widget/views/widget-chooser.view.client.html',
                controller: 'widgetNewController as model'
            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", {
                templateUrl : 'widget/views/widget-edit.view.client.html',
                controller: 'widgetEditController as model'
            })



    }

}
)();