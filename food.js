let foods = [];

class Edible extends Entity{
    constructor (x, y, shapes, entityArray) {
        super(x, y, shapes, entityArray);
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

class Pellet extends Edible{
    constructor(x, y, energy) {
        let maxEnergy = 750;
        if (energy === undefined) {
            energy = maxEnergy;
        }
        super(x, y, [["c", 0, 0, color(41, 140, 72), energy*10/maxEnergy]], foods);
        
        this.maxEnergy = maxEnergy;
        this.energy = energy;
        this.maxEnergy = energy;
        this.size = this.energy/this.maxEnergy;
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);
        super.display();
        pop();
    }

    update() {
        this.size = this.energy/this.maxEnergy;
        let circles = this.getCircles();
        circles[0].d = this.size * 10;
        this.setCircles(circles)
        this.trueSize = this.size * 10;
    }
}
