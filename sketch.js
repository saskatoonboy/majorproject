// Major Project
// Eric James
// Nov. Fri. 15th 2019
//
// Extra for Experts:
// - 

let creatures = [];
let foods = [];
let startingFoodCount = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  creatures.push(new Creature(random(0, width), random(0, height)));
  for (let i = 0; i < startingFoodCount; i++) {
    foods.push(new Pellet(random(0, width), random(0, height)));
  }

  setupBasicBrain();
}

function draw() {
  background(220);
  
  // update foods
  for (food of foods) {
    food.update();
  }

  // update creatures
  for (creature of creatures) {
    creature.update();
  }  

  // display foods
  for (food of foods) {
    food.display();
  }

  // display creatures
  for (creature of creatures) {
    creature.display();
  }
}

function mousePressed() {
  creatures.push(new Creature(mouseX, mouseY));
}