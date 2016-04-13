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

	  $lElement.on('mousedown', function (event) {
	    var pos = $l(event.target).attr('pos').split(',');
	    var x = parseInt(pos[0]);
	    var y = parseInt(pos[1]);
	    var clickedTile = this.game.board.grid[x][y];

	    // Left click
	    if (event.button === 0) {
	      $l(event.target).empty();
	      if (this.game.isKilled(clickedTile)) {
	        this.exposeBombs();
	        $l('section').append('<p>You Lose!</p>');
	        $l('p').addClass('lose-text');
	        $l('section').append('<button>Play Again</button>');
	      }
	      else {
	        clickedTile.reveal();
	        $l(event.target).removeClass('hidden');
	        $l(event.target).addClass('revealed');
	        if (!clickedTile.bomb && clickedTile.neighborBombCount() > 0) {
	          $l(event.target).html(clickedTile.neighborBombCount());
	        }

	        this.clearAdjacentTiles();
	        if (this.game.isWon()) {
	          this.exposeBombs();
	          $l('section').append('<p>You Win!</p>');
	          $l('p').addClass('win-text');
	          $l('section').append('<button>Play Again</button>');
	        }
	      }
	    }
	    // Right click
	    else {
	      if (event.button === 2 && $l(event.target).attr('class') === 'hidden') {
	        this.toggleFlag(event);
	      }
	    }

	    $l('button').on('click', function () {
	      window.location.reload();
	    });
	  }.bind(this));
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	var Game = function (board) {
	  this.board = board;
	};

	Game.prototype.isWon = function () {
	  var hiddenTileCount = 0;
	  for (var row = 0; row < this.board.grid.length; row++) {
	    for (var col = 0; col < this.board.grid.length; col++) {
	      if (!(this.board.grid[row][col].revealed)) {
	        hiddenTileCount += 1;
	      }
	    }
	  }
	  if (hiddenTileCount === this.board.NUMBOMBS) {
	    return true;
	  }
	  else {
	    return false;
	  }
	};

	Game.prototype.isKilled = function (tile) {
	  if (tile.bomb) {
	    return true;
	  }
	  else {
	    return false;
	  }
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

	module.exports = Board;


/***/ },
/* 4 */
/***/ function(module, exports) {

	var Tile = function (pos, isBomb, board) {
	  this.bomb = isBomb;
	  this.revealed = false;
	  this.pos = pos;
	  this.board = board;
	  this.directions = [[0, 1], [1, 1], [1, 0], [1, -1],
	                    [0, -1], [-1, -1], [-1, 0], [-1, 1]];
	};

	Tile.prototype.reveal = function () {
	  if (!(this.bomb)) {
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