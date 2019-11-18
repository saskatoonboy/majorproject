let nodes = [];
let connections = [];
let basicBrain = {
    nodes : [],
    connections : [],
};

function setupBasicBrain() {
    basicBrain.nodes = [new Node(true), 
                        new Node(true), 
                        new Node(true), 
                        new Node(true), 
                        new Node(true), 
                        new Node(true), 
                        new Node(true), 
                        new Node(true), 
                        new Node(true), 
                        new Node(true), 
                        new Node(true), 
                        new Node(true), 
                        new Node(true), 
                        new Node(true), 
                        new Node(true), 
                        new Node(true), 
                        new Node(true), 
                        new Node(true), 
                        new Node(true), 
                        new Node(true), 
                        new Node(false), 
                        new Node(false), 
                        new Node(false), 
                        new Node(false), 
                        new Node(false), 
                        new Node(false), 
                        new Node(false), 
                        new Node(false), 
                        new Node(false), 
                        new Node(false), 
                        new Node(false)]
};

class Brain {

    //constructor
    constructor(genes) {
        if (genes === undefined) {
            this.nodes = basicBrain.nodes;
            this.connections = basicBrain.connections;
        } else {
            this.nodes = genes.unpackNodes();
            this.connections = genes.unpackConnections();
        }
    };

    getGenenome() {

        let connectionGenes = [];

        for (connection of this.connections) {
            connectionGenes.push(connection.getGene());
        }

        return new ConnectionGenenome(connectionGenes);

    }
}

class Node {

    //constructor
    constructor(kind) {
        this.identificationNumber = nodes.length;
        // true = input, false = output, undefinded = hidden
        this.kind = kind;

        nodes.push(this);
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