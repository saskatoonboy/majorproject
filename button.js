class Button {
    constructor(x, y, width, height, text, size, colour, func, button) {
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
        this.f = func;
        this.button = button;
        this.text = text;
        this.colour = colour;
        this.isHover = false;
        this.textSize = size;
    }

    display() {
        if (this.hidden) {
            return;
        }

        strokeWeight(1);
        fill(this.colour);
        rect(this.x, this.y, this.w, this.h);
        if (this.isHover) {
            fill(0, 25);
            rect(this.x, this.y, this.w, this.h);
        }
        fill(0);
        textSize(this.size);
        textAlign(CENTER, CENTER);
        text(this.text, this.x, this.y, this.w, this.h);
    }

    hover(x, y) {
        this.isHover = x >= this.x && x <= this.w && y >= this.y && y <= this.h;
    }

    click(button) {
        if (!this.hidden) {
            if (this.button !== null) {
                if (button !== this.button) {
                    return false;
                }
            }
    
            if (this.isHover) {
                this.f();
            }
    
            return true;
        }
        return false;
    }

    hide() {
        this.hidden = true;
    }

    show() {
        this.hidden = false;
    }
}
