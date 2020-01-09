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

            for (button of this.buttons) {
                button.display();
            }

            for (textBox of this.textBoxes) {
                textBox.display();
            }
        }
    }

    hide() {
        this.hidden = true;
        for (button of this.buttons) {
            button.hide();
        }
    }

    show() {
        this.hidden = false;
        for (button of this.buttons) {
            button.show();
        }
    }
}