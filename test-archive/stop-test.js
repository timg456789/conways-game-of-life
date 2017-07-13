var test = require('tape');
var world = require('../world');
var CellHash = require('../cell-hash');

test('run until duplicate encountered', function(t) {
    t.plan(1);

    var cells = [
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,1,1,1,0,0,0],
        [0,0,0,0,1,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0]
    ];

    var cellHash = new CellHash();
    var duplicate = cellHash.getDuplicate(cells);
    while(duplicate.length === 0) {
        cells = world.newDay(cells);
        cellHash.addHash(cells);
        duplicate = cellHash.getDuplicate(cells);
    }

    var ct = cellHash.getCopyOfHashes().length;
    t.equal(11, ct, 'byte iterates eleven times');
});