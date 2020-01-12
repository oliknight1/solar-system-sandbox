// Finding HTML DOM elements

// Slider for the size of the planet
const planetSize = document.querySelector("#planet-size");

// Slider for the size of the sun 
const sunSize = document.querySelector("#sun-size");

// Sliders for camera position
const xPos = document.querySelector("#x-position");
const yPos = document.querySelector("#y-position");

// Getting the div that the sketch is inside
const div = document.querySelector("#sketch-canvas");

// Button on the overlay to enter the simulation
const enterBtn = document.querySelector("#enter-btn");

// Button to toggle the background music
const bgMusicBtn = document.querySelector("#music");

// Reset camera button
const resetBtn = document.querySelector('#reset');

const changeSkinBtn = document.querySelector("#skin-btn");

// Event Listeners
enterBtn.addEventListener("click", overlayState);
bgMusicBtn.addEventListener("click", bgMusic);
resetBtn.addEventListener("click", resetCamera);
changeSkinBtn.addEventListener("click", changeImages);


// Global Varibales

// Variables for objects
let planet;
let sun;
let moon;

// Variables for the forces
let sunToPlanetForce;
let planetToMoonForce;

// Variables for background stars
let stars;

// Variables for background audio
let bgAudio;

/* Array for the image files */
const imgArray = ["images/blueP-01.jpg",
    "images/orenP-01.jpg", "images/whitP-01.jpg",
    "images/greenP-01.jpg", "images/yellP-01.jpg",
    "images/cyanP-01.jpg", "images/dotP-01.jpg"
];

// Random number for creating the planets
let randomPlanet;

// Image for the planet, chose from random from the imgArray
let planetImg;


/* Variable for the value of the moon size
 * it's calulated a 1/2 of the size of the planet inside the draw
 */
let moonSizeValue;

// Variables for the default position of the camera
const camXDefaultPos = 0;
const camYDefaultPos = 0;
const camZDefaultPos = 600;

// Variables for the position of the camera
let camXPos;
let camYPos;

// Width and height of the div that the sketch is inside
// Allows the sketch to be the height and width of that div
let divWidth = div.offsetWidth;
let divHeight = div.offsetHeight;


// Function for adding the stars to the background
function addBackground() {
    push();
    texture(stars);
    box(4500, 4500, 4500);
    pop();
}


function preload() {
    // Preload the background audio
    bgAudio = loadSound("background-sounds.mp3");

    // Preload the star background
    stars = loadImage('img/stars.png');

    // Preload a random planet from the imgArray
    randomPlanet = random(imgArray);

    planetImg = loadImage(randomPlanet);
    sunImg = loadImage("images/sun-01.jpg");
}

function setup() {

    // Creates a canvas the size of the div
    const sketchCanvas = createCanvas(divWidth, divHeight, WEBGL);

    // Set the parent of the cavas to the div
    sketchCanvas.parent("sketch-canvas");

    // Initializing the objects
    sun = new Sun(sunSize.value);
    planet = new Planet(planetSize.value);
    moon = new Moon(planetSize.value / 2);
}


function draw() {
    background(15)

    // Add the stars background
    addBackground();

    // The forces of the gravitational pull
    sunToPlanetForce = new p5.Vector();
    //planetToMoonForce = new p5.Vector();

    // Setting the size of the moon to always be half the size of the planet
    moonSizeValue = planetSize.value / 2;

    // sunToPlanetForce is initialized as the strengh of the force that is pulling the planet to the sun 
    sunToPlanetForce = sun.attract(planet);

    // planetToMoonForce is initialized as the strengh of the force that is pulling the moon to the planet
    planetToMoonForce = planet.attract(moon);

    // applyForce() takes the pulling force from above, and applies it to the object
    // Essentially it applies the pulling effect
    planet.applyForce(sunToPlanetForce);
    moon.applyForce(planetToMoonForce);

    // move() controls the movement of the object
    planet.move();
    moon.move();

    // updateSize() changes the size of the planets based upon the sliders
    planet.updateSize(planetSize.value);
    sun.updateSize(sunSize.value);
    moon.updateSize(moonSizeValue);

    // Displays the objects, this needs to be the last function applied to the objects
    sun.display();
    planet.display();
    moon.display();


    //changes camera parameters for  X,Y,Z 
    camera(xPos.value, yPos.value, camZDefaultPos, 0, 0, 0, 0, 1, 0);
}



// Event Listener Functions

// Resets the position of the camera to default 
function resetCamera() {
    xPos.value = camXDefaultPos;
    yPos.value = camYDefaultPos;
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

// Pick a new random image for the planet
function changeImages() {
    // prevPlanet is the current planet shown
    let prevPlanet = randomPlanet

    // Set a new random imgArray index to randomPlanet
    randomPlanet = random(imgArray)

    // Prevents the new randomPlanet from being the same as prevPlanet
    while (randomPlanet === prevPlanet) {
        randomPlanet = random(imgArray)
    }

    // Change the planet
    planetImg = loadImage(randomPlanet);
}

// Hides the overlay when the button is pressed
function overlayState() {
    const overlay = document.querySelector(".overlay");
    const menu = document.querySelector(".menu");

    // Add the CSS classes that have the animation property to the elements
    overlay.classList.add("overlayFade");
    menu.classList.add("fadeIn");
    div.classList.add("fadeIn");
}