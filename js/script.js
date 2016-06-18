// live cell w fewer than 2 neighbors == dead
// live cell w 2 or 3 live neighbors lives on
// live cell more than 3 neighbors dies
// dead cell w 3 neighbors becomes alive

var draw = function(x, y) {
  var c=document.getElementById("canvas");
  var ctx=c.getContext("2d");
  ctx.lineWidth="1";
  ctx.strokeStyle="red";
  ctx.rect(x,y,1,1);
  ctx.stroke();
};

var initialize = function(gridWidth, gridHeight) {
  var grid = [];
  for (i=0; i<=gridWidth; i++) {
    //push arrays in
    grid.push([]);
    for (j=0; j<=gridHeight; i++) {
      //push booleans into here
      grid[i].push(false);
    }
  }
};

var grid = initialize();







draw(20, 20);
