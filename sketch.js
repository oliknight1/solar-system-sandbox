 let force;
 let planet;
 let sun;


 function setup() {
     createCanvas(640, 360, WEBGL)

     // Mover is the object that orbits, (smaller circle)
     // Attractor is the one that pulls the object in (Bigger circle)
     planet = new Planet();
     sun = new Sun();

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