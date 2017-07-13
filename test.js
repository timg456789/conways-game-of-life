var test = require('tape');
var world = require('./world');
var CellHash = require('./cell-hash');

test('run until duplicate encountered', function(t) {
    t.plan(1);

    var cells = [
        /*[0,0,0,0,0,    0,0,0,0,0,0,0,0,0,    0,0,0,0,0],
        [0,0,0,0,0,    0,0,0,0,0,0,0,0,0,    0,0,0,0,0],
        [0,0,0,0,0,    0,0,0,0,0,0,0,0,0,    0,0,0,0,0],
        [0,0,0,0,0,    0,0,0,0,0,0,0,0,0,    0,0,0,0,0],
        [0,0,0,0,0,    0,0,0,0,0,0,0,0,0,    0,0,0,0,0],

         // really interesting here.
         // if I make the board bigger, I get less hashes.
         // 105 and 131 right now.
         // remove the two rows above and it drops to 105.
         // so far increasing the board size helped after adding randomness.
         // what about throttling the rate of growth.
         // the limits will kill off outliers,
         // but allow others to grow.
        1                                            19
        [0,0,0,0,0,    0,0,0,0,0,0,0,0,0,    0,0,0,0,0],    24
        [0,0,0,0,0,    0,0,0,0,0,0,0,0,0,    0,0,0,0,0],*///23
        [0,0,0,0,0,    0,0,0,0,0,0,0,0,0,    0,0,0,0,0],  //22
        [0,0,0,0,0,    0,0,0,0,0,0,0,0,0,    0,0,0,0,0],
        [0,0,0,0,0,    0,0,0,1,1,1,0,0,0,    0,0,0,0,0],
        [0,0,0,0,0,    0,0,0,0,1,0,0,0,0,    0,0,0,0,0],
        [0,0,0,0,0,    0,0,0,0,0,0,0,0,0,    0,0,0,0,0],
        [0,0,0,0,0,    0,0,0,0,0,0,0,0,0,    0,0,0,0,0],
        [0,0,0,0,0,    0,0,0,0,0,0,0,0,0,    0,0,0,0,0],
        [0,0,0,0,0,    0,0,0,0,0,0,0,0,0,    0,0,0,0,0],
        [0,0,0,0,0,    0,0,0,0,0,0,0,0,0,    0,0,0,0,0],
        [0,0,0,0,0,    0,0,0,0,0,0,0,0,0,    0,0,0,0,0],
        [0,0,0,0,0,    0,0,0,0,0,0,0,0,0,    0,0,0,0,0],
        [0,0,0,0,0,    0,0,0,0,0,0,0,0,0,    0,0,0,0,0],
        [0,0,0,0,0,    0,0,0,0,0,0,0,0,0,    0,0,0,0,0],
        [0,0,0,0,0,    0,0,0,0,0,0,0,0,0,    0,0,0,0,0],
        [0,0,0,0,0,    0,0,0,0,0,0,0,0,0,    0,0,0,0,0],
        [0,0,0,0,0,    0,0,0,0,0,0,0,0,0,    0,0,0,0,0],
        [0,0,0,0,0,    0,0,0,0,0,0,0,0,0,    0,0,0,0,0],
        [0,0,0,0,0,    0,0,0,0,0,0,0,0,0,    0,0,0,0,0],
        [0,0,0,0,0,    0,0,0,0,0,0,0,0,0,    0,0,0,0,0],
        [0,0,0,0,0,    0,0,0,0,0,0,0,0,0,    0,0,0,0,0],
        [0,0,0,0,0,    0,0,0,0,0,0,0,0,0,    0,0,0,0,0],
        [0,0,0,0,0,    0,0,0,0,0,0,0,0,0,    0,0,0,0,0]     //1
    ];

    sprinkleLife(cells, 104);

    t.pass();
});


function sprinkleLife(cells, thresh1) {

    console.log('sprinkling: ' + thresh1);

    for (var row = 0; row < cells.length; row++) {
        for (var col = 0; col < cells[row].length; col++) {
            cells[row][col] = 1;
            var cellHash = new CellHash();
            var cellsBefore = cells.slice();

            cells = runUntilDayRepeats(cellHash, cells);

            if (cellHash.getCopyOfHashes().length > thresh1) {
                console.log('hash count: ' + cellHash.getCopyOfHashes().length + '=========================');
                console.log(cells);

                //sprinkleLife(cells, 2);
            }

        }
    }

    return cells;
}

function runUntilDayRepeats(cellHash, cells) {

    var duplicate = cellHash.getDuplicate(cells);

    while(duplicate.length === 0) {
        cells = world.newDay(cells);
        cellHash.addHash(cells);
        duplicate = cellHash.getDuplicate(cells);
    }

    return cells;
}



/*
 console.log(cellsBefore);
 cellHash = new CellHash();
 duplicate = cellHash.getDuplicate(cellsBefore);
 while(duplicate.length === 0) {
 cellsBefore = world.newDay(cellsBefore);
 cellHash.addHash(cellsBefore);
 duplicate = cellHash.getDuplicate(cellsBefore);
 console.log('replay: ' + cellHash.getCopyOfHashes().length);
 console.log(cellsBefore);
 }*/