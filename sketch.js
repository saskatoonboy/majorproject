// Major Project
// Eric James
// Nov. Fri. 15th 2019
//
// Extra for Experts:
// - 

let creatures = [];
let foods = [];
let eggs = [];
let startingFoodCount = 100;
let foodCount = startingFoodCount;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // randomly place food on the screen
  for (let i = 0; i < startingFoodCount; i++) {
    // put a food pellet into the food array
    foods.push(new Pellet(random(0, width), random(0, height)));
  }
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

  // update eggs
  for (egg of eggs) {
    egg.update();
  } 

  // display foods
  for (food of foods) {
    food.display();
  }

  // display creatures
  for (creature of creatures) {
    creature.display();
  }

  // display eggs
  for (egg of eggs) {
    egg.display();
  }

  foodCount = 100 - creatures.length;

  if (foodCount > foods.length) {
    foods.push(new Pellet(random(0, width), random(0, height)));
  }
}

function mousePressed() {
  // add a new creature at the mouse locations
  creatures.push(new Creature(mouseX, mouseY));
}

function keyPressed() {
  for (let i = 0; i < 100; i++) {
    creatures.push(new Creature(random(0, width), random(0, height)));
  }
}
