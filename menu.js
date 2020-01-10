class TextBox {
    constructor(x, y, w, h, t, s) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.text = t;
        this.textSize = s;
    }

    display() {
        fill(0);
        textSize(this.textSize);
        textAlign(CENTER, CENTER);
        text(this.text, this.x, this.y, this.width, this.height);
    }
}

class Menu {
    constructor(x, y, w, h, bgColour, btnColour) {
        this.hidden = true;
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.bgColour = bgColour;
        this.btnColour = btnColour;
        this.buttons = [];
        this.textBoxes = [];

        menus.push(this);
    }

    addButton(x, y, w, h, t, s, f, b) {
        this.buttons.push(new Button(x, y, w, h, t, s, this.btnColour, f, b));
    }

    addText(x, y, width, height, text, size) {
        this.textBoxes.push(new TextBox(x, y, width, height, text, size));
    }

    display() {
        if (!this.hidden) {

            fill(this.bgColour);
            rect(this.x, this.y, this.width, this.height);

            for (let button of this.buttons) {
                button.display();
            }

            for (let textBox of this.textBoxes) {
                textBox.display();
            }
        }
    }

    hover(x, y) {
        if (!this.hidden) {
            for (let button of this.buttons) {
                button.hover(x, y);
            }
        }
    }

    click(x, y, mouseButton) {
        if (!this.hidden) {
            if (x >= this.x && x <= this.width && y >= this.y && y <= this.height) {

                for (let button of this.buttons) {
                    print(button);
                    button.click(mouseButton);
                }

                return true;
            }
        }

        return false;
    }

    hide() {
        this.hidden = true;
        for (let button of this.buttons) {
            button.hide();
        }
    }

    show() {
        this.hidden = false;
        for (let button of this.buttons) {
            button.show();
        }
    }
}