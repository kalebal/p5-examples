/* eslint-disable */

function setup() {  //aptly named: this sets up the canvas
  createCanvas(800, 400);
  w = new Wiggler();
  //frameRate(10);
}

function draw() { //this does things to the canvas ~60x a second
  background("#607D8B");
  w.step();
  w.display();
}

class Wiggler {
  constructor(){
    this.x = width /2;
    this.y = height/2;
    this.diameter = random(50, 80);
    this.speed = 1;
  }

  display() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }

  step(){
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  }
}