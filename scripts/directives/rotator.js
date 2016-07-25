"use strict";

app.directive('rotator', function () {
    return {
        restrict: 'AE',
        templateUrl: 'rotator.html',
        scope: {
            number: '='
        }
    }
});