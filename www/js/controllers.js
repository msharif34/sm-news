angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, Api, $state) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  // Form data for the login modal
  $scope.loginData = {};

  $scope.goNext = function (link, source) {
    console.log(link, source)
    $scope.openBrowser = function(link){
      console.log(JSON.stringify(link));
      window.open(link, "_blank", "location=no"); return false;
    }
    $scope.openBrowser(link)
  }

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

.controller('MainCtrl', function($scope, Api, $ionicLoading, $state) {
  $ionicLoading.show({
    template: "...loading"
  })

  Api.getApiData()
  .then(function(result) {
    $scope.data = result;
    $ionicLoading.hide();
  });
})

.controller('detailsCtrl', function($scope, $stateParams, $http, Api) {
  // console.log("params: " + JSON.stringify($stateParams))
  Api.getApiDetails()
  .then(function(result) {
    $scope.data = result;
  })
});
