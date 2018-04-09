angular.
    module('range', ['history']).
    filter('range', function(history) {
       return function(input, total) {
           total = parseInt(total);
           for(var i=0; i<total; i++) {
               input.push(i);
           }
           return input;
       };
    });
