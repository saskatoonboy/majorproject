let gene = {
    randomGenes : function() {
        return geneTemplate = {
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
            timerSpeed : floor(random(1,101)),
            communicationSensitivity : floor(random(0, 1.01)*100)/100,
            constant : random()
        };
    }
};

// Brain Genes

class BrainGenenome {

    // constructor
    constructor(connectionGenes) {

        this.connectinonGenes = connectionGenes;
        this.nodeGenes = nodeGenes;

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