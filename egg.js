
class Egg {
    constructor(x, y, genes) {
        this.timeTillHatch = genes.timeToHatch;
        this.lastTimeUpdated = millis();
        this.genes = genes;
        this.pos = createVector(x, y);
        this.color = color(genes.red, genes.green, genes.blue);
    }

    display() {
        noStroke();
        push();

        translate(this.pos.x, this.pos.y);
        fill(this.color);
        circle(0, 0, 25);

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
