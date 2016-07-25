"use strict";
// https://codepen.io/doromones/pen/qNYYxP?editors=0110
app.directive('rotator', function () {
    return {
        restrict: 'AE',
        templateUrl: 'rotator.html',
        scope: {
            number: '='
        },
        controller: function ($scope, $element, $attrs) {
            window.ELEMENT = $element;
            var $rotators = $element.find('.rotator');
            var $first_wheel = angular.element($rotators[0]);
            var $second_wheel = angular.element($rotators[1]);
            var $third_wheel = angular.element($rotators[2]);

            startRotating($first_wheel, 1000);
            startRotating($second_wheel, 1500);
            startRotating($third_wheel, 2000);

            function setPosition($wheel, position) {
                $wheel.css({
                    '-webkit-transform': 'rotateX(' + (position * -36) + 'deg)',
                    '-moz-transform': 'rotateX(' + (position * -36) + 'deg)',
                    '-o-transform': 'rotateX(' + (position * -36) + 'deg)',
                    'transform': 'rotateX(' + (position * -36) + 'deg)'
                });
                $wheel.attr('data-state', position % 10);
            }

            function startRotating($wheel, time) {
                var increment = 0;
                return setInterval(function () {
                    increment++;
                    setPosition($wheel, increment);
                }, time || 1000);
            }
        }
    }
});