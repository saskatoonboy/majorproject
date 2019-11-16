class Creature {
    constructor() {
        this.energy = 100;
        this.stomach = 0;
        this.size = 1;
        this.pos = createVector(random(0, width), random(0, height));
    }

    display() {
        noStroke();
        translate(this.pos.x, this.pos.y);
        circle(0, 0, this.size*50);
        triangle(-this.size*25, 0, this.size*25, 0, 0, -sqrt(((this.size*50)**2)-((this.size*25)**2)));
        translate(-this.pos.x, -this.pos.y);
    }
}