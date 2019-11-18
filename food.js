class Pellet {
    constructor(x, y, energy) {
        if (energy === undefined) {
            this.energy = 100;
        } else {
            this.energy = energy;
        }
        this.size = this.energy/100;
        this.pos = createVector(x, y);
    }

    display() {
        translate(this.pos.x, this.pos.y);
        fill(41, 140, 72);
        circle(0, 0, this.size*10);
        translate(-this.pos.x, -this.pos.y);
    }

    update() {
        this.size = this.energy/100;
    }
}