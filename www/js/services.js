angular.module('starter.services', [])
.factory('Api', function($http, $q, ApiEndpoint, $ionicSlideBoxDelegate, $ionicLoading, $rootScope) {
  var getApiData = function() {
    var q = $q.defer();
    $ionicLoading.show({
      // template: "'<ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>'"
      template: '<ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
      noBackdrop: true
    });

    $http({
         method: 'GET',
         // windows
         // url: ApiEndpoint.url + '/news',
         //Mac
         url: 'http://localhost:3000' + '/news',
         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
     }).success(function(data) {
      console.log('Got some data: ');
      $ionicLoading.hide();
      setTimeout(function() {
          $ionicSlideBoxDelegate.slide(0);
          $ionicSlideBoxDelegate.update();
          $rootScope.$apply();
      });
      q.resolve(data);
    })
    .error(function(error){
      console.log('Had an error: ' + JSON.stringify(error))
      q.reject(error);
    })
    return q.promise;
  };


  var getApiSports = function (link, source) {
    var q = $q.defer();
    $ionicLoading.show({
      // template: "'<ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>'"
      template: '<ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
      noBackdrop: true
    });
    $http({
         method: 'GET',
         // windows
         url: ApiEndpoint.url + '/news/sports',
         //Mac
        //  url: 'http://localhost:3000' + '/news/sports',
         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
     }).success(function(data) {
      $ionicLoading.hide();
      setTimeout(function() {
        $ionicSlideBoxDelegate.slide(0);
        $ionicSlideBoxDelegate.update();
        $rootScope.$apply();
      });
      q.resolve(data);
    })
    .error(function(error){
      console.log('Had an error: ' + JSON.stringify(error))
      q.reject(error);
    })
    return q.promise;
  };

  return {
    getApiData: getApiData,
    getApiSports: getApiSports
  };
})
