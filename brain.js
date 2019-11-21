// Functions:
// - 
let connections = [];

class Brain {

    //constructor
    constructor(genes) {
        if (genes === undefined) {
            this.nodes = [new Node(true, 0), 
                new Node(true, 1), 
                new Node(true, 2), 
                new Node(true, 3), 
                new Node(true, 4), 
                new Node(true, 5), 
                new Node(true, 6), 
                new Node(true, 7), 
                new Node(true, 8), 
                new Node(true, 9), 
                new Node(true, 10), 
                new Node(true, 11), 
                new Node(true, 12), 
                new Node(true, 13), 
                new Node(true, 14), 
                new Node(true, 15), 
                new Node(true, 16), 
                new Node(true, 17), 
                new Node(true, 18), 
                new Node(true, 19), 
                new Node(false, 20), 
                new Node(false, 21), 
                new Node(false, 22), 
                new Node(false, 23), 
                new Node(false, 24), 
                new Node(false, 25), 
                new Node(false, 26), 
                new Node(false, 27), 
                new Node(false, 28), 
                new Node(false, 29), 
                new Node(false, 30)];
            this.connections = [new Connection(this.nodes[0], this.nodes[20], 1)];
        } else {
            this.nodes = genes.unpackNodes();
            this.connections = genes.unpackConnections();
        }
        
        for (let connection of this.connections) {
            this.nodes[connection.from.identificationNumber].outputs.push(this);
            this.nodes[connection.to.identificationNumber].inputs.push(this);
        }
    };

    getGenenome() {

        let connectionGenes = [];

        for (let connection of this.connections) {
            connectionGenes.push(connection.getGene());
        }

        return new BrainGenenome(connectionGenes, nodeGenes);

    }

    getData(constant, hunger, maturity, health, speed, disNearCreature, angNearCreature, disNearFood, andNearFood, creatureCnt, foodCnt, red, green, blue, toggle, timer, lifeTime, com1, com2, com3) {
        this.reset();
        
        const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        inputData = [constant, hunger, maturity, health, speed, disNearCreature, angNearCreature, disNearFood, andNearFood, creatureCnt, foodCnt, red, green, blue, toggle, timer, lifeTime, com1, com2, com3];

        for (let i = 0; i < 20; i++) {
            this.nodes[i].value = inputData[i];
        }

        for (let i = 20; i < 31; i++) {
            data[i-20] = this.nodes[i].calculate();
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
}

class Node {

    //constructor
    constructor(kind, ident) {
        this.identificationNumber = ident;
        // true = input, false = output, undefinded = hidden
        this.kind = kind;
        this.inputs = [];
        this.outputs = [];
        this.value;
    }

    getGene() {
        return new NodeGene(this.identificationNumber, this.function);
    }

    reset() {
        this.value = undefined;
    }

    calculate() {
        if (this.kind) {
            getDataValue();
        } else {
            for (let input of this.inputs) {
                input.verifyInput();
            }
        }
    }

    verifyInputs() {
        for (let input of this.inputs) {
            if (input.value === undefined) {
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

    reset() {
        this.value = undefined;
    }

    getGene() {
        return new ConnectionGene(this.identificationNumber, this.from, this.to, this.enabled, this.weight);
    }

    calculate() {
        
    }

    verifyInput() {
        if (this.from.value === undefined) {
            this.from.calculate();
        }
    }
}