var View = function (game, $lElement) {
  this.game = game;
  this.$lElement = $lElement;
  this.gridLength = this.game.board.GRIDLENGTH;

  $lElement.on('click', function (event) {
    $l(event.target).removeClass('hidden');
    $l(event.target).addClass('revealed');
    var pos = $l(event.target).attr('pos').split(',');
    var x = parseInt(pos[0]);
    var y = parseInt(pos[1]);
    var tile = this.game.board.grid[x][y];
    tile.reveal();
    this.game.board.isWon();
    // for (var row = 0; row < this.gridLength; row++) {
    //   for (var col = 0; col < this.gridLength; col++) {
    //     if (this.game.board.grid[row][col].revealed) {
    //
    //
    //
    //     }
    //   }
    // }
    if (!tile.bomb && tile.neighborBombCount() > 0) {
      $l(event.target).html(tile.neighborBombCount());
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

      // Testing
      if (this.game.board.grid[row][col].bomb) {
        $lDiv.addClass('bomb');
      }

      this.$lElement.append($lDiv);
    }
  }
};




module.exports = View;
