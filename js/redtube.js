angular.module('workshopBeMean', [])
  .controller('RedtubeController', ['$scope', '$http', '$sce',
    function($scope, $http, $sce) {
      $scope.query = 'Sasha Gray';

      $scope.$watch('query', function(data) {
        console.log('watch', data);
        searchVideo(data);
      });

      $scope.currentVideo = null;
      $scope.isModalActive = false;

      $scope.videoModal = function(id) {
        if (!id) {
          $scope.isModalActive = false;
          return;
        }

        var video = "http://embed.redtube.com/player/?id=" + id + "&autostart=true";

        $scope.currentVideo = $sce.trustAsResourceUrl(video);
        $scope.isModalActive = !$scope.isModalActive;
      };

      var url = 'http://cors-server.getup.io/url/api.redtube.com/?data=redtube.Videos.searchVideos&search='+$scope.query;

      delete $http.defaults.headers.common['X-Requested-With'];

      function searchVideo(data) {
        url = 'http://cors-server.getup.io/url/api.redtube.com/?data=redtube.Videos.searchVideos&search='+data;
        $http.get(url)
        .success(function(data) {
          console.log(data);
          $scope.videos = data.videos;
        })
        .error(function(err){
          console.log('Error: ', err);
        });
      };

    }])