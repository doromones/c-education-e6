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
            var $rotators = $element.find('.rotator');
            var rotIntervalIds = [];

            window.Rotators = $scope;

            // var $first_wheel = angular.element($rotators[0]);
            // var $second_wheel = angular.element($rotators[1]);
            // var $third_wheel = angular.element($rotators[2]);

            // var $first_wheel_id = startRotating($first_wheel, 1000);
            // var $second_wheel_id = startRotating($second_wheel, 1500);
            // var $third_wheel_id = startRotating($third_wheel, 2000);

            rotateAll();

            function rotateAll(){
                angular.forEach($rotators, function(el, index){
                    var speed =  index*200 + 300;
                    rotIntervalIds.push(startRotating(angular.element(el), speed));
                });
            }

            function stopRotateAll(){
                rotIntervalIds.forEach(function(id){clearInterval(id);});
                rotIntervalIds = [];
            }

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
                var increment = $wheel.attr('data-state');
                return setInterval(function () {
                    increment++;
                    setPosition($wheel, increment);
                }, time || 1000);
            }
        }
    }
});