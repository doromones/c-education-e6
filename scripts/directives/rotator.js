"use strict";
// https://codepen.io/doromones/pen/qNYYxP?editors=0110
app.directive('rotator', function () {
    return {
        restrict: 'AE',
        templateUrl: 'rotator.html',
        scope: {
            result: '=',
            callback: '&'
        },
        controller: function ($scope, $element, $attrs) {
            var $rotators = $element.find('.rotator');
            $scope.rotIntervalIds = [];

            window.Rotators = $scope;

            $scope.$watch('result', function(result){
                if (result && result.number) {
                    setNumber(result.number);
                }
            }, true);

            function setNumber(number, index){
                index = index || 0;
                if (index > 2) {
                    $scope.rotIntervalIds = [];
                    if ($scope.callback) { setTimeout($scope.callback, 1000); }
                    return;
                }

                rotateAll();

                setTimeout(function(){
                    clearInterval($scope.rotIntervalIds[index]);
                    setPosition(angular.element($rotators[index]), String(number)[index]);
                    setNumber(number, index + 1)
                }, 2000);
            }

            function rotateAll(){
                if ($scope.rotIntervalIds.length){return false;}
                angular.forEach($rotators, function(el, index){
                    var speed =  index * 200 + 300;
                    $scope.rotIntervalIds.push(startRotating(angular.element(el), speed));
                });
            }

            function stopRotateAll(){
                $scope.rotIntervalIds.forEach(function(id){clearInterval(id);});
                $scope.rotIntervalIds = [];
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
                var interval_id = setInterval(function () {
                    increment++;
                    setPosition($wheel, increment);
                }, time || 5000);

                return interval_id;
            }
        }
    }
});