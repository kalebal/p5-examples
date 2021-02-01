let circleArr = new Array(180);
function setup() {  //aptly named: this sets up the canvas
  createCanvas(800, 400);
  t = 0; //this sets up our time for perlin noise
  background(200);
  noLoop();
  frameRate(10);

  for(var i = 0; i < circleArr.length; i++) {
    circleArr[i] = floor(randomGaussian(20, 15));
  }
}

function draw() {
  t += 0.01;
  //gaussianLines();
  gaussianStar();

}

function mousePressed() {
  loop();
}

function mouseReleased() {
  noLoop();
}

function gaussianLines(){
  background(200);
  for (var y = 0; y < 400; y += 5) {
    var x = randomGaussian(400, 50);
    line(400, y, x, y);
  }

  for (var y = 0; y < 400; y += 5) {
    var x = randomGaussian(200, 50);
    line(200, y, x, y);
  }
  for (var y = 0; y < 400; y += 5) {
    var x = randomGaussian(600, 50);
    line(600, y, x, y);
  }
}

function gaussianStar() {
  background(200);
  translate(width/2, height/2);
  for (let i = 0; i < circleArr.length; i++) {
    rotate(TWO_PI / circleArr.length);
    stroke(0);
    let dist = abs(circleArr[i]);
    line(0, 0, dist, 0);
  }
}
