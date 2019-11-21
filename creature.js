let instructionFunctions = [forward, back, left, right, wantToGiveBirth, wantToEat, wantToMate, resetTimer, com1, com2, com3];

// creature that is evolving over time
class Creature {
    // construct the creature class
    constructor(x, y, genes) {
        // base stats of creature
        this.energy = 100;
        this.stomach = 0;
        this.health = 100;
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

        // create bratin
        this.brain = new Brain(gene.brainGenes);
    }

    // display the creature on screen
    display() {
        // remove the stroke
        noStroke();
        let angle = this.facing.heading()+1.5;
        push();
        // translate to allow rotation
        translate(this.pos.x, this.pos.y);
        // rotate based of the direction the creature is facing 1.5 is a constant to offset the heading value properly
        rotate(angle);
        // color the creature based of its genes
        fill(this.red, this.green, this.blue);
        // draw the creature
        circle(0, 0, this.sizeRatio*50);
        triangle(-this.sizeRatio*25, 0, this.sizeRatio*25, 0, 0, -sqrt(((this.sizeRatio*50)**2)-((this.sizeRatio*25)**2)));
        pop();
    }

    // update the creature
    update() {
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
    }
}

// move the creature forward if the brain sent a 0.5 or greater
function forward(inst, creature) {
    if (inst >= 0.5) {
        creature.pos.add(creature.facing.copy().mult(creature.speedRatio));
    }
}

function back(inst, creature) {
    if (inst >= 0.5) {
        creature.pos.sub(creature.facing.copy().mult(creature.speedRatio));
    }
} 

function left(inst, creature) {
    creature.facing.rotate(-inst);
}

function right(inst, creature) {
    creature.facing.rotate(inst);
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
