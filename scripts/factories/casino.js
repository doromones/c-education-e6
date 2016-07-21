"use strict";

app.service('Casino', ['slotMachine', function (slotMachine) {
    var slotMachines = [];
    debugger
    function _getSlotMachine(index) {
        var machine = slotMachines[index];
        if (machine === undefined) {
            throw '[Casino] slotMachine not found';
        }
        return machine;
    }

    function _deleteSlotMachine(index) {
        slotMachines.splice(index, 1);
    }

    /* отладочная фигня, закоментить*/
    this.getRawMachine = function (index) {
        return _getSlotMachine(index);
    };

    this.getSlotMachinesCount = function () {
        return slotMachines.length;
    };

    this.getSlotMachinesList = function () {
        return slotMachines.map(function (slotMachine) {
            return slotMachine.machine;
        })
    };

    this.getSlotMachine = function (index) {
        var machine = _getSlotMachine(index)['machine'];
        return machine;
    };

    this.destroySlotMachine = function (index) {
        var machine = _getSlotMachine(index);
        var money = machine.getMoney();

        _deleteSlotMachine(index);
        var _length = this.getSlotMachinesCount();
        var mainMoney = Math.round(money / _length);
        var remainderOfDivision = money % _length;

        for (var i = 0; i < _length; i++) {
            var slotMachine = _getSlotMachine(i);
            slotMachine.addMoney(i === 0 ? (mainMoney + remainderOfDivision) : mainMoney);
        }
    };

    this.printBank = function () {
        var result = {};
        slotMachines.forEach(function (slotMachine, index) {
            console.log('in %i slotMachine %i money', index, slotMachine.machine.getBankData().money);
            result[index] = slotMachine.machine.getBankData().money;
        });
        return result;
    };

    this.init = function (slotMachinesCount, money) {
        slotMachinesCount = Number(slotMachinesCount);
        if (isNaN(slotMachinesCount) || slotMachinesCount <= 0) {
            throw '[Casino] Slot Machines count must be greater 0';
        }

        money = Number(money);
        if (isNaN(money) || money <= 0) {
            throw '[Casino] Start money must be greater 0';
        }

        var mainMoney = Math.round(money / slotMachinesCount);
        var remainderOfDivision = money % slotMachinesCount;
        for (var i = 0; i < slotMachinesCount; i++) {
            slotMachines.push(new SlotMachine(i === 0 ? (mainMoney + remainderOfDivision) : mainMoney));
        }
        return this;
    }
}]);