var Game = function (board) {
  this.board = board;
};

Game.prototype.isWon = function () {
  var hiddenTileCount = 0;
  for (var row = 0; row < this.board.grid.length; row++) {
    for (var col = 0; col < this.board.grid.length; col++) {
      if (!(this.board.grid[row][col].revealed)) {
        hiddenTileCount += 1;
      }
    }
  }
  if (hiddenTileCount === this.board.NUMBOMBS) {
    return true;
  }
  else {
    return false;
  }
};

Game.prototype.isKilled = function (tile) {
  if (tile.bomb) {
    return true;
  }
  else {
    return false;
  }
};

module.exports = Game;
