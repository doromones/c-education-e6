"use strict";

app.controller('RootController', [
    '$scope',
    '$log',
    'Casino',
    function ($scope, $log, Casino) {
        window.RootController = $scope;
        window.DEBUG = false;

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

        function retOnlyIntGteZero (value){
            value = Number(value);
            return isNaN(value) || value <= 0 ? null : value
        }
    }
]);