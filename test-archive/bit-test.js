var test = require('tape');
var world = require('../world');

test('bit', function(t) {
    t.plan(1);

    var cells = [
        [0,0,0],
        [1,1,1],
        [0,0,0]
    ];

    var newCells = world.newDay(cells);

    var expectedCells = [
        [0,1,0],
        [0,1,0],
        [0,1,0]
    ];

    t.equal(JSON.stringify(newCells), JSON.stringify(expectedCells));
});