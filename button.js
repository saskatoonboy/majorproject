class Button {
    constructor(x, y, width, height, text, size, colour, func, button, hideOnClick, hoverEffect = true) {
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
        this.autoHide = hideOnClick;
        this.hoverEffect = hoverEffect;
        buttons.push(this);
    }

    display() {
        if (this.hidden) {
            return;
        }

        noStroke();
        fill(this.colour);
        rect(this.x, this.y, this.w, this.h);
        if (this.isHover && this.hoverEffect) {
            fill(0, 25);
            rect(this.x, this.y, this.w, this.h);
        }
        fill(0);
        textSize(this.textSize);
        textAlign(CENTER, CENTER);
        text(this.text, this.x, this.y, this.w, this.h);
    }

    hover(x, y) {
        this.isHover = x >= this.x && x <= this.x + this.w && y >= this.y && y <= this.y + this.h;
    }

    click(button) {
        if (!this.hidden) {
            if (this.button !== undefined) {
                if (button !== this.button) {
                    print(this.button);
                    return false;
                }
            }
    
            if (this.isHover) {
                this.f();
                if (this.autoHide) {
                    this.hide();
                }
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
