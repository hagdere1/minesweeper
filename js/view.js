var View = function (game, $lElement) {
  this.game = game;
  this.$lElement = $lElement;
  this.gridLength = this.game.board.GRIDLENGTH;

  $lElement.on('mousedown', function (event) {
    var pos = $l(event.target).attr('pos').split(',');
    var x = parseInt(pos[0]);
    var y = parseInt(pos[1]);
    var clickedTile = this.game.board.grid[x][y];

    if (event.button === 0) {
      this.handleLeftClick(event, clickedTile);
    }
    else {
      this.handleRightClick(event);
    }

    $l('button').on('click', function () {
      window.location.reload();
    }.bind(this));
  }.bind(this));
};

View.prototype.handleLeftClick = function (event, clickedTile) {
  $l(event.target).empty();
  if (this.game.isKilled(clickedTile)) {
    this.gameLost();
  }
  else {
    this.revealTile(clickedTile);
    this.clearAdjacentTiles();
    if (this.game.isWon()) {
      this.gameWon();
    }
  }
};

View.prototype.gameLost = function () {
  this.exposeBombs();
  $l('section').append('<p>You Lose!</p>');
  $l('p').addClass('lose-text');
  $l('section').append('<button>Play Again</button>');
};

View.prototype.gameWon = function () {
  this.exposeBombs();
  $l('section').append('<p>You Win!</p>');
  $l('p').addClass('win-text');
  $l('section').append('<button>Play Again</button>');
};

View.prototype.revealTile = function (tile) {
  tile.reveal();
  $l(event.target).removeClass('hidden');
  $l(event.target).addClass('revealed');
  if (!tile.bomb && tile.neighborBombCount() > 0) {
    $l(event.target).html(tile.neighborBombCount());
  }
};

View.prototype.handleRightClick = function (event) {
  if (event.button === 2 && $l(event.target).attr('class') === 'hidden') {
    this.toggleFlag(event);
  }
};

View.prototype.toggleFlag = function (event) {
  if ($l(event.target).html().length === 0) {
    $l(event.target).html('&#x2620;');
  }
  else {
    $l(event.target).empty();
  }
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
        $lRevealedTile.removeClass('hidden');
        $lRevealedTile.addClass('bomb');
      }
    }
  }
};

module.exports = View;
