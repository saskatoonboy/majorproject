// Major Project
// Eric James
// Nov. Fri. 15th 2019
//
// Extra for Experts:
// - 

let creatures = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  creatures.push(new Creature(random(0, width), random(0, height)));
}

function draw() {
  background(220);
  for (creature of creatures) {
    creature.display();
  }
}

function mousePressed() {
  creatures.push(new Creature(mouseX, mouseY));
}