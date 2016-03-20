var Tile = function (bomb) {
  this.bomb = bomb;
  this.revealed = false;
  this.flagged = false;
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
