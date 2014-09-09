angular.module('workshopBeMean', ['filters'])
    .controller('BeerController', ['$scope', function($scope) {
      // criamos um array de cerveja
        $scope.orderType = 'name'
        $scope.isReverse = false;

        $scope.setOrder = function(type) {
            $scope.orderType = type;
            $scope.isReverse = !$scope.isReverse;
        };

        $scope.cervejas = [
          {
            name: 'Kaiser',
            price: 2
          },
          {
            name: 'Skol',
            price: 3
          }, {
            name: 'Glacial',
            price: 4
          }, {
            name: 'Polar',
            price: 6
          }, {
            name: 'Heineken',
            price: 10
          }
        ];
    }])
    .controller('UserController', ['$scope', '$http',
    function($scope, $http) {

      $scope.mostraUser = false;

      // exemplo de função que irá rodar com um CLICK
      $scope.rodar = function() {
        $scope.mostraUser = !$scope.mostraUser;
      }

      // delete $http.defaults.headers.common['X-Requested-With'];

      var url = 'https://api.github.com/users/felipemarcos';
      var method = 'GET';
      $http({
        url: url,
        method: method
      }).
      success(function(data) {
        console.log('GitHub: ', data);
        $scope.user = data;
      }).
      error(function(err) {
        console.log('Erro: ', err);
      });
    }
  ])
  .controller('RedtubeController', ['$scope', '$http',
    function($scope, $http) {

      // var url = 'http://cep.correiocontrol.com.br/02011200.json';

      $scope.query = 'Sasha Gray';
     
      $scope.$watch('query', function(data) {
        console.log('watch', data);
        searchVideo(data);
      });

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
          console.log('Error: ', err)
        });
      };

    }])

angular.module('filters', [])
    .filter('reverse', function() {
        return function(text) {
            if (text) {
                return text.split('').reverse().join('');
            }
        }
    })

    .filter('truncate', function () {
        return function (text, length, end) {
          if(text){
            if (isNaN(length))
                length = 10;
            if (end === undefined)
                end = "...";
            if (text.length <= length || text.length - end.length <= length) {
                return text;
            }
            else {
                return String(text).substring(0, length) + end;
            }

        }
    };
    });