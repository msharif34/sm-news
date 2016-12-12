angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, Api, $state, $ionicLoading) {
  $ionicLoading.show({
    // template: "'<ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>'"
    template: '<ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
    noBackdrop: true
  });
  $scope.loginData = {};


  $scope.openBrowser = function(link){
    window.open(link, "_blank", "location=no"); return false;
  };

  $scope.goToPage = function (page) {
    $state.go(page);
  };

  $scope.doRefresh = function(state) {
    if(state === 'app.list'){
      Api.getApiData()
      .then(function(result) {
        $scope.featured = result.splice(0, 3);
        $scope.data = result;
      })
      .finally(function() {
       // Stop the ion-refresher from spinning
       console.log('refresh successful');
       $scope.$broadcast('scroll.refreshComplete');
     });
   }else if (state === 'app.list_sports') {
     Api.getApiSports()
     .then(function(result) {
       $scope.featured = result.splice(0, 3);
       $scope.data = result;
     })
     .finally(function() {
      // Stop the ion-refresher from spinning
      console.log('refresh successful');
      $scope.$broadcast('scroll.refreshComplete');
    });
   }
  };


  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('MainCtrl', function($scope, Api, $ionicLoading, $state, $ionicSlideBoxDelegate) {
  var counter = 0;
  var max;
  $scope.noMoreItemsAvailable = false;
  Api.getApiData()
  .then(function(result) {
    $scope.featured = result.splice(0, 3);
    $scope.data = result;
    var max = result.length;

    $scope.loadMore = function() {
      counter+= 1;
      Api.getMoreData(counter)
      .then(function(info){
        $scope.data = $scope.data.concat(info.info);
        $scope.$broadcast('scroll.infiniteScrollComplete');
        var limit = info.allData.length - 3;

        if ( $scope.data.length >= limit ) {
          $scope.noMoreItemsAvailable = true;
        }
      })

    };
  });


})

.controller('SportsCtrl', function($scope, $stateParams, $http, Api, $ionicSlideBoxDelegate) {
  // console.log("params: " + JSON.stringify($stateParams))
  Api.getApiSports()
  .then(function(result) {
    $scope.featured = result.splice(0, 3);
    $scope.data = result;
  });
});
