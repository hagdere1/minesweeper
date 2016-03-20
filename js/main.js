var View = require('./view.js');
var Game = require('./game.js');
var Board = require('./board.js');

$l(function () {
  var board = new Board(9);
  var game = new Game(board);
  var view = new View(game, $l('.minesweeper'));
  view.drawGrid();
});
