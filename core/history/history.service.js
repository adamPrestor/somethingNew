angular.module('history', [])
    .service('history', function () {
        //here is saved everything we need for history table to work
        var exchangeHistory = (temp = JSON.parse(localStorage.getItem("history"))) == null ? [] : temp;
        var order = {
            prop: 'expirationTime',
            reverse: false
        };

        return {
            getExchangeHistory:function () {
                return exchangeHistory;
            },
            setExchangeHistory:function (value) {
                exchangeHistory = value;
                localStorage.setItem("history", angular.toJson(exchangeHistory));
            },
            getOrderProp: function () {
                return order.prop;
            },
            setOrderProp: function (value) {
                order.prop = value;
            },
            getOrderReverse: function () {
                return order.reverse;
            },
            setOrderReverse: function (value) {
                order.reverse = value;
            },
            getOrder: function () {
                return order;
            },
            setOrder: function (property, ascend) {
                order.prop = property;
                order.reverse = ascend;
            }
        };
    });