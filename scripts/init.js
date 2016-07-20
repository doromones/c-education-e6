"use strict";

$(function(){
    window.DEBUG = true;

    var slotMachinesCount, casinoMoney;
    if (window.DEBUG){
        slotMachinesCount = 5;
        casinoMoney = 513;
    }

    while(!slotMachinesCount){slotMachinesCount = retOnlyIntGteZero(prompt('Сколько в казино автоматов?', '5'))}
    while(!casinoMoney){casinoMoney = retOnlyIntGteZero(prompt('Сколько в казино Денег?', '513'))}

    var $slotMachines = $('#slotMachines');

    window.casino = new Casino(slotMachinesCount, casinoMoney);

    (function init(){
        casino.getSlotMachinesList().forEach(function(machine, index){
            $slotMachines.append(buildMachineRow(machine, index));
            console.log(index);
        })
    })();

    function buildMachineRow(machine, index) {
        var machineBank = machine.getBankData();
        var text = 'Машина #' + (index+1) + ' Денег Банка: ' + machineBank.money + ' Внесено: ' + machineBank.putedMoney;
        var $li = $('<div>').addClass('list-group-item');
        $li.append($('<a>').attr({href: '#'}).text(text).click(function(e){e.preventDefault()}));
        return $li;
    }
    function retOnlyIntGteZero( variable ){
        variable = Number(variable);
        return (!isNaN(variable) || variable > 0) ? variable : null;
    }
});


// var casino = new Casino(5, 100);
// console.group('casino init');
// console.log(casino);
// console.log(casino.getSlotMachinesCount());
// console.log(casino.printBank());
//
// var machine = casino.getSlotMachine(0);
// // machine.putMoney(15);
// console.log(machine.getBankData());
// // machine.play(5);
// console.groupEnd();
