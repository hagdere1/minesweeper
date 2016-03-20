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
  for (var row = 0; row < this.GRIDLENGTH; row++) {
    for (var col = 0; col < this.GRIDLENGTH; col++) {
      if (!(this.grid[row][col] instanceof "Tile")) {
        this.grid[row][col] = new Tile(false);
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

    if (!(this.grid[position[0]][position[1]] instanceof "Tile")) {
      this.grid[position[0]][position[1]] = new Tile(true);
    }
    else {
      while (this.grid[position[0]][position[1]] instanceof "Tile") {
        position = this.getBombLocation();
      }
      this.grid[position[0]][position[1]] = new Tile(true);
    }
  }
};

module.exports = Board;
