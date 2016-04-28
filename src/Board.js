// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        // console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        // console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        // console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
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
      //var index = rowIndex - 1;
      var counter = 0;
      for (var i = 0; i < this.rows()[rowIndex].length; i++) {
        if (this.rows()[rowIndex][i] === 1) {
          counter++;
        }
      }
      if (counter > 1) {
        return true;
      } else {
        return false; 
      }
      
    },


  
    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var rows = this.rows();
      var newArray = _.reduce(rows, function(accumulator, item) {
        var sum = 0;
        _.each(item, function(value) {
          sum += value;
        });
        accumulator.push(sum);
        return accumulator;
      }, []);
      for (var i = 0; i < newArray.length; i++) {
        if (newArray[i] > 1) {
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
      var rows = this.rows();
      var sum = 0;
      _.each(rows, function (column) {
        sum += column[colIndex];
      });
      if (sum > 1) {
        return true;
      }
      return false; 
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var rows = this.rows();
      var result = false;
      var context = this;
      _.each(rows, function(column, index) {
        if (context.hasColConflictAt(index)) {
          result = true;
        }
      });
      return result; 
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(columnIndex) {
      //access the array
      var rows = this.rows();
      //hold the sum in a variable
      var sum = 0;
      
      //check to see if number is negative
       //set negativeIndex to number; i[0]

      var i = 0;
      //check if columnIndex is positive
      if (typeof rows[i][columnIndex] === 'number' && rows[i][columnIndex] >= 0) {
        //while value is not undefined
        while (rows[columnIndex] !== undefined && typeof rows[i][columnIndex] === 'number' && rows[i][columnIndex] >= 0) {
          //add value to total sum
          sum += rows[i][columnIndex];
          //increment down one, right one
          i += 1;
          columnIndex++;
        }
      } else {
        //if negative columnIndex convert to positive number
        var negativeIndex = Math.abs(columnIndex);
        //while value is not undefined
        while (rows[negativeIndex] !== undefined && typeof rows[negativeIndex][i] === 'number') {
          //add value to total sum
          sum += rows[negativeIndex][i];
          i++;
          negativeIndex++;
        }
      }
      //if collision return true
      if (sum > 1) {
        return true;
      }
      return false;
    },

    


    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var rows = this.rows();
      var n = rows.length;
      var context = this;
      var result = false;
      for (var i = -Math.abs(n - 2); i <= n - 2; i++) {
        if (context.hasMajorDiagonalConflictAt(i)) {
          result = true;
        }
      }
      return result; 
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(columnIndex) {
      //access the array
      var rows = this.rows();
      //hold the sum in a variable
      var sum = 0;
      
      //check to see if number is greater than last element in rows
      //if virtual column index

      var i = 0;
      //check if columnIndex less than the length of rows (if it's on the board)
      if (typeof rows[i][columnIndex] === 'number' && columnIndex < rows.length) {
        //while value is not undefined
        while (rows[columnIndex] !== undefined && typeof rows[i][columnIndex] === 'number' && columnIndex < rows.length) {
          //add value to total sum
          sum += rows[i][columnIndex];
          //increment down one, right one
          i++;
          columnIndex--;
        }
      //if it's off the board
      } else {
        //if virtual columnIndex convert to indexable value on board
        var biggerIndex = (columnIndex - rows.length) + 1;
        var j = rows.length - 1;
        //while value is not undefined
        while (rows[biggerIndex] !== undefined && typeof rows[biggerIndex][j] === 'number') {
          //add value to total sum
          sum += rows[biggerIndex][j];
          j--;
          biggerIndex++;
        }
      }
      //if collision return true
      if (sum > 1) {
        return true;
      }
      // return false; 
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var rows = this.rows();
      var context = this;
      var result = false;
      for (var i = rows.length + 1; i >= 0; i--) {
        if (context.hasMinorDiagonalConflictAt(i)) {
          result = true;
        }
      }
      return result; 
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
