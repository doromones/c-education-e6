"use strict";

var casino = new Casino(5, 100);
console.group('casino init');
console.log(casino);
console.log(casino.getSlotMachinesCount());
console.log(casino.printBank());

var machine = casino.getSlotMachine(0);
// machine.putMoney(15);
console.log(machine.getBankData());
// machine.play(5);
console.groupEnd();
