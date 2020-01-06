let force;
let planet;
let sun;
var img = ["images/blueP-01.jpg", "images/moon2-01.jpg", "images/orenP-01.jpg", "images/whitP-01.jpg", "images/greenP-01.jpg", "images/yellP-01.jpg", "images/cyanP-01.jpg", "images/dotP-01.jpg"]; //array that stores the images you want to use for random planets





function preload() {
    images = loadImage(random(img)); // 
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL)

    // Mover is the object that orbits, (smaller circle)
    // Attractor is the one that pulls the object in (Bigger circle)
    noStroke();
    planet = new Planet(50);
    sun = new Sun(100);



}

function draw() {
    noStroke();
    background(20);

    ambientMaterial('#1C75AA');
    ambientLight(200);
    directionalLight(255, 255, 255, 0, 0, 1);


    force = new p5.Vector();
    force = sun.attract(planet);


    planet.applyForce(force);
    planet.update();

    sun.display();
    planet.display(10);

}