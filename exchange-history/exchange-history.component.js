angular.
  module('exchangeHistory').
  component('exchangeHistory', {
    templateUrl: 'exchange-history/exchange-history.template.html',
    controller: function ExchangeHistoryController($scope,$timeout,history) {
        var self = this;
        self.exchangeHistory = history.getProperty();
        self.now = Date.now();
        self.orderProp = 'experationTime';
        self.orderReverse = false;
      
        $scope.onTimeout = function(){
            self.now += 1000;
            mytimeout = $timeout($scope.onTimeout,1000);
        };
        var mytimeout = $timeout($scope.onTimeout,1000);
        
        self.getTimeRemaining = function(timeEnd, timeStart) {
            var remaining = (timeEnd - timeStart) / 1000;
            
            var remainingS = self.formatNumber(Math.floor(remaining) % 60);
            var remainingM = self.formatNumber(Math.floor(remaining/60) % 60);
            var remainingH = self.formatNumber(Math.floor(remaining/3600));
            
            return remainingH+":"+remainingM+":"+remainingS;
        };
        
        self.formatNumber = function(number) { return ("0" + number).slice(-2); };
        
        $scope.setOrder = function(name) {
            if(self.orderProp == name) {
                self.orderReverse = !self.orderReverse;
            } else {
                self.orderReverse = false;
                self.orderProp = name;    
            }
        };
    }
  });