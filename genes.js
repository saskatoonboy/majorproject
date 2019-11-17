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
            communicationSensitivity : floor(random(0, 1.01)*100)/100
        };
    }
};