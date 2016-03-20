/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var View = __webpack_require__(1);
	var Game = __webpack_require__(2);
	var Board = __webpack_require__(3);

	$l(function () {
	  var board = new Board(9);
	  var game = new Game(board);
	  var view = new View(game, $l('.minesweeper'));
	  view.drawGrid();
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */
/***/ function(module, exports) {

	var Game = function (board) {
	  this.board = board;
	};

	module.exports = Game;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Tile = __webpack_require__(4);

	var Board = function (gridLength) {
	  this.GRIDLENGTH = gridLength;
	  this.NUMBOMBS = 10;
	  this.grid = new Array(gridLength);

	  for (var i = 0; i < gridLength; i++) {
	    this.grid[i] = new Array(gridLength);
	  }
	};

	Board.prototype.populate = function () {

	};

	Board.prototype.getBombLocation = function () {
	  var x = Math.floor(Math.random() * this.GRIDLENGTH);
	  var y = Math.floor(Math.random() * this.GRIDLENGTH);
	  return [x, y];
	};

	Board.prototype.plantBombs = function () {
	  for (var i = 0; i < this.NUMBOMBS; i++) {
	    var position = this.getBombLocation();

	    if (!(this.grid[position[0]][position[1]] instanceof "Tile")) {
	      this.grid[position[0]][position[1]] = new Tile(true);
	    }
	    else {
	      while (this.grid[position[0]][position[1]] instanceof "Tile") {
	        position = this.getBombLocation();
	      }
	      this.grid[position[0]][position[1]] = new Tile(true);
	    }
	  }
	};

	module.exports = Board;


/***/ },
/* 4 */
/***/ function(module, exports) {

	var Tile = function (bomb) {
	  this.bomb = bomb;
	  this.revealed = false;
	  this.flagged = false;
	};

	Tile.prototype.flag = function () {
	  
	};

	Tile.prototype.reveal = function () {

	};

	Tile.prototype.neighborBombCount = function () {

	};

	Tile.prototype.neighbors = function () {

	};

	module.exports = Tile;


/***/ }
/******/ ]);