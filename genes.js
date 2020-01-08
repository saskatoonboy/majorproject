let gene = {
    randomGenes : function(isHerbivore) {
        return geneTemplate = {
            herbivore : isHerbivore,
            speed : floor(random(0, 1.01)*100)/100,
            size : floor(random(0.1, 1.01)*100)/100,
            red : floor(random(0, 256)),
            green : floor(random(0, 256)),
            blue : floor(random(0, 256)),
            mutationChance : floor(random(0, 1.01)*100)/100,
            timeToHatch : random(500, 5000),
            strength : floor(random(0, 1.01)*100)/100,
            angleOfVision : floor(random(-90, 90.01)*100)/100,
            distanceOfVision : random(10, 1001),
            timerSpeed : floor(random(0, 1.01)*100)/100,
            communicationSensitivity : floor(random(0, 1.01)*100)/100,
            constant : random(),
            metabolism : floor(random(1, 6)),
            brainGenes : undefined
        };
    }
};

// Brain Genes

class BrainGenenome {

    // constructor
    constructor(connectionGenes, nodeGenes) {

        this.connectinonGenes = connectionGenes;
        this.nodeGenes = nodeGenes;

    }

    // get a list of nodes from the connection genenome
    unpackNodes() {
        let localNodes = [];
        for (let nodeGene of this.nodeGenes) {
            localNodes.push(nodeGene.getNode());
        }
        return localNodes;

    }

    // get a list of connections from the connection genenome
    unpackConnections() {
        let localConnections = [];
        for (let connectionGene of this.connectinonGenes) {
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

class NodeGene {
    
    // constructior
    constructor(identification, kind, func) {
        this.identificationNumber = identification;
        this.kind = kind;
        this.func = func;
    }

    getNode() {
        return new Node(this.identificationNumber, this.kind, this.func);
    }
}
