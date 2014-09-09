#Workshop Be MEAN - $http - exercício
Exercício sobre `$http` do AngularJs no Workshop Be MEAN, porém o código está todo agrupado, vou ensinar nesse repositório como modularizar seu código seguindo o [AngularJs styleguide do John Papa](https://github.com/johnpapa/angularjs-styleguide).

##Instalação

Para clonar o repositório:

> git@github.com:suissa/angularjs-redtube.git

Para instalar:

> cd angularjs-redutube
> npm install -g http-server
> http-server

Para visualizar entre com seu navegador em:

> localhost:8080x

##Problema 1

No arquivo `redtube.js` tem todo o código da nossa aplicação, vamos iniciar separando ele como um módulo e separando seu controller.

###Solução

Separamos o arquivo `redtube.js` em 2:

- modules/redtube/app.js
- modules/redtube/controllers.js

**modules/redtube/app.js**
Nesse arquivo deixamos apenas o módulo principal da nossa aplicação `workshopBeMean` com suas dependências, por enquanto apenas nosso módulo `workshopBeMean.redtube` bem como a definição do mesmo.

    angular.module('workshopBeMean', ['workshopBeMean.redtube']);

    angular.module('workshopBeMean.redtube', []);

**modules/redtube/controllers.js**
Aqui nós colocamos toda a lógica do `controller` encapsulada por uma IIFE(Immediately Invoked Function Expression).

Pois no styleguide ele nos diz para encapsular nossos módulos em uma IIFE para não deixar as globais par trás e evitar colisões de nome, principalmente quando seu código é minificado.

```
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
```


##Problema 2
Nosso controller possui muitas responsabilidades, como a integração com a API via `$http`.

###Solução
Para separmos as responsabilidades vamos criar um `Service` para gerenciar a integração com a API do Redtube e no Controller apenas o usamos.

Dividimos o arquivo `modules/redtube/controllers.js` em 2:

- modules/redtube/controllers.js
- modules/redtube/services.js

**modules/redtube/services.js**
Aqui nós colocamos toda a camada de comunicação externa da aplicação, também encapsulada por uma IIFE, assim poderemos reaproveitar em outros controllers desse módulo futuramente.

```
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
```