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

  if (startingFoodCount > foods.length) {
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

class Entity {
  constructor(x, y, shapes) {
    this.pos = createVector(x, y);
    this.circles = [];
    this.triangles = [];
    this.rectangles = [];
    for (let shape of shapes) {
      if (shape[0] === "c") {
        this.circles.push({x: shape[1], y: shape[2], d: shape[4], colour: shape[3]});
      } else if (shape[0] === "r") {
        this.rectangles.push({x: shape[1], y: shape[2], l: shape[4], w: shape[5], colour: shape[3]});
      } else if (shape[0] === "t") {
        this.triangles.push({x: shape[1], y: shape[2], p: shape[4], colour: shape[3]});
      }
    }
  }

  draw() {
    noStroke();
    for (let shape of this.circles) {
      fill(shape.colour);
      circle(shape.x, shape.y, shape.d);
    }
    for (let shape of this.rectangles) {
      fill(shape.colour);
      rect(shape.x, shape.y, shape.w, shape.l);
    }
    for (let shape of this.triangles) {
      fill(shape.colour);
      triangle(shape.x + shape.p.x1, shape.y + shape.p.y1, shape.x + shape.p.x2, shape.y + shape.p.y2, shape.x + shape.p.x3, shape.y + shape.p.y3);
    }
  }

  getCircles() {
    return this.circles;
  }

  setCircles(circles) {
    this.circles = circles;
  }
}
