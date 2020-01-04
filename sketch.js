let planet;
let sun;


let force;
let force2;

/* Use the const with .value when creating the planet to use the default size on the slider,
 * then use updateSizen with the let as the parameter
 */

const planetSize = document.querySelector("#planet-size");
let planetSizeValue;

const sunSize = document.querySelector("#sun-size");
let sunSizeValue = 0;

// Getting the height and width if the div the canvas is in
const div = document.getElementById("sketch-canvas");
let divWidth = div.offsetWidth;
let divHeight = div.offsetHeight;



function setup() {

    // Add the sketch to the div 
    const sketchCanvas = createCanvas(divWidth, divHeight, WEBGL);
    sketchCanvas.parent("sketch-canvas")


    sun = new Sun(sunSize.value);

    planet = new Planet(planetSize.value);





}


function draw() {
    force = new p5.Vector();

    planetSizeValue = planetSize.value;
    sunSizeValue = sunSize.value;
    background(30);


    force = sun.attract(planet);


    planet.applyForce(force);




    planet.move();


    planet.updateSize(planetSizeValue);
    sun.updateSize(sunSizeValue);
    sun.display();
    planet.display();

}
// Makes sure canvas stays the same size when the browser is resized
function windowResized() {
    createCanvas(divWidth, divHeight, WEBGL);
}