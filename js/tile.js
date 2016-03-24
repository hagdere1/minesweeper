var Tile = function (pos, isBomb, board) {
  this.bomb = isBomb;
  this.revealed = false;
  this.flagged = false;
  this.pos = pos;
  this.board = board;
};

Tile.prototype.flag = function () {
  this.flagged = true;
};

Tile.prototype.reveal = function () {
  this.revealed = true;
};

Tile.prototype.neighborBombCount = function () {

};

Tile.prototype.neighbors = function () {

};

module.exports = Tile;
