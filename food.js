class Pellet {
    constructor(x, y, energy) {
        this.maxEnergy = 500;
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
        translate(this.pos.x, this.pos.y);
        fill(41, 140, 72);
        circle(0, 0, this.size*10);
        translate(-this.pos.x, -this.pos.y);
    }

    update() {
        this.size = this.energy/this.maxEnergy;
    }

    collison(creature) {
        return creature.distance(this) <= creature.sizeRatio*25+this.size*5;
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