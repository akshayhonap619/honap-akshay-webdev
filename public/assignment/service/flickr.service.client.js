/**
 * Created by Akshay on 8/9/2017.
 */
(function () {
    angular.module('WebApp')
        .service('flickrService', flickrService)


    function flickrService($http) {
        this.searchPhoto = searchPhoto;

        var key = "6f64f5a8681323e550c396b471600352";
        var secret = "c453c865cd9d3980";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhoto(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }

    }
})();