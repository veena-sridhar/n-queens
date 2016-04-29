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



window.findNRooksSolution = function(n) {
  var board = new Board({'n': n});
  var rows = board.rows();
  var solution;

  var findSolution = function(rowIndex) {
    if (rows[rowIndex] === undefined) {
      solution = rows;
      return;
    } else {
      for (var i = 0; i < n; i++) {
        var colIndex = i;
        board.togglePiece(rowIndex, colIndex);
        if (!board.hasAnyRooksConflicts()) {
          findSolution(rowIndex + 1);
        } else {
          board.togglePiece(rowIndex, colIndex);
        }
      }
    }
  };

  findSolution(0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // var solutionCount = 0; 
  // var board = new Board({'n': n});


  // var getCount = function(rowIndex) {
  //   if (rowIndex === n) {
  //     solutionCount ++;
  //     return;
  //   } 
  //   for (var i = 0; i < n; i++) {
  //     var colIndex = i;
  //     board.togglePiece(rowIndex, colIndex);
  //     if (!board.hasAnyRooksConflicts()) {
  //       getCount(rowIndex + 1);  
  //     }
  //     board.togglePiece(rowIndex, colIndex);
  //   }
  // };
  // getCount(0);
  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  var board = new Board({'n': n});
  var rows = board.rows();
  var count = 0; 
  var solution;
  var findSolution = function(rowIndex) {
    console.log(n, 'number');

    if (rows[rowIndex] === undefined) {
      if (count === n) {
        solution = rows;
        console.log(board);
        console.log(board.rows().map(function(row) {
          return row.slice();
        }).slice(), 'this is the solution board');
      }
      return;
    } else {
      for (var i = 0; i < n; i++) {
        var colIndex = i;
        board.togglePiece(rowIndex, colIndex);
        if (!board.hasAnyQueensConflicts()) {
          count++;
          findSolution(rowIndex + 1);
          board.togglePiece(rowIndex, colIndex);
        } else {
          board.togglePiece(rowIndex, colIndex);
        }
      }  
    }
  };
  findSolution(0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  // var solutionCount = 0; 
  // var board = new Board({'n': n});


  // var getCount = function(rowIndex) {
  //   if (rowIndex === n) {
  //     solutionCount++;
    
  //     return;
  //   } 
  //   for (var i = 0; i < n; i++) {
  //     var colIndex = i;
  //     board.togglePiece(rowIndex, colIndex);
  //     if (!board.hasAnyQueensConflicts()) {
  //       getCount(rowIndex + 1);  
  //     }
  //     board.togglePiece(rowIndex, colIndex);
  //   }
  // };
  // getCount(0);
  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  // return solutionCount;
};
