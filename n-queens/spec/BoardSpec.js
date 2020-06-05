describe('Board', function() {
  require("backbone");

// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var row = this.rows()[rowIndex];
      var sum = row.reduce(function(sum, curr) {
        return sum + curr;
      }, 0);

      if (sum > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var rows = this.rows();
      var numRows = rows.length;

      for (var i = 0; i < numRows; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }

      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var col = [];
      var rows = this.rows();
      var numRows = rows.length;

      // Building cols.
      for (var rowIndex = 0; rowIndex < numRows; rowIndex++) {
        col.push(rows[rowIndex][colIndex]);
      }

      var sum = col.reduce(function(sum, curr) {
        return sum + curr;
      }, 0);

      if (sum > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var rows = this.rows();
      var numCols = rows.length;

      for (var i = 0; i < numCols; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }

      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var rows = this.rows();
      var numRows = rows.length;

      for (var j = 0; j < numRows; j++) {
        var diagonal = [];
        var row = j;
        var col = majorDiagonalColumnIndexAtFirstRow;
        for (var i = 0; i < numRows; i++) {
          if (row < numRows && col < numRows) {
            diagonal.push(rows[row][col]);
          }
          row++;
          col++;
        }

        var sum = diagonal.reduce(function(sum, curr) {
          return sum + curr;
        }, 0);

        if (sum > 1) {
          return true;
        }
      }

      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var numCols = this.rows().length;

      for (var j = 0; j < numCols; j++) {
        if (this.hasMajorDiagonalConflictAt(j)) {
          return true;
        }
      }

      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var rows = this.rows();
      var numRows = rows.length;

      for (var j = 0; j < numRows; j++) {
        var diagonal = [];
        var row = j;
        var col = minorDiagonalColumnIndexAtFirstRow;
        for (var i = 0; i < numRows; i++) {
          if (row < numRows && col >= 0) {
            diagonal.push(rows[row][col]);
          }
          row++;
          col--;
        }

        var sum = diagonal.reduce(function(sum, curr) {
          return sum + curr;
        }, 0);

        if (sum > 1) {
          return true;
        }
      }

      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var numCols = this.rows().length;

      for (var j = 0; j < numCols; j++) {
        if (this.hasMinorDiagonalConflictAt(j)) {
          return true;
        }
      }

      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());

// This file is a Backbone View.
// It's part of the board visualizer

(function() {

  BoardView = Backbone.View.extend({

    tagName: 'table',

    initialize: function() {
      this.model.on('change', this.render, this);
    },

    render: function() {
      var model = this.model;

      return this.$el.html(_(_.range(model.get('n'))).map(function(rowIndex) {
        return $('<tr class="row"/>').html(_(_.range(model.get('n'))).map(function(colIndex) {
          var $square = $('<td class="square"/>').on('click', function(e) {
            model.togglePiece(rowIndex, colIndex);
          }).addClass(['positive', 'negative'][(rowIndex + colIndex) % 2]);
          model.get(rowIndex)[colIndex] && $square.html('&#9813;');
          model.hasAnyQueenConflictsOn(rowIndex, colIndex) && $square.addClass('inConflict');
          return $square;
        }));
      }));
    }
  });

}());

/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



findNRooksSolution = function(n) {
  var findSolution = function(board, n) {
    if (n === 0) {
      return board.rows();
    } else {
      var possiblePlaces = findPossiblePlaces(board);
      return findSolutionHelp(board, possiblePlaces, n);
    }
  };

  var findSolutionHelp = function(board, possiblePlaces, n) {
    if (possiblePlaces.length === 0) {
      return false;
    } else {
      var newBoard = addRook(board, possiblePlaces[0]);
      return findSolution(newBoard, n - 1) ||
        findSolutionHelp(board, possiblePlaces.slice(1), n);
    }
  };

  var addRook = function(board, position) {
    var boardCopy = deepArrayCopy(board.rows());
    boardCopy = new Board(boardCopy);
    boardCopy.togglePiece(position[0], position[1]);
    return boardCopy;
  };

  var findPossiblePlaces = function(board) {
    var boardCopy = deepArrayCopy(board.rows());
    boardCopy = new Board(boardCopy);
    var possiblePlaces = [];

    for (var i = 0; i < board.rows().length; i++) {
      for (var j = 0; j < board.rows().length; j++) {
        if (board.rows()[i][j] === 0) {
          boardCopy.togglePiece(i, j);
          if (!boardCopy.hasAnyRooksConflicts()) {
            possiblePlaces.push([i, j]);
          }
          boardCopy.togglePiece(i, j);
        }
      }
    }

    return possiblePlaces;
  };

  var board = new Board({n: n});
  var solution = findSolution(board, n);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));

  return solution ? solution : (new Board({n: n})).rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
countNRooksSolutions = function(n) {
  var solutions = [];

  var findSolution = function(board, n) {
    if (n === 0) {
      var stringedSoln = JSON.stringify(board.rows());
      solutions.push(stringedSoln);
      return false;
    } else {
      var possiblePlaces = findPossiblePlaces(board);
      return findSolutionHelp(board, possiblePlaces, n);
    }
  };

  var findSolutionHelp = function(board, possiblePlaces, n) {
    if (possiblePlaces.length === 0) {
      return false;
    } else {
      var newBoard = addRook(board, possiblePlaces[0]);
      return findSolution(newBoard, n - 1) ||
        findSolutionHelp(board, possiblePlaces.slice(1), n);
    }
  };

  var addRook = function(board, position) {
    var boardCopy = deepArrayCopy(board.rows());
    boardCopy = new Board(boardCopy);
    boardCopy.togglePiece(position[0], position[1]);
    return boardCopy;
  };

  var findPossiblePlaces = function(board) {
    var boardCopy = deepArrayCopy(board.rows());
    boardCopy = new Board(boardCopy);
    var possiblePlaces = [];

    for (var i = 0; i < board.rows().length; i++) {
      for (var j = 0; j < board.rows().length; j++) {
        if (board.rows()[i][j] === 0) {
          boardCopy.togglePiece(i, j);
          if (!boardCopy.hasAnyRooksConflicts()) {
            possiblePlaces.push([i, j]);
          }
          boardCopy.togglePiece(i, j);
        }
      }
    }

    return possiblePlaces;
  };

  var board = new Board({n: n});
  findSolution(board, n);

  solutions = _.uniq(solutions);

  console.log('Number of solutions for ' + n + ' rooks:', solutions.length);
  return solutions.length;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
findNQueensSolution = function(n) {
  var findSolution = function(board, n) {
    if (n === 0) {
      return board.rows();
    } else {
      var possiblePlaces = findPossiblePlaces(board);
      return findSolutionHelper(board, possiblePlaces, n);
    }
  };

  var findSolutionHelper = function(board, possiblePlaces, n) {
    if (possiblePlaces.length === 0) {
      return false;
    } else {
      var newBoard = addQueen(board, possiblePlaces[0]);
      return findSolution(newBoard, n - 1) ||
        findSolutionHelper(board, possiblePlaces.slice(1), n);
    }
  };

  var findPossiblePlaces = function(board) {
    var positions = [];
    var boardCopy = deepArrayCopy(board.rows());
    boardCopy = new Board(boardCopy);

    for (var i = 0; i < board.rows().length; i++) {
      for (var j = 0; j < board.rows().length; j++) {
        if (board.rows()[i][j] === 0) {
          boardCopy.togglePiece(i, j);
          if (!boardCopy.hasAnyQueensConflicts()) {
            positions.push([i, j]);
          }
          boardCopy.togglePiece(i, j);
        }
      }
    }

    return positions;
  };

  var addQueen = function(board, position) {
    var boardCopy = deepArrayCopy(board.rows());
    boardCopy = new Board(boardCopy);
    boardCopy.togglePiece(position[0], position[1]);
    return boardCopy;
  };

  var board = new Board({n: n});
  var solution = findSolution(board, n);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution ? solution : (new Board({n: n})).rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
countNQueensSolutions = function(n) {
  var solutions = [];

  var findSolution = function(board, n) {
    if (n === 0) {
      var stringedSoln = JSON.stringify(board.rows());
      solutions.push(stringedSoln);
    } else {
      var possiblePlaces = findPossiblePlaces(board);
      return findSolutionHelper(board, possiblePlaces, n);
    }
  };

  var findSolutionHelper = function(board, possiblePlaces, n) {
    if (possiblePlaces.length === 0) {
      return false;
    } else {
      var newBoard = addQueen(board, possiblePlaces[0]);
      return findSolution(newBoard, n - 1) ||
        findSolutionHelper(board, possiblePlaces.slice(1), n);
    }
  };

  var findPossiblePlaces = function(board) {
    var positions = [];
    var boardCopy = deepArrayCopy(board.rows());
    boardCopy = new Board(boardCopy);

    for (var i = 0; i < board.rows().length; i++) {
      for (var j = 0; j < board.rows().length; j++) {
        if (board.rows()[i][j] === 0) {
          boardCopy.togglePiece(i, j);
          if (!boardCopy.hasAnyQueensConflicts()) {
            positions.push([i, j]);
          }
          boardCopy.togglePiece(i, j);
        }
      }
    }

    return positions;
  };

  var addQueen = function(board, position) {
    var boardCopy = deepArrayCopy(board.rows());
    boardCopy = new Board(boardCopy);
    boardCopy.togglePiece(position[0], position[1]);
    return boardCopy;
  };

  var board = new Board({n: n});
  findSolution(board, n);

  solutions = _.uniq(solutions);

  console.log('Number of solutions for ' + n + ' queens:', solutions.length);
  return solutions.length;
};

var deepArrayCopy = function(array) {
  return array.map(function(item) {
    if (Array.isArray(item)) {
      return deepArrayCopy(item);
    } else {
      return item;
    }
  });
};


  var capitalize = function(word) {
    return word[0].toUpperCase() + word.slice(1);
  };


  var verifyConflictTypes = function(expectedConflicts, matrix) {
    // The Board() constructor will accept a matrix and build that into a (Backbone) Board object (as defined in Board.js)
    var board = new Board(matrix);
    _.map('row col rooks majorDiagonal minorDiagonal queens'.split(' '), function(conflictType) {
      var conflictDetected = board['hasAny' + capitalize(conflictType) + 'Conflicts']();
      var conflictExpected = _(expectedConflicts).contains(conflictType);
      var message = conflictExpected ? 'should' : 'should not';

      it(message + ' find a ' + conflictType + ' conflict', function() {
        expect(conflictDetected).to.be.equal(conflictExpected);
      });
    });
  };

  describe('Empty board', function() {
    verifyConflictTypes([''], [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]);
  });

  describe('Board with row conflicts', function() {
    verifyConflictTypes(['row', 'rooks', 'queens'], [
      [0, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]);
  });

  describe('Board with col conflicts', function() {
    verifyConflictTypes(['col', 'rooks', 'queens'], [
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0]
    ]);
  });

  describe('Board with major diagonal conflicts', function() {
    verifyConflictTypes(['majorDiagonal', 'queens'], [
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]);

    verifyConflictTypes(['majorDiagonal', 'queens'], [
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 1, 0]
    ]);
  });

  describe('Board with minor diagonal conflicts', function() {
    verifyConflictTypes(['minorDiagonal', 'queens'], [
      [0, 0, 1, 0],
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0]
    ]);

    verifyConflictTypes(['minorDiagonal', 'queens'], [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 0, 1, 0]
    ]);
  });
});
