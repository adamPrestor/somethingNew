angular.module('history', [])
    .service('history', function () {
        var property = [];
        var iterator = 0;

        return {
            getProperty:function () {
                return property;
            },
            setProperty:function (value) {
                property = value;
            },
            getIterator:function() {
                return iterator;
            },
            incrementIterator: function() {
                return ++iterator;
            },
            formatNumber: function(number) {
                return ("0" + number).slice(-2);
            }
        };
    });