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
