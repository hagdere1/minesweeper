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
	  game.board.populate();
	  game.board.plantBombs();
	  view.drawGrid();
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

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
	    var pos = $l(event.target).attr('pos').split(',');
	    var x = parseInt(pos[0]);
	    var y = parseInt(pos[1]);
	    this.game.board.grid[x][y].reveal();
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
	  for (var row = 0; row < this.GRIDLENGTH; row++) {
	    for (var col = 0; col < this.GRIDLENGTH; col++) {
	      this.grid[row][col] = new Tile([row, col], false, this);
	    }
	  }
	};

	Board.prototype.getBombLocation = function () {
	  var x = Math.floor(Math.random() * this.GRIDLENGTH);
	  var y = Math.floor(Math.random() * this.GRIDLENGTH);
	  return [x, y];
	};

	Board.prototype.plantBombs = function () {
	  for (var i = 0; i < this.NUMBOMBS; i++) {
	    var position = this.getBombLocation();
	    
	    if (this.grid[position[0]][position[1]].bomb === false) {
	      this.grid[position[0]][position[1]].bomb = true;
	    }
	    else {
	      while (this.grid[position[0]][position[1]]) {
	        position = this.getBombLocation();
	      }
	      this.grid[position[0]][position[1]].bomb = true;
	    }
	  }
	};

	Board.prototype.isWon = function () {
	  var hiddenTileCount = 0;
	  for (var row = 0; row < this.grid.length; row++) {
	    for (var col = 0; col < this.grid.length; col++) {
	      if (!(this.grid[row][col].revealed)) {
	        hiddenTileCount += 1;
	      }
	    }
	  }
	  if (hiddenTileCount === this.NUMBOMBS) {
	    return true;
	  }
	  else {
	    return false;
	  }
	};

	module.exports = Board;


/***/ },
/* 4 */
/***/ function(module, exports) {

	var Tile = function (pos, isBomb, board) {
	  this.bomb = isBomb;
	  this.revealed = false;
	  this.flagged = false;
	  this.pos = pos;
	  this.board = board;
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

	};

	Tile.prototype.neighbors = function () {

	};

	module.exports = Tile;


/***/ }
/******/ ]);