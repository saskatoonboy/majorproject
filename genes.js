// this is a global object with a function return a completely random gene
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
            distanceOfVision : random(10, 101),
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

    // constructor stores given genes in the object
    constructor(connectionGenes, nodeGenes) {

        this.connectinonGenes = connectionGenes;
        this.nodeGenes = nodeGenes;

    }

    // get a list of nodes from the connection gene
    unpackNodes() {
        // array for the nodes
        let localNodes = [];

        // loop through the node genes
        for (let nodeGene of this.nodeGenes) {
            // push the node generated from the node gene to the local variable
            localNodes.push(nodeGene.getNode());
        }
        
        // return the local array variable
        return localNodes;

    }

    // get a list of connections from the connection gene
    unpackConnections() {
        // local array for the connections
        let localConnections = [];

        // loop through the connection genes
        for (let connectionGene of this.connectinonGenes) {
            // push the connection generated from the connection gene to the local array
            localConnections.push(connectionGene.getConnection());
        }

        // retunr the local array variable
        return localConnections;
    }
}

// used to store information required to create a connection (I made this with more functionallity then removed it but didnt want to rewrite the parts of my code that used this class to transfer the brain from a parent to child)
class ConnectionGene {
    
    // constructior stores all essential give data to class attributes
    constructor(identification) {
        this.identificationNumber = identification;
    }

    // get the connection out of the global connections array
    getConnection() {
        return connections[this.identificationNumber];
    }
}

// used to store information required to create a node
class NodeGene {
    
    // constructior stores all essential data to create the same node
    constructor(identification, kind, func) {
        this.identificationNumber = identification;
        this.kind = kind;
        this.func = func;
    }

    getNode() {
        return new Node(this.identificationNumber, this.kind, this.func);
    }
}
