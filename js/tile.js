var Tile = function (pos, isBomb, board) {
  this.bomb = isBomb;
  this.revealed = false;
  this.flagged = false;
  this.pos = pos;
  this.board = board;
  this.directions = [[0, 1], [1, 1], [1, 0], [1, -1],
                    [0, -1], [-1, -1], [-1, 0], [-1, 1]];
};

Tile.prototype.flag = function () {
  this.flagged = true;
};

Tile.prototype.reveal = function () {
  if (this.bomb) {
    alert("You blew up!");
    window.location.reload();
  }
  this.revealed = true;
};

Tile.prototype.neighborBombCount = function () {
  var count = 0;
  this.neighbors().forEach(function (neighbor) {
    if (neighbor.bomb) {
      count += 1;
    }
  });
  return count;
};

Tile.prototype.neighborPositions = function () {
  var positions = [];
  this.directions.forEach(function (dir) {
    if ((dir[0] + this.pos[0] >= 0) &&
       (dir[0] + this.pos[0] < this.board.GRIDLENGTH) &&
       (dir[1] + this.pos[1] >= 0) &&
       (dir[1] + this.pos[1] < this.board.GRIDLENGTH)) {
         positions.push([dir[0] + this.pos[0], dir[1] + this.pos[1]]);
       }
  }.bind(this));

  return positions;
};

Tile.prototype.neighbors = function () {
  this.neighbors = [];
  this.neighborPositions().forEach(function (pos) {
    this.neighbors.push(this.board.grid[pos[0]][pos[1]]);
  }.bind(this));

  return this.neighbors;
};

module.exports = Tile;
