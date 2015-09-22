'use strict';

angular.module('alerta', [
  'config',
  'ngRoute',
  'ngMaterial',
  'ngMdIcons',
  'ngSanitize',
  'alertaFilters',
  'alertaServices',
  'alertaDirectives',
  'alertaControllers',
  'satellizer'
  ])

.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/alerts', {
      templateUrl: 'partials/alert-list.html',
      controller: 'AlertListController',
      controllerAs: 'vm',
      reloadOnSearch: false
    })
    .when('/alert/:id', {
      templateUrl: 'partials/alert-details.html',
      controller: 'AlertDetailController'
    })
    .when('/top10', {
      templateUrl: 'partials/alert-top10.html',
      controller: 'AlertTop10Controller',
      reloadOnSearch: false
    })
    .when('/watch', {
      templateUrl: 'partials/alert-watch.html',
      controller: 'AlertWatchController'
    })
    .when('/users', {
      templateUrl: 'partials/users.html',
      controller: 'UserController'
    })
    .when('/keys', {
      templateUrl: 'partials/keys.html',
      controller: 'ApiKeyController'
    })
    .when('/blackouts', {
      templateUrl: 'partials/blackouts.html',
      controller: 'AlertBlackoutController'
    })
    .when('/profile', {
      templateUrl: 'partials/profile.html',
      controller: 'ProfileController'
    })
    .when('/stats', {
      templateUrl: 'partials/stats.html',
      controller: 'StatsController',
      controllerAs: 'stats'
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LoginController'
    })
    .when('/signup', {
      templateUrl: 'partials/signup.html',
      controller: 'SignupController'
    })
    .when('/logout', {
      templateUrl: 'partials/logout.html',
      controller: 'LogoutController'
    })
    .otherwise({
      redirectTo: '/alerts'
    });
  }])

.config(['$httpProvider',
  function ($httpProvider) {
    $httpProvider.interceptors.push(function ($q, $location) {
      return {
        'response': function (response) {
            //Will only be called for HTTP up to 300
            return response;
          },
          'responseError': function (rejection) {
            if(rejection.status === 401) {
              $location.path('/login');
            }
            return $q.reject(rejection);
          }
        };
      });
  }])

.config(['config', '$authProvider',
  function (config, $authProvider) {
    $authProvider.loginUrl = config.endpoint+'/auth/login';
    $authProvider.signupUrl = config.endpoint+'/auth/signup';
    $authProvider.logoutRedirect = '/login';
    $authProvider.google({
      url: config.endpoint+'/auth/google',
      clientId: config.client_id
    });
    $authProvider.github({
      url: config.endpoint+'/auth/github',
      clientId: config.client_id
    });
    $authProvider.twitter({
      url: config.endpoint+'/auth/twitter',
      clientId: config.client_id
    });
  }])

.config(['$mdThemingProvider', '$mdIconProvider', function($mdThemingProvider, $mdIconProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey')
    .accentPalette('purple');
  $mdIconProvider
    .icon("menu"        , "img/icons/ic_menu_24px.svg" , 24)
    .icon("close"       , "img/icons/ic_close_24px.svg" , 24)
    .icon("arrow_back"  , "img/icons/ic_arrow_back_24px.svg" , 24)
    .icon("search"      , "img/icons/ic_search_24px.svg" , 24)
    .icon("account"     , "img/icons/ic_account_circle_24px.svg" , 24)
    .icon("settings"    , "img/icons/ic_settings_24px.svg" , 24)
    .icon("more_horiz"  , "img/icons/ic_more_horiz_24px.svg" , 24)
    .icon("help"        , "img/icons/ic_help_24px.svg" , 24)
    .icon("info"        , "img/icons/ic_info_24px.svg" , 24)
    .icon("stats"       , "img/icons/ic_assessment_24px.svg" , 24)
    .icon("exit_to_app" , "img/icons/ic_exit_to_app_24px.svg" , 24)
    .icon("more_vert"   , "img/icons/ic_more_vert_24px.svg" , 24)
    .icon("undo"        , "img/icons/ic_undo_24px.svg" , 24)
    .icon("visible"     , "img/icons/ic_visibility_24px.svg" , 24)
    .icon("invisible"   , "img/icons/ic_visibility_off_24px.svg" , 24)
    .icon("check"       , "img/icons/ic_check_24px.svg" , 24)
    .icon("close"       , "img/icons/ic_close_24px.svg" , 24)
    .icon("delete"      , "img/icons/ic_delete_24px.svg" , 24);
}]);
