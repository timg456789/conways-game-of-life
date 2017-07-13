function CellHash() {
    var hashes = [];

    this.getCopyOfHashes = function() {
        return hashes.slice();
    }

    this.getDuplicate = function () {
        hashes.sort();

        for (var ct = 0; ct < hashes.length; ct++) {
            if (hashes[ct] === hashes[ct+1]) {
                return hashes[ct];
            }
        }

        return '';
    };

    this.addHash = function (cells) {
        var hashLibrary = require('hash.js');
        var hasher = hashLibrary.sha256();
        var serial = JSON.stringify(cells);
        var hash = hasher
            .update(serial)
            .digest('hex');
        hashes.push(hash);
    };

}

module.exports = CellHash;