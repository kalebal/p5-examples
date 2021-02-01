let w;
let columns;
let rows;
let board;
let next;
let rt = 0;
let bt = 1000;
let gt = 100;

function setup() {
  createCanvas(720, 400);
  frameRate(5);
  w = 20;
  // Calculate columns and rows
  columns = floor(width / w);
  rows = floor(height / w);
  // make a 2D array
  board = new Array(columns);
  for (var i = 0; i < columns; i++) {
    board[i] = new Array(rows);
  }
  // Going to use multiple 2D arrays and swap them
  next = new Array(columns);
  for (var i = 0; i < columns; i++) {
    next[i] = new Array(rows);
  }
  init();
}

function draw() {
  background(255);
  generate();
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      var randC = randomGaussian(240, 10);
      if ((board[i][j] == 1)) fill(0);
      else fill(240);
      stroke(0);
      rect(i * w, j * w, w - 1, w - 1);
    }
    rt += Math.abs(0.01 + (random(5) / 100));
    bt += Math.abs(0.01 + (random(5) / 100));
    gt += Math.abs(0.01 + (random(5) / 100));
  }
  rt += Math.abs(0.01 + (random(5) / 100));
  bt += Math.abs(0.01 + (random(5) / 100));
  gt += Math.abs(0.01 + (random(5) / 100));
}

// reset board when mouse is pressed
function mousePressed() {
  init();
}

function keyPressed() {
  console.log('key pressed');
  var x = Math.floor(random(20));
  var y = Math.floor(random(10));
  board[x][y] = 1;
  board[x][y + 1] =  1;
  board[x + 1][y] = 1;

}

// Fill board randomly
function init() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      // Lining the edges with 0s
      if (i == 0 || j == 0 || i == columns - 1 || j == rows - 1) board[i][j] = 0;
      // Filling the rest randomly
      else board[i][j] = floor(random(2));
      next[i][j] = 0;
    }
  }
}

  // The process of creating the new generation
  function generate() {

    // Loop through every spot in our 2D array and check spots neighbors
    for (let x = 1; x < columns - 1; x++) {
      for (let y = 1; y < rows - 1; y++) {
        // Add up all the states in a 3x3 surrounding grid
        let neighbors = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            neighbors += board[x + i][y + j];
          }
        }

        //subtract the current cell's state since
        // we added it in the above loop
        neighbors -= board[x][y];
        // Rules of Life
        if ((board[x][y] == 1) && (neighbors < 2)) next[x][y] = 0;           // Loneliness
        else if ((board[x][y] == 1) && (neighbors > 3)) next[x][y] = 0;           // Overpopulation
        else if ((board[x][y] == 0) && (neighbors == 3)) next[x][y] = 1;           // Reproduction
        else next[x][y] = board[x][y]; // Stasis
      }
    }
    // Swap!
    let temp = board;
    board = next;
    next = temp;
  }
