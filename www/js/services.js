angular.module('starter.services', [])
.factory('Api', function($http, $q, ApiEndpoint) {
  var getApiData = function() {
    var q = $q.defer();

    $http.get(ApiEndpoint.url + '/news')
    .success(function(data) {
      console.log('Got some data: ')
      q.resolve(data);
    })
    .error(function(error){
      console.log('Had an error: ' + JSON.stringify(error))
      q.reject(error);
    })

    return q.promise;
  };


  var getApiDetails = function (link, source) {
    var q = $q.defer();
    var url = link;
    var source = source;
    $http({
         method: 'POST',
         url: ApiEndpoint.url + '/news/details',
         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
         data: {data: url, source: source},
         transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
      }
     })
    .success(function(data) {
      console.log('Got some details: ', JSON.stringify(data))
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
    getApiDetails: getApiDetails
  };
})
