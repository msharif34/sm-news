// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])
/* //if use wakanda platform
    angular.module('starter', ['ionic', 'starter.controllers','wakanda'])
*/
.run(function($ionicPlatform,$rootScope,$ionicPopup,$location) {

$rootScope.home=[{id:"1",img:"img/002.png",title:"Why Nigeria was quick to trumpet the Chibok rescue",cat:"Political"}
                 ,{id:"2",img:"img/003.png",title:"JoseMourinho :Man Utd to name  Mourinho as  manager",cat:"sport"},
                 {id:"3",img:"img/004.png",title:"Help needy poor children",cat:"Political"},{id:"4",img:"img/005.jpg",title:"We Help Support African Children",cat:"Political"},{id:"5",img:"img/003.png",title:"JoseMourinho :Man Utd to name  Mourinho as  manager",cat:"sport"},{id:"6",img:"img/004.png",title:"Help needy poor children",cat:"Political"}]

$rootScope.setting=[{id:"1",icon:"ion-document-text",title:"Political",checked: true },{id:"2",icon:"ion-android-bicycle",title:"Sport"},
{id:"3",icon:"ion-arrow-graph-up-right",title:"Business"},{id:"4",icon:"ion-ios-people",title:"Culture",checked: true },{id:"5",icon:"ion-ios-partlysunny",title:"Weather"}]
    $rootScope.active_like=false;
    $rootScope.likeComment=function(index){
        if(index==1){
            $rootScope.active_like1=!$rootScope.active_like1
        }
        else if (index==2){
            $rootScope.active_like2=!$rootScope.active_like2
        }
    }

    $rootScope.detail_img="img/001.png"
    $rootScope.getImg=function(img){
      $rootScope.detail_img = img
    }

    $rootScope.border_color=1
    $rootScope.colorBorder=function(index){
      $rootScope.border_color=index
    }

    $rootScope.editProfile=function(index){
      $rootScope.show_input=index
    }

    $rootScope.activeItem=function(index){
        $rootScope.active_item=index
    }
    $rootScope.goto=function(url){
        $location.path(url)
    }

     $rootScope.forget_password=function (){
        $ionicPopup.show({
        template: 'Enter your email address below.<label class="item item-input"><input  type="email"  /></label>',
        title: 'Forget Password',
        subTitle: ' ',
        scope: $rootScope,
        buttons: [
        {text: 'Send',
        type: 'button-positive main_bg_btn'},
        { text: 'Cancel' ,
        type: 'button-positive sec_bg'},]
        });
    };

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    navigator.splashscreen.hide()
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    //======admob code start=============
 
      var admobid = {};
        // select the right Ad Id according to platform
        if( /(android)/i.test(navigator.userAgent) ) { 
            admobid = { // for Android
                banner: 'ca-app-pub-8783538592603016/8472934286'
            };
        } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
            admobid = { // for iOS
                banner: 'ca-app-pub-8783538592603016/8472934286'
            };
        } else {
            admobid = { // for Windows Phone
                banner: 'ca-app-pub-8783538592603016/8472934286'
            };
        }
 
  if(window.AdMob){
    AdMob.createBanner({
      adId:admobid.banner, 
      position:AdMob.AD_POSITION.BOTTOM_CENTER, 
      autoShow:true
    })
      console.log(JSON.stringify(window.AdMob))
  };
 
//=======AdMob Code End=======
  });
})

.constant('ApiEndpoint', {
  url: 'http://localhost:8100/api'
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
    $ionicConfigProvider.backButton.text('').previousTitleText('')  ;
    $ionicConfigProvider.navBar.alignTitle('center');
    $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('login', {
    url: "/login",
        templateUrl: "templates/login.html"
  })
   .state('app.register', {
    url: "/register",
     views: {
      'menuContent': {
        templateUrl: "templates/register.html"
      }
    }
  })
.state('app.about', {
    url: "/about",
    views: {
      'menuContent': {
        templateUrl: "templates/about.html"
      }
    }
  })

.state('app.contact', {
    url: "/contact",
    views: {
      'menuContent': {
        templateUrl: "templates/contact.html"
      }
    }
  })

  .state('app.list', {
    url: "/list",
    views: {
      'menuContent': {
        templateUrl: "templates/list.html",
        controller: "MainCtrl"
      }
    }
  })

  .state('app.detail', {
    url: "/detail/:link",
    views: {
      'menuContent': {
        templateUrl: "templates/detail.html",
        controller: "detailsCtrl"
      }
    }
  })
  .state('app.profile', {
    url: "/profile",
    views: {
      'menuContent': {
        templateUrl: "templates/profile.html"
      }
    }
  })
    .state('app.setting', {
    url: "/setting",
    views: {
      'menuContent': {
        templateUrl: "templates/setting.html"
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/list');
});
