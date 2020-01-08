let eggs = [];

class Egg extends Entity {
    constructor(x, y, genes) {
        super(x, y, [["c", 0, 0, color(genes.red, genes.green, genes.blue), 25]], eggs)
        this.timeTillHatch = genes.timeToHatch;
        this.lastTimeUpdated = millis();
        this.genes = genes;
    }

    display() {
        push();

        translate(this.pos.x, this.pos.y);
        super.display();

        pop();
    }

    update() {
        this.timeTillHatch -= millis() - this.lastTimeUpdated;
        this.lastTimeUpdated = millis();

        if (this.timeTillHatch <= 0) {
            this.hatch();
        }
    }

    hatch() {
        this.remove();

        let creature;

        if (this.genes.herbivore === 1) {

            creature = new Herbivore(this.pos.x, this.pos.y, this.genes)
        
        } else {

            creature = new Carnivore(this.pos.x, this.pos.y, this.genes)
        
        }




        for (let i = 0; i < 5; i++) {
            creature.mutate();
        }


    }
}
