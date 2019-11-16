// Major Project
// Eric James
// Nov. Fri. 15th 2019
//
// Extra for Experts:
// - 

let creature;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  creature = new Creature();
}

function draw() {
  background(220);
  creature.display();
}