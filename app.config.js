angular.
    module('exchangeApp').
    config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');
        
            $routeProvider.
                when('/home', {
                  template: '<currency-list></currency-list>'
                }).
                when('/history', {
                  template: '<exchange-history></exchange-history>'
                }).
                otherwise('/home');
        }
    ])