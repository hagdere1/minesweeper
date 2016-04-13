var View = require('./view.js');
var Game = require('./game.js');
var Board = require('./board.js');

$l(function () {
  var game = new Game(9);
  var view = new View(game, $l('.minesweeper'));
  game.board.populate();
  view.drawGrid();
});
