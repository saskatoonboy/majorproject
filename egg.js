
class Egg extends Entity {
    constructor(x, y, genes) {
        super(x, y, [["c", 0, 0, color(genes.red, genes.green, genes.blue), 25]])
        this.timeTillHatch = genes.timeToHatch;
        this.lastTimeUpdated = millis();
        this.genes = genes;
    }

    display() {
        push();

        translate(this.pos.x, this.pos.y);
        this.draw();

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
        eggs.splice(eggs.indexOf(this), 1);

        let creature = new Creature(this.pos.x, this.pos.y, this.genes)

        creature.mutate();
        creatures.push(creature);
    }
}
