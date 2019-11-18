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

class ConnectionGenenome {

    // constructor
    constructor(connectionGenes) {

        this.genes = connectionGenes;

    }

    // get a list of nodes from the connection genenome
    unpackNodes() {
        let nodesList = [];
        let localNodes = [];
        for (connectionGene of this.genes) {
            if (nodesList.indexOf(connectionGene.from) === -1) {
                nodesList.push(connectionGene.from);
            }
            if (nodesList.indexOf(connectionGene.to) === -1) {
                nodesList.push(connectionGene.to);
            }
        }

        nodesList.sort((a, b) => a - b);

        for (nodeId in nodesList) {
            localNodes = nodes[nodeId];
        }

        return localNodes;

    }

    // get a list of connections from the connection genenome
    unpackConnections() {
        let localConnections = [];
        for (connectionGene of this.genes) {
            localConnections.push(connectionGene.getConnection());
        }
        return localConnections;
    }
}

class ConnectionGene {
    
    // constructior
    constructor(identification, from, to, enabled, weight) {
        this.identificationNumber = identification;
        this.from = from;
        this.to = to;
        this.enabled = enabled;
        this.weight = weight;
    }

    getConnection() {
        return connections[this.identificationNumber];
    }
}
