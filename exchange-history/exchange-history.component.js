angular.
  module('exchangeHistory').
  component('exchangeHistory', {
    templateUrl: 'exchange-history/exchange-history.template.html',
    controller: function ExchangeHistoryController($scope,$timeout,history,commonLogic) {
        var self = this;
        //internal variables
        self.exchangeHistory = history.getExchangeHistory();
        self.now = Date.now();
        self.orderProp = history.getOrderProp();
        self.orderReverse = history.getOrderReverse();
        
        //timer for countdown timer
        $scope.onTimeout = function(){
            self.now += 1000;
            mytimeout = $timeout($scope.onTimeout,1000);
        };
        var mytimeout = $timeout($scope.onTimeout,1000);
        
        
        self.getTimeRemaining = function(timeEnd, timeStart) {
            //remove if time has expired
            if(timeEnd < timeStart) {
                self.exchangeHistory = eliminateRecords();
                //save to base
                history.setExchangeHistory(self.exchangeHistory);
            }
            //correct the time
            var remaining = (timeEnd - timeStart) / 1000;
            //format the output
            var remainingS = commonLogic.formatNumber(Math.floor(remaining) % 60);
            var remainingM = commonLogic.formatNumber(Math.floor(remaining/60) % 60);
            var remainingH = commonLogic.formatNumber(Math.floor(remaining/3600));
            
            return remainingH+":"+remainingM+":"+remainingS;
        };
        
        //order settings - on header clicks
        $scope.setOrder = function(name) {
            if(self.orderProp == name) {
                self.orderReverse = !self.orderReverse;
                history.setOrderReverse(self.orderReverse);
            } else {
                self.orderProp = name;
                self.orderReverse = false;
                history.setOrder(self.orderProp, self.orderReverse);
            }
        };
        
        //set order icons
        $scope.getOrderIcon = function(name) {
            if(name == self.orderProp) {
                if(self.orderReverse)
                    return "fa fa-fw fa-sort-asc filter-selected";
                else
                    return "fa fa-fw fa-sort-desc filter-selected";
            } else {
                return "fa fa-fw fa-sort";
            }
        };
        
        //on button cancel handler
        $scope.cancelOrder = function(ID) {
            for(var i = 0; i<self.exchangeHistory.length; i++) {
                if(self.exchangeHistory[i].ID == ID) {
                    self.exchangeHistory.splice(i, 1);
                    //save to base
                    history.setExchangeHistory(self.exchangeHistory);
                    return;
                }
            }
        };
        
        //eliminate orders that expired
        function eliminateRecords() {
            var temp = [];
            for(var i = 0; i<self.exchangeHistory.length; i++) {
                if(self.exchangeHistory[i].expirationTime > self.now) {
                    temp.push(self.exchangeHistory[i]);
                }
            }
            return temp;
        }
    }
  });