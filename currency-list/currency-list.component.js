angular.
  module('currencyList').
  component('currencyList', {
    templateUrl: 'currency-list/currency-list.template.html',
    controller: function CurrencyListController($scope,$http,history) {
      var self = this;
      self.selectedCurr;
      
      $http.get('currencies/currencies.json').then(function(response) {
        self.currencies = response.data;
        self.selectedCurr = response.data[0];
      });
      
      self.exchangePrice = 0.00;
      self.exchangeAmmount = 1;
      self.iterator = history.getIterator();
      self.timeOut = {
        hour: 23,
        minute: 59,
        second: 59
      };
      self.history = history.getProperty();
      
      $scope.onSubmit = function () {
        //prepare a limited exchange
        var temp = {};
        temp.inputValue = self.exchangePrice * self.selectedCurr.value;
        temp.outputValue = self.exchangeAmmount;
        temp.experationTime = Date.now()+((self.timeOut.hour*3600+self.timeOut.minute*60+self.timeOut.second)*1000);
        temp.ID = self.iterator;
        
        //save the new limited exchange
        self.history.push(temp);
        history.setProperty(self.history);
        
        //send a msg, that it was completed fine
        
        //reset values, like nothing happen
        self.iterator = history.incrementIterator();
        self.exchangeInput = 0.00;
        self.exchangeOutput = 1;
        self.timeOut = {
          hour: 23,
          minute: 59,
          second: 59
        };
      };
      
    }
  });