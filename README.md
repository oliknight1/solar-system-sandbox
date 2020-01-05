# solar-system-sandbox

## TO-DO

### Urgent

- Images for planets,sun,moon
- Finishing adding rest of sliders (Oli)
- Powerpoint
### Less urgent
- Stars background
- Help page
- Reset camera button (Tyler)
- Delete all objects button
- Add lighting to the planets?


## Code Explaination 

This should hopefully clear up any confusion with the code.

Some of this is from what i'm currently working on for the menu so you wouldn't of seen it yet until i push it, but you can understand the gist of it.

### index.html
The menu is inside of a div and it uses HTML sliders to control the values & uses HTML buttons. The sketch (The simulation) is inside a div, so we can resize the div. A hamburger menu was preety hard to implement as when the menu opens the sketch would need to resize so I just made a permanent menu.

### sketch.js

#### setup()

Inisde the setup we assign values to some of the global variables like the ```sun``` and the ```moon```. We do this in the setup as p5.js doesn't allow us to create objects in global scope, and if we do it in ```draw()```
then it will constantly get re-created as ```draw``` is constantly looping. We want the object to be created once, and then we edit it to move the location,size etc., rather than it be created multiple times.

#### draw()

Inside the draw we also assign the values for the sliders, as we want to application to always be checking to see if the value on the sliders change so it can update the sizes accordingly. If we assigned the values on the sliders inside ```setup()``` it would get the value of the sliders when the application is created and would never update.

We set the value of ```force``` to ```sun.attract(planet)``` this sets the value of force to the gravitational pull from the sun to the earth, but it doesnt apply it anywhere (will go into more detail further down). We then do ```planet.applyForce(force)``` this is what applies to gravitational force to the acceleration inside ```planet``` but this doesnt cause the planet to move either, just changes the acceleration for when the planet moves

We then have the ```.updateSize()``` applied to both the ```sun``` and the ```planet```. We need this separate method to change the size as we cannot change the size of the object after it's been created in ```setup```. Then we have ```.move()``` which is what causes the planet to move.

### Sun

```Sun``` is the superclass for ```Planet```.

#### Constructor

The constructor takes the parameter ```r``` which is used as the radius and is assigned using ```this.sunR = r```. So basically ```this.sunR``` is the radius and the value of it comes from the paramter, so ```sun = new Sun(50)``` is a ```Sun``` object with the radius of 50. ```this.mass``` is ```this.r * 10``` as we want the size of the planet to replate to its mass. ```this.G``` is basically the strength of the gravity, the code has more in-depth comments on it. ```this.position``` is obviously the position.

#### attract(p)

```attract()``` takes the parameter ```p``` which will be the object that needs to be attarcted to the sun, e.g the planet. the function calcualtes the strength of the gravitational pull and returns it as a number so it can be used in later functions, its got in depth comments so if you want to know how it works read them. It doesn't apply the graviational pull or move the object, just calculates the force of the pull **DO NOT EDIT THIS FUNCTION**

#### updateSize(newSize)

parameter will be the value of the slider, sets ```this.sunR``` to the parameter

### Planet

subcalss of ```Sun``` so it inherits its functions and variables

#### Constructor

in the constructor we set the starting position of the planet, as well as the velocity and acceleration. acceleration is always 0,0,0 and later on we add veloicty to it. Velocity needs to be set or the planet will just bounce inwards and outwards ( hard to explain, set velocity to 0 and you'll see what i mean)

#### applyForce(force)

set the parameter to a vector and divide it by itself and its mass ( ```force = p5.Vector.div(force, this.mass) ```) and add it to acceleration. We divide it by its mass so that mass efects the acceleration speed.

#### move()

add the acceleration to velocity. We do this as we want the acceleration to get higher and lower cumulatively, so if the velcoity starts at ``` (0,0,2) ``` and acceleration becomes ```(0,0,1)``` from the ```appluForce()``` function, then velocity will become ```(0,0,3)``` . then add the velocity to the position to make the planet move. Then multiply the acceleration by 0 to reset it.

