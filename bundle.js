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
	  view.drawGrid();
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

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
	    var clickedTile = this.game.board.grid[x][y];
	    clickedTile.reveal();

	    if (!clickedTile.bomb && clickedTile.neighborBombCount() > 0) {
	      $l(event.target).html(clickedTile.neighborBombCount());
	    }

	    $lDiv = $l('div');
	    for (var row = 0; row < this.gridLength; row++) {
	      for (var col = 0; col < this.gridLength; col++) {
	        var tile = this.game.board.grid[row][col];
	        if (tile.revealed) {
	          var position = (row * this.gridLength) + col;
	          var $lRevealedTile = $l($lDiv.elements[position]);
	          $lRevealedTile.removeClass('hidden');
	          $lRevealedTile.addClass('revealed');

	          if (!tile.bomb && tile.neighborBombCount() > 0) {
	            $lRevealedTile.html(tile.neighborBombCount());
	          }
	        }
	      }
	    }

	    this.game.board.isWon();

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
	  this.NUMBOMBS = 20;
	  this.grid = new Array(gridLength);

	  for (var i = 0; i < gridLength; i++) {
	    this.grid[i] = new Array(gridLength);
	  }
	};

	Board.prototype.populate = function () {
	  this.plantBombs();

	  for (var row = 0; row < this.GRIDLENGTH; row++) {
	    for (var col = 0; col < this.GRIDLENGTH; col++) {
	      if (!(this.grid[row][col] instanceof Tile)) {
	        this.grid[row][col] = new Tile([row, col], false, this);
	      }
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
	    var x = position[0];
	    var y = position[1];

	    while (this.grid[x][y] instanceof Tile) {
	      position = this.getBombLocation();
	      x = position[0];
	      y = position[1];
	    }

	    this.grid[x][y] = new Tile([x, y], true, this);
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
	    alert('You win! Play again?');
	    window.location.reload();
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
	  else {
	    this.revealed = true;
	    if (this.neighborBombCount() === 0) {
	      this.getNeighbors().forEach(function (neighbor) {
	        if (!neighbor.revealed && !neighbor.bomb) {
	          neighbor.reveal();
	        }
	      });
	    }
	  }
	};

	Tile.prototype.neighborBombCount = function () {
	  var count = 0;
	  this.getNeighbors().forEach(function (neighbor) {
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

	Tile.prototype.getNeighbors = function () {
	  var neighbors = [];
	  this.neighborPositions().forEach(function (pos) {
	    neighbors.push(this.board.grid[pos[0]][pos[1]]);
	  }.bind(this));

	  return neighbors;
	};

	module.exports = Tile;


/***/ }
/******/ ]);