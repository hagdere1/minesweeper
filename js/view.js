var View = function (game, $lElement) {
  this.game = game;
  this.$lElement = $lElement;
  this.numTiles = this.game.board.GRIDLENGTH * this.game.board.GRIDLENGTH;

  this.startGame = function () {
    console.log('Starting game');
  };
};

View.prototype.drawGrid = function () {
  for (var i = 0; i < this.numTiles; i++) {
    this.$lElement.append('<div>');
  }
};

module.exports = View;
