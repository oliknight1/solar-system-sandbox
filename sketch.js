 let force;
 let planet;
 let sun;


 function setup() {
     createCanvas(windowWidth, windowHeight, WEBGL)

     // Mover is the object that orbits, (smaller circle)
     // Attractor is the one that pulls the object in (Bigger circle)
     planet = new Planet(50);
     sun = new Sun(100);

 }

 function draw() {
     background(30);

     force = new p5.Vector();
     force = sun.attract(planet);


     planet.applyForce(force);
     planet.update();

     sun.display();
     planet.display();

 }