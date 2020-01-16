let instructionFunctions = [forward, back, left, right, wantToGiveBirth, wantToEat, wantToMate, resetTimer, com1, com2, com3];
let creatures = [];

let sizeMultiplier = 50;

// creature that is evolving over time
class Creature extends Edible {
    // construct the creature class
    constructor(x, y, genes, isHerbivore) {


        // if there were not any genes given generate them randomly
        if (genes === undefined) {
            genes = gene.randomGenes(isHerbivore);
        }

        //circle(0, 0, this.sizeRatio * 50);
        //triangle(, 0, this.sizeRatio * 25, 0, 0, );
        super(x, y, [["c", 0, 0, color(genes.red, genes.green, genes.blue), genes.size * sizeMultiplier], ["t", 0, 0, color(genes.red, genes.green, genes.blue), { x1: -genes.size * sizeMultiplier / 2, y1: 0, x2: genes.size * sizeMultiplier / 2, y2: 0, x3: 0, y3: -sqrt(((genes.size * sizeMultiplier) ** 2) - ((genes.size * sizeMultiplier / 2) ** 2)) }]], creatures);

        // base stats of creature
        this.energy = 0;
        this.stomach = 0; // WIP
        this.stomachSize = 500; // WIP
        this.health = 1000;
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
        this.energyRatio = 1; // WIP
        this.genes = genes;

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
        this.metabolism = this.genes.metabolism;

        this.toggleAble = 0;
        this.foodVisible = 0;
        this.creaturesVisible = 0;
        this.nearestFoodAngle = 0;
        this.nearestFoodDistance = 0;
        this.nearestCreatureAngle = 0;
        this.nearestCreatureDistance = 0;

        this.stomachSize = this.sizeRatio * 1000;
        this.trueSize = this.sizeRatio * sizeMultiplier;

        // create bratin
        this.brain = new Brain(this.genes.brainGenes);
    }

    // display the creature on screen
    display() {
        noStroke();
        let angle = this.facing.heading() + HALF_PI;
        push();
        // translate to allow rotation
        translate(this.pos.x, this.pos.y);
        // rotate based of the direction the creature is facing 1.5 is a constant to offset the heading value properly
        rotate(angle);
        // draw the creature
        super.display();
        pop();
    }

    // update the creature
    update() {

        let nearestFood = this.findNearestFood();


        let nearestCreature = this.findNearestCreature();

        if (nearestCreature !== undefined) {

            let creatureDistance = this.distance(nearestCreature);

            if (creatureDistance <= this.distanceOfVision) {
                this.nearestCreature = nearestCreature;
                this.nearestCreatureDistance = creatureDistance;
                this.nearestCreatureAngle = this.getAngle(nearestCreature);
            }
        }
        if (nearestFood !== undefined) {

            let foodDistance = this.distance(nearestFood);

            if (foodDistance <= this.distanceOfVision) {
                this.nearestFood = nearestFood;
                this.nearestFoodDistance = foodDistance;
                this.nearestFoodAngle = this.getAngle(nearestFood);
            }
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
            this.remove();
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


        if (this.wantToEat >= 0.2 || this.energy < 0) {
            this.eat();
        }
    }

    getAngle(obj) {
        return this.distanceVector(obj).angleBetween(this.facing) - PI;
    }

    digest() {
        if (this.stomach > 0) {
            if (this.stomach > this.metabolism) {
                this.stomach -= this.metabolism;
                this.energy += this.metabolism;
            } else {
                this.energy += this.stomach;
                this.stomach = 0;
            }
        }
    }

    useEnergy(amount) {
        if (this.energy < amount) {
            return false;
        }

        this.energy -= amount;
        return true;
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
        new Egg(this.pos.x, this.pos.y, this.genes);
        this.energy -= 500;
    }

    eat() {
        if (this.nearestFood) {
            if (this.nearestCreature) {
                if (this.nearestFoodDistance > this.nearestCreatureDistance) {
                    if (this.collison(this.nearestCreature) && this.sizeRatio >= this.nearestCreature.sizeRatio) {
                        this.stomach += this.nearestCreature.consume(this.stomachSize - this.stomach);
                    }
                } else {
                    if (this.nearestFood.collison(this)) {
                        this.stomach += this.nearestFood.consume(this.stomachSize - this.stomach);
                    }
                }
            }
        }
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

        let nearCreature;

        for (let creature of creatures) {
            if (creature !== this) {
                if (nearCreature === undefined) {
                    nearCreature = creature;
                } else if (this.distance(nearCreature) > this.distance(creature)) {
                    nearCreature = creature;
                }
            }
        }

        return nearCreature
    }
}


class Carnivore extends Creature {

    constructor(x, y, genes) {
        super(x, y, genes, false);
    }

    eat() {
        if (this.nearestCreature) {
            if (this.collison(this.nearestCreature) && this.sizeRatio >= this.nearestCreature.sizeRatio) {
                this.stomach += this.nearestCreature.consume(this.stomachSize - this.stomach);
            }
        }
    }

}


class Herbivore extends Creature {

    constructor(x, y, genes) {
        super(x, y, genes, true);
    }

    eat() {
        if (this.nearestFood) {
            if (this.collison(this.nearestFood)) {
                this.stomach += this.nearestFood.consume(this.stomachSize - this.stomach);
            }
        }
    }

}

function makeCarnivore(x, y, genes) {
    if (settings.kindOfCreatures !== 1) {
        new Carnivore(x, y, genes);
    } else {
        if (genes !== undefined) {
            genes.isHerbivore = true;
        }
        new Herbivore(x, y, genes);
    }
}

function makeHerbivore(x, y, genes) {
    if (settings.kindOfCreatures !== 2) {
        new Herbivore(x, y, genes);
    } else {
        if (genes !== undefined) {
            genes.isHerbivore = false;
        }
        new Carnivore(x, y, genes);
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
    if (inst > 0.3) {
        inst = 0.3;
    } else if (inst < -0.3) {
        inst = -0.3
    }
    creature.facing.rotate(-inst);
    creature.energy -= creature.energyRatio * inst;
}

function right(inst, creature) {
    if (inst > 0.3) {
        inst = 0.3;
    } else if (inst < -0.3) {
        inst = -0.3
    }
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
