var View = function (game, $lElement) {
  this.game = game;
  this.$lElement = $lElement;
  this.gridLength = this.game.board.GRIDLENGTH;

  $lElement.on('mousedown', function (event) {
    var pos = $l(event.target).attr('pos').split(',');
    var x = parseInt(pos[0]);
    var y = parseInt(pos[1]);
    var clickedTile = this.game.board.grid[x][y];

    // Left click
    if (event.button === 0) {
      $l(event.target).empty();
      if (this.game.board.isKilled(clickedTile)) {
        this.exposeBombs();
        alert('You lose!');
        window.location.reload();
      }
      else {
        clickedTile.reveal();
        $l(event.target).removeClass('hidden');
        $l(event.target).addClass('revealed');
        if (!clickedTile.bomb && clickedTile.neighborBombCount() > 0) {
          $l(event.target).html(clickedTile.neighborBombCount());
        }

        this.clearAdjacentTiles();
        if (this.game.board.isWon()) {
          this.exposeBombs();
          alert('You win!');
          window.location.reload();
        }
      }
    }
    // Right click
    else {
      if (event.button === 2 && $l(event.target).attr('class') === 'hidden') {
        $l(event.target).html('&#x2620;');
      }
    }
  }.bind(this));
};

View.prototype.drawGrid = function () {
  for (var row = 0; row < this.gridLength; row++) {
    for (var col = 0; col < this.gridLength; col++) {
      var $lDiv = $l('<div>');
      var pos = row + ',' + col;
      $lDiv.addClass('hidden');
      $lDiv.attr('pos', pos);
      this.$lElement.append($lDiv);
    }
  }
};

View.prototype.clearAdjacentTiles = function () {
  $lDiv = $l('div');
  for (var row = 0; row < this.gridLength; row++) {
    for (var col = 0; col < this.gridLength; col++) {
      var tile = this.game.board.grid[row][col];
      var position = (row * this.gridLength) + col;
      var $lRevealedTile = $l($lDiv.elements[position]);

      if (tile.revealed && $lRevealedTile.html() !== '&#128163;') {
        $lRevealedTile.removeClass('hidden');
        $lRevealedTile.addClass('revealed');

        if (!tile.bomb && tile.neighborBombCount() > 0) {
          $lRevealedTile.html(tile.neighborBombCount());
        }
      }
    }
  }
};

View.prototype.exposeBombs = function () {
  $lDiv = $l('div');
  for (var row = 0; row < this.gridLength; row++) {
    for (var col = 0; col < this.gridLength; col++) {
      var tile = this.game.board.grid[row][col];
      var position = (row * this.gridLength) + col;
      var $lRevealedTile = $l($lDiv.elements[position]);

      if (tile.bomb) {
        $lRevealedTile.html('&#128163;');
      }
    }
  }

};

module.exports = View;
