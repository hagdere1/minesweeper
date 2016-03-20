var View = function (game, $lElement) {
  this.game = game;
  this.$lElement = $lElement;
  this.gridLength = this.game.board.GRIDLENGTH;

  this.startGame = function () {
    console.log('Starting game');
  };

  $lElement.on('click', function (event) {
    $l(event.target).removeClass('hidden');
    $l(event.target).addClass('revealed');

  });
};

View.prototype.drawGrid = function () {
  for (var row = 0; row < this.gridLength; row++) {
    for (var col = 0; col < this.gridLength; col++) {
      this.$lElement.append('<div>');
      $l('div').addClass('hidden');
    }
  }
};

View.prototype.revealBombs = function () {
  for (var row = 0; row < this.gridLength; row++) {
    for (var col = 0; col < this.gridLength; col++) {
      this.$lElement.append('<div>');
    }
  }
};

module.exports = View;
