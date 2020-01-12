class Sun {
    constructor(sunR) {
        this.sunR = sunR;
        this.mass = sunR * 10;

        /* gravitational constant for equation
         * the actual number is 6.674 * Math.pow(10, -11), but doesn't need to be exact
         * might want to mess around with using the specific number though */
        this.G = 1
        this.position = createVector(0, 0, 0);

    }
    // this function is what creates the gravitational pull
    attract(p) {
        // this gets the direction of the force
        let force = new p5.Vector.sub(this.position, p.position);

        /* gets the magnitude (length) from force, which is the distance
         * between 2 objects 
         */
        let distance = force.mag();

        // constrain it so it's not out of control
        // distance = constrain(distance, 0, 0.0004);

        // normalize force as we just want to know the direction (turns it into a unit vector)
        force.normalize();
        // Uses the formula for gravity to compute strength of the force
        let strength = (this.G * this.mass * p.mass) / (distance * distance);


        force.mult(strength);
        // return force so it can but used in the applyForce() method of Mover
        return force;
    }

    // Update the size of the sun with the latest value from the slider

    updateSize(newSunSize) {
        this.sunR = newSunSize;
        sphere(this.sunR)
    }
    display() {

        
        noStroke();

        texture(sunImg);

        push();
        translate(this.position.x, this.position.y, this.position.z)
        ambientLight(200);
        directionalLight(200, 200, 200, -xPos.value/100, -yPos.value/100, -5 );
        sphere(this.sunR);
        pop();
    }

}