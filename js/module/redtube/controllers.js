;(function(){
'use Strict';
  angular.module('workshopBeMean.redtube')
  .controller('RedtubeController', RedtubeController);

  // Injetando as dependencias como o styleguide sugere
  RedtubeController.$inject = ['$scope', '$http', '$sce', 'videosService'];

  function RedtubeController($scope, $http, $sce, videosService) {
    $scope.query = 'Sasha Gray';

    $scope.$watch('query', function (data) {
      console.log('watch', data);
      videosService.search(data)
      .success(function (data) {
        console.log(data);
        $scope.videos = data.videos;
      })
      .error(function (err){
        console.log('Error: ', err);
      });      
    });

    $scope.currentVideo = null;
    $scope.isModalActive = false;

    $scope.videoModal = function (id) {
      if (!id) {
        $scope.isModalActive = false;
        return;
      }

      var video = "http://embed.redtube.com/player/?id=" + id + "&autostart=true";

      $scope.currentVideo = $sce.trustAsResourceUrl(video);
      $scope.isModalActive = !$scope.isModalActive;
    };
  }
}())