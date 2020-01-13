class Moon extends Planet {
    constructor(moonR) {
        super();
        this.moonR = moonR;

        this.position = createVector(0, 0, 450);
        this.velocity = createVector(10, 0, 0);
        this.moonImg = loadImage("images/moon-01.jpg");

    }
    display() {

        push();
        noStroke();
        // Load planet image
        texture(this.moonImg);
        translate(this.position.x, this.position.y, this.position.z);
        rotateY(this.rot);
        sphere(this.moonR);
        // Amount the planet rotates by
        this.rot += 0.02;
        pop();
    }
    // Update the size of the moon with the latest value from the slider
    updateSize(newMoonSize) {
        this.moonR = newMoonSize;
        sphere(this.moonR);
    }
}