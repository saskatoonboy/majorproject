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
        const data = {
            front : 0,
            back : 0,
            left : 0,
            right : 0,
            brightNeed : 0,
            eatNeed : 0,
            mateNeed : 0,
            resetTimer : 0,
            com1 : 0,
            com2 : 0,
            com3 : 0
        };

        for (let i = 0; i < 20; i++) {

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
    }

    getGene() {
        return new NodeGene(this.identificationNumber, this.function);
    }
}

class Connection {

    //constructor
    constructor(from, to, weight) {
        this.identificationNumber = connections.length;
        this.from = from;
        this.to = to;
        this.enabled = true;
        
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
}