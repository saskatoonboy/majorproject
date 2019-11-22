// Functions:
// - 
let connections = [];
const inputNodeCnt = 20;
const outputNodeCnt = 11;
const clampMax = 1;
const clampMin = 0;
const activeFncs = [sign, clamp, round, sigmoid, nothing, square, cube, absolute, root, binary];

class Brain {

    //constructor
    constructor(genes) {
        if (genes === undefined) {
            this.nodes = [];
            this.connections = [];

            for (let i = 0; i < inputNodeCnt; i++) {
                this.nodes.push(new Node(this.nodes.length, true));
            }

            for (let i = 0; i < outputNodeCnt; i++) {
                this.nodes.push(new Node(this.nodes.length, false));
            }
            
        } else {
            this.nodes = genes.unpackNodes();
            this.connections = genes.unpackConnections();
        }
    };

    getGenenome() {

        let connectionGenes = [];

        for (let connection of this.connections) {
            connectionGenes.push(connection.getGene());
        }

        return new BrainGenenome(connectionGenes, nodeGenes);

    }

    getData(constant, hunger, maturity, health, speed, disNearCreature, angNearCreature, disNearFood, angNearFood, creatureCnt, foodCnt, red, green, blue, toggle, timer, lifeTime, com1, com2, com3) {
        let data = [];
        let input = [constant, hunger, maturity, health, speed, disNearCreature, angNearCreature, disNearFood, angNearFood, creatureCnt, foodCnt, red, green, blue, toggle, timer, lifeTime, com1, com2, com3];
        
        for (let i = 0; i < inputNodeCnt; i++) {
            this.nodes[i].value = input[i];
        }

        for (let i = inputNodeCnt; i < inputNodeCnt + outputNodeCnt; i++) {
            this.nodes[i].verifyInputs();
            this.nodes[i].calculate()
            data.push(this.nodes[i].value);
        }

        this.reset();

        for (let i = 0; i < data.length; i++) {
            if (Number.isNaN(data[i])) {
                data[i] = 0;
            }
        }

        return data;
    }

    reset() {
        for (let node of this.nodes) {
            node.reset();
        }

        for (let connection of this.connections) {
            connection.reset();
        }
    }

    mutate(chance) {
        let comparison = floor(random(101))/100;
        if (chance >= comparison) {
            print("mutated", chance, comparison);
        }
    }
}

class Node {

    //constructor
    constructor(identNum, kind, fnc) {
        this.identificationNumber = identNum;
        // true = input, false = output, undefinded = hidden
        this.kind = kind;
        this.inputs = [];
        this.outputs = [];
        this.value;
        this.function = fnc;

        if (this.function === undefined) {
            this.function = floor(random(0, activeFncs.length));
        }
    }

    getGene() {
        return new NodeGene(this.identificationNumber, this.function);
    }

    reset() {
        this.value = undefined;
    }

    calculate() {
        let sum = 0;

        for (let input of this.inputs) {
            sum += input.value * input.weight;
        }
        this.value = activeFncs[this.function](sum);
    }
    
    verifyInputs() {
        for (let input of this.inputs) {
            if (input.value === undefined) {
                input.verifyInput();
                input.calculate();
            }
        }
    }
}

class Connection {

    //constructor
    constructor(from, to, weight) {
        this.identificationNumber = connections.length;
        this.from = from;
        this.from.outputs.push(this);
        this.to = to;
        this.to.inputs.push(this);
        this.enabled = true;
        this.value;
        
        if (weight === undefined) {
            this.weight = floor(random(-1, 1.01)*100)/100;
        } else {
            this.weight = weight;
        }

        connections.push(this);
    }

    reset() {
        this.value = undefined;
    }

    getGene() {
        return new ConnectionGene(this.identificationNumber, this.from, this.to, this.enabled, this.weight);
    }

    calculate() {
        this.value = this.from.value;
    }

    verifyInput() {
        if (this.from.value === undefined) {
            this.from.verifyInputs();
            this.from.calculate();
        }
    }
}

function sign(num) {
    if (num >= 0) {
        return 1;
    } else {
        return -1;
    }
}

function clamp(num) {
    if (num > clampMax) {
        return clampMax;
    } else if (num < clampMin) {
        return clampMin;
    }

    return num;
}

function round(num) {
    return floor(num+0.5);
}

function sigmoid(num) {
    return 1/(1+exp(-num));
}

function nothing(num) {
    return num;
}

function square(num) {
    return num * num;
}

function cube(num) {
    return square(num) * num;
}

function absolute(num) {
    return abs(num);
}

function root(num) {
    return sqrt(num);
}

function binary(num) {
    if (num > 0) {
        return 1;
    }

    return 0;
}
