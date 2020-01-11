let planet;
let sun;
let moon;
let sunToPlanetForce;
let planetToMoonForce;


let stars;

let bgAudio;



/* Variables for images*/
const img = ["images/blueP-01.jpg",
    "images/orenP-01.jpg", "images/whitP-01.jpg",
    "images/greenP-01.jpg", "images/yellP-01.jpg",
    "images/cyanP-01.jpg", "images/dotP-01.jpg"
];
let moonImg;
let images;
let sunImg;

// Background music button

const bgMusicBtn = document.querySelector("#music");
bgMusicBtn.addEventListener("click", bgMusic);

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


let moonSizeValue;


// Event listener for Reset button for Camera HTML
document.querySelector('#reset').addEventListener("click", resetCamera)


const pSkin = document.querySelector("#skin");
pSkin.addEventListener("click", changeImages);

function preload() {
    //Audio
    bgAudio = loadSound("background-sounds.mp3");

    // Visuals
    stars = loadImage('img/stars.png');
    images = loadImage(random(img));

    moonImg = loadImage("images/moon-01.jpg");

    sunImg = loadImage("images/sun-01.jpg");

}


function setup() {

    // Add the sketch to the div 
    const sketchCanvas = createCanvas(divWidth, divHeight, WEBGL);
    sketchCanvas.parent("sketch-canvas")
    sun = new Sun(sunSize.value);
    planet = new Planet(planetSize.value);
    moon = new Moon(planetSize.value / 2);
}


function draw() {
    background(15)
    //needs to be put on seperate class
    push();
    texture(stars);
    box(4500, 4500, 4500);
    translate(0, 0, [0]);
    pop();

    // HTML values being assigned to variables
    xPosValue = xPos.value;
    yPosValue = yPos.value;
    zPosValue = zPos.value;


    sunToPlanetForce = new p5.Vector();
    planetToMoonForce = new p5.Vector();

    planetSizeValue = planetSize.value;
    sunSizeValue = sunSize.value;
    moonSizeValue = planetSize.value / 2;





    sunToPlanetForce = sun.attract(planet);
    planetToMoonForce = planet.attract(moon);


    planet.applyForce(sunToPlanetForce);
    moon.applyForce(planetToMoonForce)

    planet.move();
    moon.move();

    planet.updateSize(planetSizeValue);
    sun.updateSize(sunSizeValue);
    moon.updateSize(moonSizeValue)
    sun.display();
    planet.display();
    moon.display();
    //changes Camera parameters for  X,Y,Z 
    camera(xPosValue, yPosValue, constrain(zPosValue, sunSizeValue, 1000), 0, 0, 0, 0, 1, 0);
}






// Makes sure canvas stays the same size when the browser is resized
function windowResized() {
    createCanvas(divWidth, divHeight, WEBGL);
}


// 
// Reset camera buttons


// Add these as variables so they can be easily changed
function resetCamera() {
    document.getElementById('x-position').value = 0;
    document.getElementById('y-position').value = 0;
    document.getElementById('z-position').value = 700;

}


/* If the text of the button says "Stop Music" WHEN CLICKED 
 * then set the text to "Play Music" and stop the music
 * and vice versa
 */
function bgMusic() {

    if (bgMusicBtn.textContent === "Stop Music") {
        bgMusicBtn.textContent = "Play Music"
        bgAudio.stop();

    } else {
        bgMusicBtn.textContent = "Stop Music"
        bgAudio.play();
        bgAudio.loop();

    }
}

function changeImages() {

    images = loadImage(random(img));
}