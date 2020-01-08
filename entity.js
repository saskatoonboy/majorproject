

class Entity {
    constructor(x, y, shapes, entityArray) {
      this.pos = createVector(x, y);
      this.entityArray = entityArray;
      this.trueSize = 0;
      this.circles = [];
      this.triangles = [];
      this.rectangles = [];
      for (let shape of shapes) {
        if (shape[0] === "c") {
          this.circles.push({x: shape[1], y: shape[2], d: shape[4], colour: shape[3]});
        } else if (shape[0] === "r") {
          this.rectangles.push({x: shape[1], y: shape[2], l: shape[4], w: shape[5], colour: shape[3]});
        } else if (shape[0] === "t") {
          this.triangles.push({x: shape[1], y: shape[2], p: shape[4], colour: shape[3]});
        }
      }
  
      if (entityArray !== undefined) {
        entityArray.push(this);
      }
    }
  
    display() {
      noStroke();
      for (let shape of this.circles) {
        fill(shape.colour);
        circle(shape.x, shape.y, shape.d);
      }
      for (let shape of this.rectangles) {
        fill(shape.colour);
        rect(shape.x, shape.y, shape.w, shape.l);
      }
      for (let shape of this.triangles) {
        fill(shape.colour);
        triangle(shape.x + shape.p.x1, shape.y + shape.p.y1, shape.x + shape.p.x2, shape.y + shape.p.y2, shape.x + shape.p.x3, shape.y + shape.p.y3);
      }
    }
  
    remove() {
      if (this.entityArray !== undefined) {
        this.entityArray.splice(this.entityArray.indexOf(this), 1);
      }
    }
  
    getCircles() {
      return this.circles;
    }
  
    setCircles(circles) {
      this.circles = circles;
    }
  
    collison(obj) {
        return obj.distance(this) <= obj.trueSize/2+this.trueSize/2;
    }
  
    distance(obj) {
        return this.distanceVector(obj).mag();
    }
  
    distanceVector(obj) {
        return this.pos.copy().sub(obj.pos);
    }
  }