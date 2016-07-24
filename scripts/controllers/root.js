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
            slotMachinesCount = retOnlyIntGteZero(prompt('Сколько в казино автоматов?', slotMachinesCount))
        }
        while (!casinoMoney) {
            casinoMoney = retOnlyIntGteZero(prompt('Сколько в казино Денег?', casinoMoney))
        }

        $scope.casino = Casino.init(slotMachinesCount, casinoMoney);

        $scope.destroySlotMachine = function($index){
            $scope.casino.destroySlotMachine($index);
        };
    }
]);