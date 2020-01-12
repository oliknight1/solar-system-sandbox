class Planet extends Sun {
    constructor(planetR) {
        super();
        this.planetR = planetR;
        this.mass = planetR * 10;
        this.position = createVector(0, 0, 250);
        this.velocity = createVector(2, 0, 0);
        this.acceleration = createVector(0, 0, 0);
        this.rot = 0; //setting default rotating value 
    }

    // Apply the force recvieved as the parameter to the acceleration
    applyForce(force) {
        force = p5.Vector.div(force, this.mass)
        this.acceleration.add(force)
    }
    move() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0); // reset acceleration
    }

    // Update the size of the planet with the latest value from the slider
    updateSize(newPlanetSize) {
        this.planetR = newPlanetSize;
        sphere(this.planetR);
    }

    display() {
        pointLight(255,255,255, 0, 0, 0);
        ambientLight(100);

        push();
        noStroke();
        
        texture(planetImg); //load planet images
        translate(this.position.x, this.position.y, this.position.z);
        rotateY(this.rot); //rotate by the rot variable
        sphere(this.planetR);
        this.rot += 0.02; //the amount the planet rotates
        pop();
    }

}