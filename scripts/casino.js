"use strict";

function SlotMachine(money) {
    money = Number(money);
    var putedMoney = 0;

    this.putMoney = function (money) {
        if (isNaN(money) || money <= 0) {
            throw '[SlotMachine] Start money must be greater 0';
        } else {
            putedMoney += money;
        }
    };

    this.getWinnerMoney = function () {
        var money = putedMoney;
        putedMoney = 0;
        return money;
    };

    this.getBankData = function () {
        return {money: money, putedMoney: putedMoney};
    };

    this.play = function (playSum) {
        if (money === 0) {
            throw '[SlotMachine] I\'m sorry, I empty. Select another machine.'
        }
        if (putedMoney === 0) {
            throw '[SlotMachine] I\'m sorry, You empty. Please fill the money.'
        }
        if (isNaN(playSum) || playSum <= 0) {
            throw '[SlotMachine] Play money must be greater 0';
        }
        if (playSum > putedMoney) {
            throw '[SlotMachine] Play money must be greater then putted money';
        }

        putedMoney -= playSum;
        money += playSum;

        var number = Math.round(Math.random() * 1000);
        console.log('You number is %i', number);

        var play_obj = {
            win: false,
            money: 0,
            jackpot: false,
            playSum: playSum,
            maxNumbers: 0,
            number: number
        };
        if (number === 777) {

            putedMoney += money;
            money = 0;
            play_obj.win = true;
            play_obj.jackpot = true;
            play_obj.money = putedMoney;
        } else {
            var result = {};
            String(number).split('').forEach(function (value) {
                result[value] === undefined ? result[value] = 1 : (result[value]++);
            });

            var maxNumbers = Object.values(result).sort(function (a, b) {
                if (a < b) return 1
            })[0];
            play_obj.maxNumbers = maxNumbers;

            if (maxNumbers === 2 || maxNumbers === 3) {
                var winnerSum = playSum * ( maxNumbers === 2 ? 2 : 5 );
                winnerSum = winnerSum <= money ? winnerSum : money;
                money -= winnerSum;
                putedMoney += winnerSum;
                play_obj.win = true;
                play_obj.money = winnerSum
            }

            if (play_obj.win) {
                if (play_obj.jackpot) {
                    console.log('!!! JACKPOT !!!')
                } else {
                    console.log('Mathed %i', play_obj.maxNumbers)
                }
                console.log('You win %i; You put to play %i', play_obj.money, play_obj.playSum);
            } else {
                console.log('You lose :(')
            }
        }
    };

    return {
        machine: this,
        getMoney: function () {
            var _money = money;
            money = 0;
            return _money;
        },
        addMoney: function (_money) {
            _money = Number(_money);
            if (isNaN(_money) || _money <= 0) {
                throw '[SlotMachine] Money must be greater 0';
            }
            money += _money;
        }
    };
}

function Casino(slotMachinesCount, money) {
    var slotMachines = [];

    slotMachinesCount = Number(slotMachinesCount);
    if (isNaN(slotMachinesCount) || slotMachinesCount <= 0) {
        throw '[Casino] Slot Machines count must be greater 0';
    }

    money = Number(money);
    if (isNaN(money) || money <= 0) {
        throw '[Casino] Start money must be greater 0';
    }

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

    (function () {
        var mainMoney = Math.round(money / slotMachinesCount);
        var remainderOfDivision = money % slotMachinesCount;
        for (var i = 0; i < slotMachinesCount; i++) {
            slotMachines.push(new SlotMachine(i === 0 ? (mainMoney + remainderOfDivision) : mainMoney));
        }
    })();
}
