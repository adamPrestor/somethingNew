angular.
  module('exchangePage').
  component('exchangePage', {
    templateUrl: 'exchange-page/exchange-page.template.html',
    controller: function CurrencyListController($scope,$http,history,commonLogic) {
      var self = this;
      self.selectedCurr;
      
      $http.get('currencies/currencies.json').then(function(response) {
        self.currencies = response.data;
        self.selectedCurr = response.data[0];
      });
      
      self.exchangePrice = 0.00;
      self.exchangeAmmount = 1;
      self.iterator = commonLogic.getIterator();
      self.timeOut = {
        hour: 23,
        minute: 59,
        second: 59
      };
      self.history = history.getExchangeHistory();
      
      $scope.onSubmit = function () {
        //prepare a limited exchange
        var temp = {};
        temp.exchangePrice = self.exchangePrice * self.selectedCurr.value;
        temp.exchangeAmmount = self.exchangeAmmount;
        temp.expirationTime = Date.now()+((self.timeOut.hour*3600+self.timeOut.minute*60+self.timeOut.second)*1000);
        temp.ID = self.iterator;
        
        //save the new limited exchange
        self.history.push(temp);
        history.setExchangeHistory(self.history);
        
        //assume it came through correctly - no error handling
        alert("Submited successfully");
        
        //reset values, like nothing happen
        self.iterator = commonLogic.incrementIterator();
        self.exchangePrice = 0.00;
        self.exchangeAmmount = 1;
        self.timeOut = {
          hour: 23,
          minute: 59,
          second: 59
        };
      };
      
    }
  });