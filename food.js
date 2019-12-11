
class Edible extends Entity{
    constructor (x, y, shapes) {
        super(x, y, shapes);
    }
}

class Pellet extends Edible{
    constructor(x, y, energy) {
        let maxEnergy = 500;
        if (energy === undefined) {
            energy = maxEnergy;
        }
        super(x, y, [["c", 0, 0, color(41, 140, 72), energy*10/maxEnergy]]);
        
        this.maxEnergy = maxEnergy;
        this.energy = energy;
        this.maxEnergy = energy;
        this.size = this.energy/this.maxEnergy;
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);
        noStroke();
        this.draw();
        pop();
    }

    update() {
        this.size = this.energy/this.maxEnergy;
        let circles = this.getCircles();
        circles[0].d = this.size * 10;
        this.setCircles(circles)
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
