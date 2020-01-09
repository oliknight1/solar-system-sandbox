class Moon extends Planet {
    constructor(moonR) {
        super();
        this.moonR = moonR;
        this.position = createVector(0, 0, 350);
        this.velocity = createVector(10, 0, 0);
        this.moonImg = loadImage("images/moon-01.jpg");

    }
    display() {

        push();
        noStroke();
        texture(this.moonImg); //load planet images
        translate(this.position.x, this.position.y, this.position.z);
        rotateY(this.rot); //rotate by the rot variable
        sphere(this.moonR);
        this.rot += 0.02; //the amount the planet rotates
        pop();
    }
    updateSize(newMoonSize) {
        this.moonR = newMoonSize;
        sphere(this.moonR);
    }
}