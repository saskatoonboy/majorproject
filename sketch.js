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

  STARTMENU.addText(0, 0, width, height/2, "This is a my evolution emulator the goal of this project is to emulate how evolution works. If you don't know already evolution is when a creature mutates in a good or bad way. If it is good then the creature will probably live, if not then it will probably die. My creatures will emulate physical and behavioral trates. Have fun.", 24);
  STARTMENU.addButton(100, height/2, 100, 200, "Start", 22, function() {
    STARTMENU.hide();
    RESUMEBUTTON.show();
    ADD100BUTTON.show();
    for (let i = 0; i < 200; i++) {
      if (random() < 0.5) {
        new Carnivore(random(0, width), random(0, height));
      } else {
        new Herbivore(random(0, width), random(0, height));
      }
    }
  });

  PAUSEBUTTON = new Button(10, 10, 100, 50, "Pause", 24, color(255, 0, 0), pause, LEFT);
  RESUMEBUTTON = new Button(10, 10, 100, 50, "Resume", 24, color(0, 255, 0), resume, LEFT);

  ADD100BUTTON = new Button(120, 10, 100, 50, "Add 100", 24, color(255, 100, 100), function() {
    for (let i = 0; i < 100; i++) {
      if (random() < 0.5) {
        new Carnivore(random(0, width), random(0, height));
      } else {
        new Herbivore(random(0, width), random(0, height));
      }
    }
  }, undefined, false, true);

  for (let button of buttons) {
    button.hide();
  }

  new Button(0, 0, width, height, "Start", 48, color(100, 0, 255), function(){
    STARTMENU.show();
  }, undefined, true, false);
}

function draw() {
  background(220);
  simulatingSwitchedThisFrame = false;

  for (let button of buttons) {
    button.hover(mouseX, mouseY);
  }

  for (let menu of menus) {
    menu.hover(mouseX, mouseY);
  }

  if (simulating) {
    // update foods
    for (let food of foods) {
      food.update();
    }
  
    // update creatures
    for (let creature of creatures) {
      creature.update();
    }  
  
    // update eggs
    for (let egg of eggs) {
      egg.update();
    } 
  }

  // display foods
  for (let food of foods) {
    food.display();
  }

  // display creatures
  for (let creature of creatures) {
    creature.display();
  }

  // display eggs
  for (let egg of eggs) {
    egg.display();
  }

  if (startingFoodCount > foods.length) {
    foods.push(new Pellet(random(0, width), random(0, height)));
  }

  for (let button of buttons) {
    button.display();
  }

  for (let menu of menus) {
    menu.display();
  }
}

function mouseClicked() {

  for (let button of buttons) {
    button.click(mouseButton);
  }

  for (let menu of menus) {
    menu.click(mouseX, mouseY);
  }
}

function keyPressed() {
  if (key == " ") {

    simulating = !simulating;

  } else {
    for (let i = 0; i < 100; i++) {
      if (random() < 0.5) {
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
