class Planet extends Sun {


    constructor(planetR) {
        super();
        this.planetR = planetR;
        this.mass = planetR * 10;
        this.position = createVector(0, 0, 250);
        this.velocity = createVector(2, 0, 0);
        this.acceleration = createVector(0, 0, 0);
        this.rot = 0;


    }
    applyForce(force) {
        force = p5.Vector.div(force, this.mass)
        this.acceleration.add(force)
    }
    move() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0); // reset acceleration


    }
    updateSize(newPlanetSize) {
        this.planetR = newPlanetSize;


        sphere(this.planetR);
    }

    display() {

        push();
        noStroke();
        texture(images);
        translate(this.position.x, this.position.y, this.position.z);
        rotateY(this.rot);
        sphere(this.planetR);

        this.rot += 0.02;
        pop();
    }


}
