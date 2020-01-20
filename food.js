class Pellet {
    constructor(x, y, energy) {
        this.maxEnergy = 1000;
        if (energy === undefined) {
            this.energy = this.maxEnergy;
        } else {
            this.energy = energy;
            this.maxEnergy = energy;
        }
        this.size = this.energy/this.maxEnergy;
        this.pos = createVector(x, y);
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);
        noStroke();
        fill(41, 140, 72);
        circle(0, 0, this.size*10);
        pop();
    }

    update() {
        this.size = this.energy/this.maxEnergy;
    }

    collison(creature) {
        return creature.distance(this) <= creature.sizeRatio*12.5+this.size*5;
    }

    remove() {
        foods.splice(foods.indexOf(this), 1);
    }

    consume(stomachSpace) {
        if (stomachSpace >= this.energy) {
            this.remove();
            return this.energy;
        } else {
            this.energy -= stomachSpace;
            return stomachSpace;
        }
    }
}