var c=document.getElementById("canvas");
var ctx=c.getContext("2d");
var resolution = 300;

var drawCell = function(x, y) {
  ctx.lineWidth="1";
  ctx.fillStyle="red";
  ctx.fillRect(x,y,1,1);
};

// sets all values in array to false
var initialize = function(gridWidth, gridHeight) {
  var grid = [];
  for (var i=0; i<gridWidth; i++) {
    // push arrays in
    grid.push([]);
    for (var j=0; j<gridHeight; j++) {
      // push booleans into pushed in arrays
      grid[i].push(false);
    }
  }
  return grid;
};

// function that loops through the whole nested array
// if true, draw cell
// if false, do nothing
var draw = function(grid) {
  ctx.clearRect(0,0,resolution,resolution);
  for (var i=0; i< grid.length; i++) {
    for (var j=0; j< grid.length; j++) {
      if (grid[i][j] === true) {
        drawCell(i, j);
      }
    }
  }
};

// live cell w fewer than 2 neighbors == dead
// live cell w 2 or 3 live neighbors lives on
// live cell more than 3 neighbors dies
// dead cell w 3 neighbors becomes alive
function aliveOrDead(grid, i, j) {
  var neighborCount = countNeighbors(grid, i, j);
  var alive = grid[i][j];


  if (alive) {
    if (neighborCount < 2 || neighborCount > 3) {
      alive = false;
    }
  } else if (neighborCount === 3) {
    alive = true;
  }

  return alive;
}

// returns number of alive neighbors
function countNeighbors(grid, i, j) {
  var counter = 0;

  getNeighbors(grid, i, j).forEach(function(alive) {
    if (alive) {
      counter++;
    }
  });

  return counter;
}

function getNeighbors(grid, x, y) {
  var left_neighbors_x = x-1;
  var right_neighbors_x = x+1;
  var lower_neighbors_y = y-1;
  var upper_neighbors_y = y+1;


  if (x - 1 < 0) {
    left_neighbors_x = resolution-1;
  }
  if (x + 1 > resolution-1) {
    right_neighbors_x = 0;
  }
  if (y - 1 < 0) {
    lower_neighbors_y = resolution-1;
  }
  if (y + 1 > resolution-1) {
    upper_neighbors_y = 0;
  }

  return [
    grid[left_neighbors_x][upper_neighbors_y], // top left
    grid[left_neighbors_x][y], // mid left
    grid[left_neighbors_x][lower_neighbors_y], // lower left
    grid[x][upper_neighbors_y], // top mid
    grid[x][lower_neighbors_y], // lower mid
    grid[right_neighbors_x][upper_neighbors_y], // top right
    grid[right_neighbors_x][y], // mid right
    grid[right_neighbors_x][lower_neighbors_y], // lower right
  ];
}

// takes in a grid and returns a new grid representing the next iteration of grid
function nextGrid(grid) {
  var newGrid = [];
  for (var i = 0; i < grid.length; i++) {
    newGrid.push([]);
    for (var j = 0; j < grid[i].length; j++) {
      newGrid[i].push(aliveOrDead(grid, i, j));
    }
  }
  return newGrid;
}

// function setup(grid) {
//   for (var i = 0; i < grid.length; i++) {
//     for (var j = 0; j < grid[i].length; j++) {
//       if (Math.random() < 0.2) {
//         grid[i][j] = true;
//       }
//     }
//   }
// }

function setup(grid) {
  glider(grid, 50,50);
  glider2(grid, 75,75);
  nalwss(grid, 200, 200);
  nalwss(grid, 100, 100);
  nalwss(grid, 250, 25);
  nalwss(grid, 75, 75);
  nalwss(grid, 170, 200);
  nalwss(grid, 290, 10);
  nalwss(grid, 20, 20);
}

function glider(grid, x, y) {
  grid[x][y] = true;
  grid[x+1][y] = true;
  grid[x+2][y] = true;
  grid[x+2][y-1] = true;
  grid[x+1][y-2] = true;
}

function glider2(grid, x, y) {
  grid[x][y] = true;
  grid[x-1][y] = true;
  grid[x-2][y] = true;
  grid[x-2][y+1] = true;
  grid[x-1][y+2] = true;
}

// not a lightweight spaceship
function nalwss(grid, x, y) {
  grid[x][y] = true;
  grid[x-1][y-1] = true;
  grid[x-1][y-3] = true;
  grid[x+4][y] = true;
  grid[x+2][y] = true;
  grid[x+3][y] = true;
  grid[x+3][y-3] = true;
  grid[x+4][y] = true;
  grid[x+4][y-1] = true;
  grid[x+4][y-2] = true;
}



var grid = initialize(resolution, resolution);

setup(grid);



setInterval(function () {
  console.log('hello');
  draw(grid);
  grid = nextGrid(grid);
}, 100);
