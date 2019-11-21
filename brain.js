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
    constructor(kind) {
        this.identificationNumber = nodes.length;
        // true = input, false = output, undefinded = hidden
        this.kind = kind;
        this.inputs = [];
        this.outputs = [];

        nodes.push(this);
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