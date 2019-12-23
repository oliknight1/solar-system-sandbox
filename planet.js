class Planet {
    constructor() {
        this.position = createVector(0, 0, 100);
        this.velocity = createVector(0.6, 0, 0);
        this.acceleration = createVector(0, 0, 0);
        this.mass = 2
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
    display() {
        push()
        fill(0, 100, 255)
        translate(this.position.x, this.position.y, this.position.z)
        sphere(this.mass * 10)
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