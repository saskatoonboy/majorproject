let instructionFunctions = [forward, back, left, right, wantToGiveBirth, wantToEat, wantToMate, resetTimer, com1, com2, com3];

// creature that is evolving over time
class Creature {
    // construct the creature class
    constructor(x, y, genes) {
        // base stats of creature
        this.energy = 0;
        this.stomach = 0; // WIP
        this.stomachSize = 500; // WIP
        this.health = 1000;
        this.pos = createVector(x, y);
        this.facing = createVector(floor(random(0, width)), floor(random(0, height))).sub(this.pos).normalize();
        this.timer = 0;
        this.maturity;
        this.wantToEat = 0;
        this.wantToBirth = 0;
        this.wantToMate = 0; // WIP
        this.hunger = 0; // 0 is not hunger 1 is crazy hungry
        this.transmiting = [0, 0, 0];
        this.reciving = [0, 0, 0];
        this.timeAlive = 0; // millis
        this.lastMilis = millis();
        this.meatbolism = 3; // WIP
        this.energyRatio = 1; // WIP

        // if there were not any genes given generate them randomly
        if (genes === undefined) {
            this.genes = gene.randomGenes();
        } else {
            this.genes = genes;
        }

        // get physical traites from genes
        this.speedRatio = this.genes.speed;
        this.sizeRatio = this.genes.size;
        this.red = this.genes.red;
        this.green = this.genes.green;
        this.blue = this.genes.blue;
        this.mutationChance = this.genes.mutationChance;
        this.timeToHatch = this.genes.timeToHatch;
        this.strength = this.genes.strength;
        this.angleOfVision = this.genes.angleOfVision;
        this.distanceOfVision = this.genes.distanceOfVision;
        this.timerSpeed = this.genes.timerSpeed;
        this.communicationSensitivity = this.genes.communicationSensitivity;
        this.constantValue = this.genes.constant;
        this.toggleAble = 0;
        this.foodVisible = 0;
        this.creaturesVisible = 0;
        this.nearestFoodAngle = 0;
        this.nearestFoodDistance = 0;
        this.nearestCreatureAngle = 0;
        this.nearestCreatureDistance = 0;

        this.stomachSize = this.sizeRatio * 1000;

        // create bratin
        this.brain = new Brain(this.genes.brainGenes);
    }

    // display the creature on screen
    display() {
        // remove the stroke
        noStroke();
        let angle = this.facing.heading() + 1.5;
        push();
        // translate to allow rotation
        translate(this.pos.x, this.pos.y);
        // rotate based of the direction the creature is facing 1.5 is a constant to offset the heading value properly
        rotate(angle);
        // color the creature based of its genes
        fill(this.red, this.green, this.blue);
        // draw the creature
        circle(0, 0, this.sizeRatio * 50);
        triangle(-this.sizeRatio * 25, 0, this.sizeRatio * 25, 0, 0, -sqrt(((this.sizeRatio * 50) ** 2) - ((this.sizeRatio * 25) ** 2)));
        pop();
    }

    // update the creature
    update() {

        let nearestCreature = this.findNearestCreature();
        let creatureDistance = this.distance(nearestCreature);

        let nearestFood = this.findNearestFood();
        let foodDistance = this.distance(nearestFood);

        if (creatureDistance <= this.distanceOfVision) {
            this.nearestCreature = nearestCreature;
            this.nearestCreatureDistance = creatureDistance;
            this.nearestCreatureAngle = nearestCreature.pos.heading()
        }

        if (foodDistance <= this.distanceOfVision) {
            this.nearestFood = nearestFood;
            this.nearestFoodDistance = foodDistance;
            this.nearestFoodAngle = nearestFood.pos.heading()
        }


        // get the instructions from the brain
        let data = this.brain.getData(this.constantValue, this.hunger, this.maturity, this.health, this.speedRatio, this.nearestCreatureDistance, this.nearestCreatureAngle, this.nearestFoodDistance, this.nearestFoodAngle, this.creaturesVisible, this.foodVisible, this.red, this.green, this.blue, this.toggleAble, this.timer, this.timeAlive, this.reciving[0], this.reciving[1], this.reciving[2]);

        // loop through every function that we call using brain output and call it
        for (let i = 0; i < instructionFunctions.length; i++) {
            let num = data[i];
            instructionFunctions[i](num, this);
        }

        // if the creature has moved of the side of the screen on the x axis the loop it to the other side
        if (this.pos.x < 0) {
            this.pos.x += width;
        } else if (this.pos.x > width) {
            this.pos.x -= width;
        }

        // if the creature has moved of the side of the screen on the y axis the loop it to the other side
        if (this.pos.y < 0) {
            this.pos.y += height;
        } else if (this.pos.y > height) {
            this.pos.y -= height;
        }

        // updating time
        let time = millis() - this.lastMilis;
        this.lastMilis = millis();

        this.timer += this.timerSpeed * time;
        this.timeAlive += time;

        // update hunger
        this.hunger = 1 - (this.stomach / this.stomachSize);

        if (this.energy <= 0) {
            this.health -= 1;
        }

        if (this.health <= 0) {
            this.kill();
        }

        this.digest();

        if (this.energy > 750) {
            this.birth();
        }

        if (this.stomach > 0) {
            this.health++;
            if (this.health > 1000) {
                this.health = 1000;
            }
        }

        this.eat();

        // if (this.wantToEat >= 0.5) {

        // }

        // if (this.timeAlive > 25000) {
        //     print(this.timeAlive, this);
        // }

        stroke(8);
        line(0, 0, this.facing.x*100, this.facing.y*100);
        print(this.facing.x, this.facing.y);

        let magF = foods[0].pos.mag();

        let magFS = foods[0].pos.magSq();

        let magC = creatures[0].facing.mag();

        let magCS = creatures[0].facing.magSq();

        let magD = this.nearestFoodDistance;
        //print(magD);

        let magDS = magD * magD;
        //print(magDS);

        let topFrac = magFS + magDS - magCS
        //print(topFrac);

        let bottomFrac = 2 * magF * magD;
        //print(bottomFrac);

        let fraction = topFrac / bottomFrac;
        //print(fraction);

        let myAngle = acos(fraction);
        //print(myAngle);
        //print(degrees(myAngle));
    }

    kill() {
        creatures.splice(creatures.indexOf(this), 1);
    }

    digest() {
        if (this.stomach > 0) {
            if (this.stomach > this.meatbolism) {
                this.stomach -= this.meatbolism;
                this.energy += this.meatbolism;
            } else {
                this.energy += this.stomach;
                this.stomach = 0;
            }
        }
    }

    mutate() {
        this.brain.mutate(this.mutationChance);

        let comparison = floor(random(101)) / 100;
        if (this.mutationChance >= comparison) {
            let mutationKind = floor(random(0, 27));

            if (mutationKind === 0) {
                this.speedRatio += 0.1;
            } else if (mutationKind === 1) {
                this.sizeRatio += 0.1;
            } else if (mutationKind === 2) {
                this.red += 25;
            } else if (mutationKind === 4) {
                this.green += 25;
            } else if (mutationKind === 5) {
                this.blue += 25;
            } else if (mutationKind === 6) {
                this.mutationChance += 0.1;
            } else if (mutationKind === 7) {
                this.timeToHatch += 0.1;
            } else if (mutationKind === 8) {
                this.angleOfVision += 0.1;
            } else if (mutationKind === 9) {
                this.distaangleOfVisionceOfVision += 0.1;
            } else if (mutationKind === 10) {
                this.distanceOfVision += 0.1;
            } else if (mutationKind === 11) {
                this.timerSpeed += 0.1;
            } else if (mutationKind === 12) {
                this.communicationSensitivity += 0.1;
            } else if (mutationKind === 13) {
                this.constantValue += 0.1;
            } else if (mutationKind === 0) {
                this.speedRatio -= 0.1;
            } else if (mutationKind === 1) {
                this.sizeRatio -= 0.1;
            } else if (mutationKind === 2) {
                this.red -= 25;
            } else if (mutationKind === 4) {
                this.green -= 25;
            } else if (mutationKind === 5) {
                this.blue -= 25;
            } else if (mutationKind === 6) {
                this.mutationChance -= 0.1;
            } else if (mutationKind === 7) {
                this.timeToHatch -= 0.1;
            } else if (mutationKind === 8) {
                this.angleOfVision -= 0.1;
            } else if (mutationKind === 9) {
                this.distaangleOfVisionceOfVision -= 0.1;
            } else if (mutationKind === 10) {
                this.distanceOfVision -= 0.1;
            } else if (mutationKind === 11) {
                this.timerSpeed -= 0.1;
            } else if (mutationKind === 12) {
                this.communicationSensitivity -= 0.1;
            } else if (mutationKind === 13) {
                this.constantValue -= 0.1;
            }

        }
    }

    birth() {

        this.genes.brainGenes = this.brain.getGenenome();
        let egg = new Egg(this.pos.x, this.pos.y, this.genes);
        eggs.push(egg);
        this.energy -= 500;
    }

    eat() {
        for (food of foods) {
            if (food.collison(this)) {
                this.stomach += food.consume(this.stomachSize - this.stomach);
            }
        }
    }

    distance(obj) {
        return this.pos.copy().sub(obj.pos).mag();
    }

    findNearestFood() {

        let nearFood = foods[0];

        for (let food of foods) {
            if (this.distance(nearFood) > this.distance(food)) {
                nearFood = food;
            }
        }

        return nearFood
    }

    findNearestCreature() {

        let nearCreature = creatures[0];

        for (let creature of creatures) {
            if (creature !== this) {
                if (this.distance(nearCreature) > this.distance(creature)) {
                    nearCreature = creature;
                }
            }
        }

        return nearCreature
    }
}

// move the creature forward if the brain sent a 0.5 or greater
function forward(inst, creature) {
    if (inst >= 0.5) {
        creature.pos.add(creature.facing.copy().mult(creature.speedRatio));
        creature.energy -= creature.energyRatio * creature.speedRatio;
    }
}

function back(inst, creature) {
    if (inst >= 0.5) {
        creature.pos.sub(creature.facing.copy().mult(creature.speedRatio));
        creature.energy -= creature.energyRatio * creature.speedRatio;
    }
}

function left(inst, creature) {
    creature.facing.rotate(-inst);
    creature.energy -= creature.energyRatio * inst;
}

function right(inst, creature) {
    creature.facing.rotate(inst);
    creature.energy -= creature.energyRatio * inst;
}

function wantToGiveBirth(inst, creature) {
    creature.wantToBirth = inst;
}

function wantToEat(inst, creature) {
    creature.wantToEat = inst;
}

function wantToMate(inst, creature) {
    creature.wantToMate = inst;
}

function resetTimer(inst, creature) {
    if (inst > 0.5) {
        creature.timer = 0;
    }
}

function com1(inst, creature) {
    creature.transmiting[0] = inst;
}

function com2(inst, creature) {
    creature.transmiting[1] = inst;
}

function com3(inst, creature) {
    creature.transmiting[2] = inst;
}
