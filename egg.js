let eggs = []; // array of eggs so that I can run code on all eggs at once

class Egg extends Entity {
    // constructor needs the position of the eggs and the genes of the creautre laying the egg
    constructor(x, y, genes) {
        super(x, y, [["c", 0, 0, color(genes.red, genes.green, genes.blue), 25]], eggs); // passes any required information to create a entity
        this.timeTillHatch = genes.timeToHatch; // variable to track when the egg should automatically hatch
        this.lastTimeUpdated = millis(); // sets the time that the egg last hatched at the current time
        this.genes = genes; // store the parent genes in a variable
    }

    // method to display the creature
    display() {
        // translate the creautre to the proper position and draw the entity
        push();

        translate(this.pos.x, this.pos.y);
        super.display(); // run the super display function

        pop();
    }

    // method to update the egg hat times and hatch it when ready
    update() {
        // adds the diference in time from when it last hatched
        this.timeTillHatch -= millis() - this.lastTimeUpdated;
        this.lastTimeUpdated = millis();

        // if the time till hatch is less than or equal to 0 then hatch the egg
        if (this.timeTillHatch <= 0) {
            this.hatch();
        }
    }

    // method to hatch the egg
    hatch() {
        // remove the egg from existance (from entity class)
        this.remove();

        // declare a creature variable
        let creature;

        // if it is genetically an herbivore than make an herbivore
        if (this.genes.herbivore === 1) {

            creature = new Herbivore(this.pos.x, this.pos.y, this.genes)
        
        // if it is genetically a carnivore than make a carnivore
        } else {

            creature = new Carnivore(this.pos.x, this.pos.y, this.genes)
        
        }

        // mutate the creature
        creature.mutate();
    }
}
