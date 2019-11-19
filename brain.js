// Functions:
// - 
let connections = [];
const inputNodeCnt = 20;
const outputNodeCnt = 11;

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
        
        for (connection of this.connections) {
            this.nodes[connection.from].outputs.push(this);
            this.nodes[connections.to].inputs.push(this);
        }
    };

    getGenenome() {

        let connectionGenes = [];

        for (connection of this.connections) {
            connectionGenes.push(connection.getGene());
        }

        return new BrainGenenome(connectionGenes, nodeGenes);

    }

    getData(constant, hunger, maturity, health, speed, disNearCreature, angNearCreature, disNearFood, andNearFood, creatureCnt, foodCnt, red, green, blue, toggle, timer, lifeTime, com1, com2, com3) {
        let data = [];
        let input = [constant, hunger, maturity, health, speed, disNearCreature, angNearCreature, disNearFood, andNearFood, creatureCnt, foodCnt, red, green, blue, toggle, timer, lifeTime, com1, com2, com3];

        for (let i = 0; i < inputNodeCnt; i++) {
            this.nodes[i].value = input[i];
        }

        for (let i = inputNodeCnt; i < inputNodeCnt + outputNodeCnt; i++) {
            this.nodes[i].calculate()
            data.push(this.nodes[i].value);
        }

        return data;
    }
}

class Node {

    //constructor
    constructor(identNum, kind) {
        this.identificationNumber = identNum;
        // true = input, false = output, undefinded = hidden
        this.kind = kind;
        this.inputs = [];
        this.outputs = [];
        this.value;
    }

    getGene() {
        return new NodeGene(this.identificationNumber, this.function);
    }

    calculate() {
        
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
        this.to = to;
        this.enabled = true;
        this.value;
        
        if (weight === undefined) {
            this.weight = floor(random(-1, 1.01)*100)/100;
        } else {
            this.weight = weight;
        }

        connections.push(this);
    }

    getGene() {
        return new ConnectionGene(this.identificationNumber, this.from, this.to, this.enabled, this.weight);
    }

    calculate() {
        this.value = input.value;
    }

    verifyInput() {
        if (this.input.value === undefined) {
            this.input.verifyInputs();
            this.input.calculate();
        }
    }
}