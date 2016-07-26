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

            $scope.$watch('number', function(number){
                if (number) {
                    setNumber(number);
                } else {
                    rotateAll();
                }
            });

            function setNumber(number, index){
                index = index || 0;
                if (index > 2) {
                    rotIntervalIds = [];
                    return;
                }

                setTimeout(function(){
                    clearInterval(rotIntervalIds[index]);
                    setPosition(angular.element($rotators[index]), String(number)[index]);
                    setNumber(number, index + 1)
                }, 2000);
            }

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