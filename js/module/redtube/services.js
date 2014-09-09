;(function(){
'use Strict';
angular.module('workshopBeMean.redtube')
.service('videosService', videosService);

videosService.$inject = ['$http'];

function videosService($http) {
  url = 'http://cors-server.getup.io/url/api.redtube.com/?data=redtube.Videos.searchVideos&search=';
  return {
    search : function(term){
      return $http.get(url+term);
    }
  }
}

}())