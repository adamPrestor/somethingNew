angular.
    module('exchangeApp').
    config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');
        
            $routeProvider.
                when('/home', {
                  template: '<exchange-page></exchange-page>'
                }).
                when('/history', {
                  template: '<exchange-history></exchange-history>'
                }).
                otherwise('/home');
        }
    ])