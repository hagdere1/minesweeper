var Tile = require('./tile.js');

var Board = function (gridLength) {
  this.GRIDLENGTH = gridLength;
  this.NUMBOMBS = 10;
  this.grid = new Array(gridLength);

  for (var i = 0; i < gridLength; i++) {
    this.grid[i] = new Array(gridLength);
  }
};

Board.prototype.populate = function () {
  this.plantBombs();

  for (var row = 0; row < this.GRIDLENGTH; row++) {
    for (var col = 0; col < this.GRIDLENGTH; col++) {
      if (!(this.grid[row][col] instanceof Tile)) {
        this.grid[row][col] = new Tile([row, col], false, this);
      }
    }
  }
};

Board.prototype.getBombLocation = function () {
  var x = Math.floor(Math.random() * this.GRIDLENGTH);
  var y = Math.floor(Math.random() * this.GRIDLENGTH);
  return [x, y];
};

Board.prototype.plantBombs = function () {
  for (var i = 0; i < this.NUMBOMBS; i++) {
    var position = this.getBombLocation();
    var x = position[0];
    var y = position[1];

    while (this.grid[x][y] instanceof Tile) {
      position = this.getBombLocation();
      x = position[0];
      y = position[1];
    }

    this.grid[x][y] = new Tile([x, y], true, this);
  }
};

module.exports = Board;
