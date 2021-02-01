//set up live server: live-server -q --wait=200


function setup() {  //aptly named: this sets up the canvas
  createCanvas(800, 400);
  t = 0; //this sets up our time for perlin noise
  w = new Walker();
  r = new RandomWalker();
  n = new NoisyWalker();
  en = new EvenNoisierWalker();
  background("#607D8B");

}

function draw() {
  //background("#007D8B");
  //w.showOff();
  //r.showOff();
  //n.showOff();
  //en.showOff();
  t += 0.01;
}

class Walker{ //walks in a straight line, all the time, never gets bored
  constructor(){
    this.x = random(width/4, width/4 * 3);
    this.y = random(height/4, height/4 * 3);
    this.speed = 1;
    this.diameter = 20;

  }

  display() {
    ellipse(this.x, this.y, this.diameter, this.diameter)
  }
  step() {
    if (this.x >= 800 || this.x <= 0) {
      //keep it in bounds
      this.speed *= -1;
    }
    this.x += this.speed;
  }

  showOff() {
    this.step();
    this.display();
  }
}

class RandomWalker extends Walker { //random, but not lifelike
  constructor(){
    super();
  }

  step(){
    var randomStep= random(-200, 50);
    if(randomStep >= 0) {
      this.x = random(width);
      this.y = random(height);
      this.randomStep = random(-200, 50);
    }
  }
}

class NoisyWalker extends Walker { //uses perlin noise to create a more lifelike walk
  constructor(){
    super();
    this.n = noise(t); //retieves a perlin noise value at time = t
  }

  display(){
    rect(this.x - 10, t * 100, 10, 1);
  }
  step() {
    this.x = map(this.n, 0, 1, 0, width);
    this.n = noise(t); //updates noise value
  }
}

class EvenNoisierWalker extends Walker { //noisy vertically too
  constructor() {
    super();
    this.tx = 0;
    this.ty = 10000;
    this.nx = noise(this.tx);
    this.ny = noise(this.ty);
  }

  display() {
    strokeWeight(2);
    point(this.x, this.y);

  }
  step() {
    this.x = map(this.nx, 0, 1, 0, width);
    this.y = map(this.ny, 0, 1, 0, height);
    //update time
    this.tx += 0.01;
    this.ty += 0.01;
    //update noise
    this.nx = noise(this.tx);
    this.ny = noise(this.ty);


  }
}


