// Finding HTML DOM elements

// Sliders for changing object size
const planetSize = document.querySelector("#planet-size");
const sunSize = document.querySelector("#sun-size");

// Sliders for camera position
const xPos = document.querySelector("#x-position");
const yPos = document.querySelector("#y-position");


// P tags for displaying value of sliders 
const planetSizeValue = document.querySelector("#planet-size-value");
const sunSizeValue = document.querySelector("#sun-size-value");
const xPosValue = document.querySelector("#xpos-value");
const yPosValue = document.querySelector("#ypos-value");

//  pop up box
const popUp = document.querySelector(".help-popup");

// Getting the div that the sketch is inside
const div = document.querySelector("#sketch-canvas");

// Button on the overlay to enter the simulation
const enterBtn = document.querySelector("#enter-btn");

// Button to toggle the background music
const bgMusicBtn = document.querySelector("#music");

// Reset camera button
const resetCamBtn = document.querySelector('#reset');

// Reset sketch button
const sketchResetBtn = document.querySelector("#reset-sim");

// Change the image on the planet
const changeSkinBtn = document.querySelector("#skin-btn");

// Menu that appears whne you click the slider
const sliderMenu = document.querySelector(".slider-popup");

// Event Listeners
planetSize.addEventListener("mousedown", sliderPopUp);
document.querySelector("#close-btn-slider").addEventListener("click", sliderPopUp);
sunSize.addEventListener("mousedown", sliderPopUp);
xPos.addEventListener("mousedown", sliderPopUp);
yPos.addEventListener("mousedown", sliderPopUp);
enterBtn.addEventListener("click", overlayState);
enterBtn.addEventListener("click", bgMusic);
bgMusicBtn.addEventListener("click", bgMusic);
resetCamBtn.addEventListener("click", resetCamera);
changeSkinBtn.addEventListener("click", changeImages);
document.querySelector("#help-btn").addEventListener("click", popUpState);
document.querySelector("#close-btn").addEventListener("click", popUpState);
sketchResetBtn.addEventListener("click", resetSketch);



// Global Varibales

// Variables for objects
let planet;
let sun;
let moon;
let cam;

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

// Default values for sun and planet size

const planetSizeDefault = 30;
const sunSizeDefault = 80;


function preload() {
    // Preload the background audio
    bgAudio = loadSound("background-sounds.mp3");

    // Preload the star background
    stars = loadImage('images/stars.png');

    // Preload a random planet from the imgArray
    randomPlanet = random(imgArray);

    planetImg = loadImage(randomPlanet);
    sunImg = loadImage("images/sun.jpg");
}

// Function for adding the stars to the background
function addBackground() {
    push();
    texture(stars);
    box(4500, 4500, 4500);
    pop();
}

function setup() {

    // Creates a canvas the size of the div
    const sketchCanvas = createCanvas(divWidth, divHeight, WEBGL);

    // Set the parent of the cavas to the div
    sketchCanvas.parent("sketch-canvas");

    // Run the resetSketch which essentially acts as the setup as it creates the objects
    // By running the function we save on duplicated code
    resetSketch();

}


function draw() {
    background(15);

    // Add the stars background
    addBackground();

    // Display value of sliders
    displayValue()
    // The forces of the gravitational pull
    sunToPlanetForce = new p5.Vector();
    //planetToMoonForce = new p5.Vector();

    // Setting the size of the moon to always be half the size of the planet
    moonSizeValue = planetSize.value / 2;


    // Change the gravity strength

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

    // updatePos() changes the postition of the Camera based upon the sliders


    // Displays the objects, this needs to be the last function applied to the objects
    sun.display();
    planet.display();
    moon.display();

    // If space is pressed use orbit control, if not default to normal camera
    // Also changes the cursor style to make it clear you are in orbit mode
    if (keyIsPressed && keyIsDown(32)) {

        orbitControl(2, 2);
        document.querySelector("body").style.cursor = "pointer"
    } else {
        cam.updatePos(xPos.value, yPos.value);
        cam.display();
        document.querySelector("body").style.cursor = "default"


    }
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
    // Allow the user to click on the menu when the overlay is removed
    menu.style.pointerEvents = "all"
    menu.classList.add("fadeIn");
    div.classList.add("fadeIn");
}

// Sets the updated value of the sliders to the <p> tag
function displayValue() {
    sunSizeValue.textContent = sunSize.value + "00 km";
    planetSizeValue.textContent = planetSize.value + "00 km";
    xPosValue.textContent = xPos.value;
    yPosValue.textContent = yPos.value;
}
// Controls if the pop up box appears or not

// Helps decide if the pop up box needs to be opened or closed
let isHelpOpen = false;

function popUpState() {


    if (!isHelpOpen) {
        popUp.style.opacity = "1"
        isHelpOpen = true;
    } else {
        popUp.style.opacity = "0"
        isHelpOpen = false;
    }
}

// Reset the sketch so all the values are defaulted 
function resetObjSize() {
    planetSize.value = planetSizeDefault;
    sunSizeVvalue = sunSizeDefault;
}

function resetSketch() {

    // Initializing the objects again
    sun = new Sun(sunSize.value);
    planet = new Planet(planetSize.value);
    moon = new Moon(planetSize.value / 2);

    // Initializing Camera 
    cam = new Cam(xPos.value, yPos.value);

    // Run these two functions to reset the size of objects and camera position
    resetCamera();
    resetObjSize();

}

let isSliderHelpOpen = false;

function sliderPopUp(e) {

    if (!isSliderHelpOpen) {
        const sliderText = document.querySelector(".slider-text")
        sliderMenu.style.opacity = 1
        if (e.target.id == "planet-size") {
            sliderText.textContent = "When changing the size of the planet, be careful as it will effect the strength of the gravitational pull, if it becomes out of control, press the \"Reset Simulation\" button "
        } else if (e.target.id == "sun-size") {
            sliderText.textContent = "When changing the size of the sun, be careful as it will effect the strength of the gravitational pull, if it becomes out of control, press the \"Reset Simulation\" button "
        } else if (e.target.id == "x-position") {
            sliderText.textContent = "This slider will change the X position of the slider, if the value is a positive number, it will move the camera to the right of the default position, if it is a negative number, it will move the camera to the left of it's original position. To reset the camera back to default press the\"Reset Simulation\" button "
        } else if (e.target.id == "y-position") {
            sliderText.textContent = "This slider will change the Y position of the slider, if the value is a positive number, it will move the camera below default position, if it is a negative number, it will move the camera above of it's original position. To reset the camera back to default press the\"Reset Simulation\" button "
        }
        isSliderHelpOpen = true
    } else {
        sliderMenu.style.opacity = 0;
        isSliderHelpOpen = false
    }

}