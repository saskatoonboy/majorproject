let instructionFunctions = [forward];

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
        let data = this.brain.getData(this.constantValue, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

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
    }
}

// move the creature forward if the brain sent a 0.5 or greater
function forward(inst, creature) {
    if (inst >= 0.5) {
        creature.pos.add(creature.facing.copy().mult(creature.speedRatio));
    }
}