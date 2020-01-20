// Major Project
// Eric James
// Nov. Fri. 15th 2019
//
// Extra for Experts:
// - 

let startingFoodCount = 100;
let buttons = [];
let menus = [];
let simulating = false;
let simulatingSwitchedThisFrame = false;
let RESUMEBUTTON;
let PAUSEBUTTON;
let STARTMENU;
let settings = {
  kindOfCreatures : 0,
  foodCnt : 100,
  creatureSize : 0
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // randomly place food on the screen
  for (let i = 0; i < startingFoodCount; i++) {
    // put a food pellet into the food array
    foods.push(new Pellet(random(0, width), random(0, height)));
  }

  STARTMENU = new Menu(0, 0, width, height, color(100, 0, 255), color(100, 200, 0));

  STARTMENU.addText(0, 0, width, height/2, "This is a my evolution emulator the goal of this project is to emulate how evolution works. If you don't know already evolution is when a creature mutates in a good or bad way. If it is good then the creature will probably live, if not then it will probably die. My creatures will emulate physical and behavioral trates. Have fun.", 24);
  STARTMENU.addButton(0, height/2+5, width-20, height/2-15, "Start", 22, function() {
    STARTMENU.hide();
    SETTINGSMENU.show();
    SETTINGSMENU.buttons[0].hide();
    SETTINGSMENU.buttons[4].hide();
    SETTINGSMENU.buttons[7].hide();
  });

  SETTINGSMENU = new Menu(0, 0, width, height, color(100, 0, 255), color(100, 200, 0));

  SETTINGSMENU.addButton(10, height/4+10, width/3-20, height/4-20, "Both", 24, function() {
    settings.kindOfCreatures = 0;
    SETTINGSMENU.buttons[0].hide();
    SETTINGSMENU.buttons[1].show();
    SETTINGSMENU.buttons[2].show();
  });
  SETTINGSMENU.addButton(width/3+10, height/4+10, width/3-20, height/4-20, "Herbivore", 24, function() {
    settings.kindOfCreatures = 1;
    SETTINGSMENU.buttons[0].show();
    SETTINGSMENU.buttons[1].hide();
    SETTINGSMENU.buttons[2].show();
  });
  SETTINGSMENU.addButton(width/3*2+10, height/4+10, width/3-20, height/4-20, "Carnivore", 24, function() {
    settings.kindOfCreatures = 2;
    SETTINGSMENU.buttons[0].show();
    SETTINGSMENU.buttons[1].show();
    SETTINGSMENU.buttons[2].hide();
  });

  SETTINGSMENU.addButton(10, height/2+10, width/3-20, height/4-20, "Small", 24, function() {
    settings.kindOfCreatures = 0;
    SETTINGSMENU.buttons[3].hide();
    SETTINGSMENU.buttons[4].show();
    SETTINGSMENU.buttons[5].show();
  });
  SETTINGSMENU.addButton(width/3+10, height/2+10, width/3-20, height/4-20, "Medium", 24, function() {
    settings.kindOfCreatures = 1;
    SETTINGSMENU.buttons[3].show();
    SETTINGSMENU.buttons[4].hide();
    SETTINGSMENU.buttons[5].show();
  });
  SETTINGSMENU.addButton(width/3*2+10, height/2+10, width/3-20, height/4-20, "Big", 24, function() {
    settings.kindOfCreatures = 2;
    SETTINGSMENU.buttons[3].show();
    SETTINGSMENU.buttons[4].show();
    SETTINGSMENU.buttons[5].hide();
  });

  SETTINGSMENU.addButton(10, height/4*3+10, width/3-20, height/4-20, "50", 24, function() {
    settings.foodCnt = 50;
    SETTINGSMENU.buttons[6].hide();
    SETTINGSMENU.buttons[7].show();
    SETTINGSMENU.buttons[8].show();
  });
  SETTINGSMENU.addButton(width/3+10, height/4*3+10, width/3-20, height/4-20, "100", 24, function() {
    settings.foodCnt = 100;
    SETTINGSMENU.buttons[6].show();
    SETTINGSMENU.buttons[7].hide();
    SETTINGSMENU.buttons[8].show();
  });
  SETTINGSMENU.addButton(width/3*2+10, height/4*3+10, width/3-20, height/4-20, "150", 24, function() {
    settings.foodCnt = 150;
    SETTINGSMENU.buttons[6].show();
    SETTINGSMENU.buttons[7].show();
    SETTINGSMENU.buttons[8].hide();
  });

  SETTINGSMENU.addButton(10, 10, width-20, height/4-20, "Save", 24, function() {
    SETTINGSMENU.hide();
    ADD100BUTTON.show();
    RESUMEBUTTON.show();
    startingFoodCount = settings.foodCnt;
    sizeMultiplier = settings.creatureSize;
  });

  PAUSEBUTTON = new Button(10, 10, 100, 50, "Pause", 24, color(255, 0, 0), pause, LEFT);
  RESUMEBUTTON = new Button(120, 10, 100, 50, "Resume", 24, color(0, 255, 0), resume, LEFT);

  ADD100BUTTON = new Button(230, 10, 100, 50, "Add 100", 24, color(255, 100, 100), function() {
    for (let i = 0; i < 100; i++) {
      if (random() < 0.5) {
        makeCarnivore(random(0, width), random(0, height));
      } else {
        makeHerbivore(random(0, width), random(0, height));
      }
    }
  }, undefined, false, true);

  for (let button of buttons) {
    button.hide();
  }

  STARTMENU.show();
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

  foodCount = 100 - creatures.length;

  if (foodCount > foods.length) {
    foods.push(new Pellet(random(0, width), random(0, height)));
  }

  for (let button of buttons) {
    button.display();
  }

  for (let menu of menus) {
    menu.display();
  }
}

function mousePressed() {
  for (let button of buttons) {
    button.click(mouseButton);
  }
}

function pause(force) {
  if (force || !simulatingSwitchedThisFrame) {
    simulating = false;
    simulatingSwitchedThisFrame = true;
    RESUMEBUTTON.show();
    PAUSEBUTTON.hide();
  }
}

function resume(force) {
  if (force || !simulatingSwitchedThisFrame) {
    simulating = true;
    simulatingSwitchedThisFrame = true;
    RESUMEBUTTON.hide();
    PAUSEBUTTON.show();
  }
}
