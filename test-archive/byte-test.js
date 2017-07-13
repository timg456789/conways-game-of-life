var test = require('tape');
var world = require('../world');

test('byte', function(t) {
    t.plan(3);

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

    var ct = 0;
    for (ct; ct < 9; ct++) { // this works with 9
        cells = world.newDay(cells);
    }

    var expectedCellsA = [
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,1,1,1,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,1,0,0,0,0,0,1,0],
        [0,1,0,0,0,0,0,1,0],
        [0,1,0,0,0,0,0,1,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,1,1,1,0,0,0],
        [0,0,0,0,0,0,0,0,0]
    ];

    var actualJson = JSON.stringify(cells);
    var expectedJson = JSON.stringify(expectedCellsA);
    t.equal(actualJson, expectedJson, 'form 1');

    // blink
    cells = world.newDay(cells);
    ct++;

    var expectedCellsB = [
        [0,0,0,0,1,0,0,0,0],
        [0,0,0,0,1,0,0,0,0],
        [0,0,0,0,1,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [1,1,1,0,0,0,1,1,1],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0],
        [0,0,0,0,1,0,0,0,0],
        [0,0,0,0,1,0,0,0,0]
    ];

    var actualJsonB = JSON.stringify(cells);
    var expectedJsonB = JSON.stringify(expectedCellsB);
    t.equal(actualJsonB, expectedJsonB, 'form 2');
    t.equal(ct, 10, 'stop point');
});
