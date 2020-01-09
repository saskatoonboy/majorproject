// Major Project
// Eric James
// Nov. Fri. 15th 2019
//
// Extra for Experts:
// - 

const startingFoodCount = 100;
let buttons = [];
let menus = [];
let simulating = false;
let simulatingSwitchedThisFrame = false;
let RESUMEBUTTON;
let PAUSEBUTTON;
let STARTMENU;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // randomly place food on the screen
  for (let i = 0; i < startingFoodCount; i++) {
    // put a food pellet into the food array
    foods.push(new Pellet(random(0, width), random(0, height)));
  }

  STARTMENU = new Menu(0, 0, width, height, color(100, 0, 255), color(100, 200, 0));
  STARTMENU.addText(0, 0, width, height, "This is a my evolution emulator the goal of this project is to emulate how evolution works. If you don't know already evolution is when a creature mutates in a good or bad way. If it is good then the creature will probably live, if not then it will probably die. My creatures will simulate physical and behavioral trates. Have fun.", 24);

  new Button(0, 0, width, height, "Start", 48, color(100, 0, 255), function(){
    STARTMENU.show();
  }, null, true, false);

  PAUSEBUTTON = new Button(10, 10, 100, 50, "Pause", 32, color(255, 0, 0), pause, LEFT);
  RESUMEBUTTON = new Button(10, 10, 100, 50, "Resume", 32, color(0, 255, 0), resume, LEFT);

  RESUMEBUTTON.hide();
  PAUSEBUTTON.hide();
}

function draw() {
  background(220);
  simulatingSwitchedThisFrame = false;

  for (button of buttons) {
    button.hover(mouseX, mouseY);
  }

  if (simulating) {
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

  for (button of buttons) {
    button.display();
  }

  for (menu of menus) {
    menu.display();
  }
}

function mouseClicked() {

  let buttonWorked = false;

  for (button of buttons) {
    buttonWorked = button.click(mouseButton);
  }

  if (buttonWorked) {
    // add a new creature at the mouse locations
    creatures.push(new Creature(mouseX, mouseY));
  }
}

function keyPressed() {
  if (key == " ") {

    simulating = !simulating;

  } else {
    for (let i = 0; i < 100; i++) {
      if (random < 0.5) {
        new Carnivore(random(0, width), random(0, height));
      } else {
        new Herbivore(random(0, width), random(0, height));
      }
    }
  }
}

function pause(force) {
  if (force || !simulatingSwitchedThisFrame) {
    print("pause");
    simulating = false;
    simulatingSwitchedThisFrame = true;
    RESUMEBUTTON.show();
    PAUSEBUTTON.hide();
  }
}

function resume(force) {
  if (force || !simulatingSwitchedThisFrame) {
    print("resume");
  simulating = true;
  simulatingSwitchedThisFrame = true;
  RESUMEBUTTON.hide();
  PAUSEBUTTON.show();
}
}
