angular.module('commonLogic', [])
    .service('commonLogic', function () {
        var iterator = (temp = localStorage.getItem("iterator")) == null ? 0 : temp;
        
        return {
            getIterator:function() {
                return iterator;
            },
            incrementIterator: function() {
                iterator++;
                localStorage.setItem("iterator", iterator);
                return iterator;
            },
            formatNumber: function(number) {
                return ("0" + number).slice(-2);
            }
        };
    });