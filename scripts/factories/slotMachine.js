"use strict";

app.service('slotMachine', function () {
    return function (money) {
        money = Number(money);

        if (isNaN(money) || money <= 0) {
            throw '[SlotMachine] money must be greater 0';
        }

        var putedMoney = 0;

        this.putMoney = function (money) {
            if (isNaN(money) || money <= 0) {
                throw '[SlotMachine] putMoney must be greater 0';
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
});