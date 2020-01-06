let planet;
let sun;
let force;
let force2;

let stars;
let starSize = 4500;



/* Variables for images*/
const img = ["images/blueP-01.jpg",
    "images/orenP-01.jpg", "images/whitP-01.jpg",
    "images/greenP-01.jpg", "images/yellP-01.jpg",
    "images/cyanP-01.jpg", "images/dotP-01.jpg"
];
let images;



/* Use the const with .value when creating the planet to use the default size on the slider,
 * then use updateSizen with the let as the parameter
 */

const planetSize = document.querySelector("#planet-size");
let planetSizeValue;

const sunSize = document.querySelector("#sun-size");
let sunSizeValue = 0;
// Links sliders from HTML values as the camera position
const xPos = document.querySelector("#x-position");
let xPosValue;

const yPos = document.querySelector("#y-position");
let yPosValue;

const zPos = document.querySelector("#z-position");
let zPosValue;

// Getting the height and width if the div the canvas is in
const div = document.getElementById("sketch-canvas");
let divWidth = div.offsetWidth;
let divHeight = div.offsetHeight;

 

// Event listener for Reset button for Camera HTML
document.querySelector('#reset').addEventListener("click",resetCamera) 

function preload() {

    stars = loadImage('img/stars.png');
    }

    images = loadImage(random(img));
}


function setup() {
    
 
    // Add the sketch to the div 
    const sketchCanvas = createCanvas(divWidth, divHeight, WEBGL);
    sketchCanvas.parent("sketch-canvas")


    sun = new Sun(sunSize.value);

    planet = new Planet(planetSize.value);

}


function draw() {
    background(0);
    push();
    texture(stars);
    box(4500,4500,4500);
    translate(0, 0, [0]);
    pop();

    // HTML values being assigned to variables
    xPosValue = xPos.value;
    yPosValue = yPos.value;
    zPosValue = zPos.value;


    force = new p5.Vector();

    planetSizeValue = planetSize.value;
    sunSizeValue = sunSize.value;
    




    force = sun.attract(planet);


    planet.applyForce(force);




    planet.move();


    planet.updateSize(planetSizeValue);
    sun.updateSize(sunSizeValue);
    sun.display();
    planet.display();
    //changes Camera parameters for  X,Y,Z 
    camera(xPosValue,yPosValue,constrain(zPosValue,sunSizeValue,1000), 0, 0, 0, 0,1, 0);
}
    
    

    
   
    
// Makes sure canvas stays the same size when the browser is resized
function windowResized() {
    createCanvas(divWidth, divHeight, WEBGL);
}


// 
// Reset camera buttons
function resetCamera(){
    document.getElementById('x-position').value = 0;
    document.getElementById('y-position').value = 0;
    document.getElementById('z-position').value = 700;
    
    }
