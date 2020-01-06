
class Planet {

    constructor(r) {
        this.position = createVector(0, 0, 150);
        this.velocity = createVector(2.2, 2.2, 0);
        this.acceleration = createVector(0, 0, 0);
        this.r = r;
        this.mass = r * 10
    }
    applyForce(force) {
        force = p5.Vector.div(force, this.mass)
        this.acceleration.add(force)
    }
    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0); // reset acceleration
    }
    display(rot) {

        push()
        noStroke();
        texture(images); // display one of the images
        translate(this.position.x, this.position.y, this.position.z)
        rotateY(rot); //rotate the planet on the y axis are the speed the variable says
        sphere(this.r)
        rot += 0.01;  //the speed the planet rotates
        pop()
    }
    checkEdges() {
        if (this.position.x > width) {
            this.position.x = 0
        } else if (this.position.x < 0) {
            this.position.x = width;
        }
        if (this.position.y > height) {
            this.velocity *= -1;
            this.position.y = height
        }
    }
}