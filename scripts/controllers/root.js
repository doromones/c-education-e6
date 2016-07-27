"use strict";

app.controller('RootController', [
    '$scope',
    '$log',
    'Casino',
    function ($scope, $log, Casino) {
        window.RootController = $scope;
        window.DEBUG = true;

        var slotMachinesCount, casinoMoney;
        if (window.DEBUG) {
            slotMachinesCount = 5;
            casinoMoney = 513;
        }

        while (!slotMachinesCount) {
            slotMachinesCount = retOnlyIntGteZero(prompt('Сколько в казино автоматов?', 5))
        }
        while (!casinoMoney) {
            casinoMoney = retOnlyIntGteZero(prompt('Сколько в казино Денег?', 513))
        }

        $scope.casino = Casino.init(slotMachinesCount, casinoMoney);

        $scope.selectSlotMachine = function(machine){
            $scope.selectedMachine = machine;
        };

        $scope.play = function(rate) {
            $scope.result = $scope.selectedMachine.play(rate);
        };

        $scope.playResultCallback = function(){
            var res = $scope.result;
            if (res.win){
                if (res.jackpot) {
                    alert('!!!JACKPOT!!!')
                } else {
                    alert('Вы поставили ' +res.playSum+ ' и выиграли ' + res.money)
                }
            } else {
                alert('You Lose :(');
            }
        };

        function retOnlyIntGteZero (value){
            value = Number(value);
            return isNaN(value) || value <= 0 ? null : value
        }

        if (window.DEBUG) {
            $scope.selectSlotMachine($scope.casino.getSlotMachine(0));
        }
    }
]);