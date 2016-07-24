"use strict";

app.service('Casino', function (slotMachine) {
    var slotMachines = [];
    this._slotMachine = slotMachine;

    function _getSlotMachine(index) {
        var machine = slotMachines[index];
        if (machine === undefined) {
            throw new Error('[Casino] slotMachine not found');
        }
        return machine;
    }

    function _deleteSlotMachine(index) {
        slotMachines.splice(index, 1);
    }

    /* отладочная фигня, закоментить*/
    this.getRawMachine = function (index) {
        return _getSlotMachine.call(this, index);
    };

    this.getSlotMachine = function (index) {
        var machine = _getSlotMachine(index)['machine'];
        return machine;
    };

    this.destroySlotMachine = function (index) {
        var machine = _getSlotMachine(index);
        var money = machine.getMoney();

        _deleteSlotMachine.call(this, index);
        var _length = this.getSlotMachinesCount();
        var mainMoney = Math.round(money / _length);
        var remainderOfDivision = money % _length;

        for (var i = 0; i < _length; i++) {
            var slotMachine = _getSlotMachine(i);
            slotMachine.addMoney(i === 0 ? (mainMoney + remainderOfDivision) : mainMoney);
        }
    };

    this.init = function (slotMachinesCount, money) {
        slotMachinesCount = Number(slotMachinesCount);
        if (isNaN(slotMachinesCount) || slotMachinesCount <= 0) {
            throw new Error('[Casino] Slot Machines count must be greater 0');
        }

        money = Number(money);
        if (isNaN(money) || money <= 0) {
            throw new Error('[Casino] Start money must be greater 0');
        }

        var mainMoney = Math.round(money / slotMachinesCount);
        var remainderOfDivision = money % slotMachinesCount;
        for (var i = 0; i < slotMachinesCount; i++) {
            slotMachines.push(new this._slotMachine( i === 0 ? (mainMoney + remainderOfDivision) : mainMoney));
        }
        return this;
    };

    // getters
    this.__defineGetter__('bank', function(){
        var result = 0;
        slotMachines.forEach(function (slotMachine) { result += slotMachine.machine.getBankData().money; });
        return result;
    });

    this.__defineGetter__('getSlotMachinesCount', function(){ return slotMachines.length; });

    this.__defineGetter__('getSlotMachinesList', function(){
        return slotMachines.map(function (slotMachine) { return slotMachine.machine; })
    })

});