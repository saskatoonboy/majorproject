let instructionFunctions = [forward];

// creature that is evolving over time
class Creature {
    // construct the creature class
    constructor(x, y, genes) {
        this.energy = 100;
        this.stomach = 0;
        this.health = 100;
        this.pos = createVector(x, y);
        this.facing = createVector(floor(random(0, width)), floor(random(0, height))).sub(this.pos).normalize();

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

        this.brain = new Brain(gene.brainGenes);
    }

    // display the creature on screen
    display() {
        noStroke();
        let angle = this.facing.heading()+1.5;
        push();
        translate(this.pos.x, this.pos.y);
        rotate(angle);
        fill(this.red, this.green, this.blue);
        circle(0, 0, this.sizeRatio*50);
        triangle(-this.sizeRatio*25, 0, this.sizeRatio*25, 0, 0, -sqrt(((this.sizeRatio*50)**2)-((this.sizeRatio*25)**2)));
        pop();
    }

    // update the creature
    update() {
        let data = this.brain.getData(this.constantValue, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

        for (let i = 0; i < instructionFunctions.length; i++) {
            let num = data[i];
            instructionFunctions[i](num, this);
        }
    }
}

function forward(inst, creature) {
    if (inst === 1) {
        creature.pos.add(creature.facing.copy().mult(creature.speedRatio));
    }
}