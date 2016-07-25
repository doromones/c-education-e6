"use strict";
// https://codepen.io/doromones/pen/qNYYxP?editors=0110
app.directive('rotator', function () {
    return {
        restrict: 'AE',
        templateUrl: 'rotator.html',
        scope: {
            number: '='
        }
    }
});