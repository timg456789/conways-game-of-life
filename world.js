exports.DEAD = 0;
exports.ALIVE = 1;

exports.newDay = function (cells) {
    /*
     * The game only knows days and they occur instantly.
     * A cell can never affect another cell during a day.
     * A day should be considered like a transaction.
     * It's all or nothing back or forward.
     */
    var newCells = JSON.parse(JSON.stringify(cells));
    newDayForEachCell(cells, newCells);

    return newCells;
}

function newDayForEachCell(cells, newCells) {

    for (var ct = 0; ct < cells.length; ct++) {
        for (var ctIn = 0; ctIn < cells[ct].length; ctIn++) {
            iterate(cells, newCells, ct, ctIn);
        }
    }
}

function iterate(cells, newCells, ct, ctIn) {
    var cell = map(cells, ct, ctIn);
    var neighbors = countNeighbors(cell);

    if (neighbors <= 1 || neighbors >= 4) {
        newCells[ct][ctIn] = exports.DEAD;
    } else if (neighbors == 3) {
        newCells[ct][ctIn] = exports.ALIVE;
    }
}

function countNeighbors(cell) {
    var ct = 0;

    if(cell.topLeft === exports.ALIVE){
        ct++;
    };
    if(cell.topCenter === exports.ALIVE){
        ct++;
    };
    if(cell.topRight === exports.ALIVE){
        ct++;
    };

    if(cell.midLeft === exports.ALIVE){
        ct++;
    };
    if(cell.midRight === exports.ALIVE){
        ct++;
    };

    if(cell.botLeft === exports.ALIVE){
        ct++;
    };
    if(cell.botCenter === exports.ALIVE){
        ct++;
    };
    if(cell.botRight === exports.ALIVE){
        ct++;
    };

    return ct;
}

function map(cells, row, col) {
    var cell = {};

    if (row > 0 && col > 0) {
        cell.topLeft = cells[row-1][col-1];
    }

    if (row > 0) {
        cell.topCenter = cells[row-1][col];
    }

    if (row> 0 && col <= cells[0].length) {
        cell.topRight = cells[row-1][col+1];
    }

    if (col > 0) {
        cell.midLeft = cells[row][col-1];
    }

    cell.midRight = cells[row][col+1];

    if (row+1 < cells.length && col > 0) {
        cell.botLeft = cells[row+1][col-1];
    }

    if (row+1 < cells.length) {
        cell.botCenter = cells[row+1][col];
    }

    if(row+1 < cells.length && col <= cells[0].length) {
        cell.botRight = cells[row+1][col+1];
    }

    return cell;
}