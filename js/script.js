// live cell w fewer than 2 neighbors == dead
// live cell w 2 or 3 live neighbors lives on
// live cell more than 3 neighbors dies
// dead cell w 3 neighbors becomes alive

var drawCell = function(x, y) {
  var c=document.getElementById("canvas");
  var ctx=c.getContext("2d");
  ctx.lineWidth="1";
  ctx.strokeStyle="red";
  ctx.rect(x,y,1,1);
  ctx.stroke();
};

// sets all values in array to false
var initialize = function(gridWidth, gridHeight) {
  var grid = [];
  for (i=0; i<gridWidth; i++) {
    // push arrays in
    grid.push([]);
    for (j=0; j<gridHeight; j++) {
      // push booleans into pushed in arrays
      grid[i].push(false);
    }
  }
  return grid;
};

var grid = initialize(300, 300);
console.log(grid);

// function that loops through the whole nested array
// if false, draw cell
// if true, do nothing
var draw = function() {
  for (i=0; i< grid.length; i++) {
    for (j=0; j< grid.length; j++) {
      if (grid[i][j] === true) {
        drawCell(i, j);
      }
    }
  }
  console.log(grid[2][2]);
};


grid[2][2] = true;
grid[100][100] = true;
grid[230][230] = true;
grid[2][60] = true;
grid[100][250] = true;
grid[230][100] = true;

draw();
