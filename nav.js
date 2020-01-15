class Nav{
    constructor(camXPos,camYPos){
        this.camXPos = camXPos;
        this.camYPos = camYPos;
        this.camZDefaultPos = 600; // Setting Default value for Z Co-ordinate
    }
        // Update the position of the camera with the latest value from the slider
    updatePos(newCamXPos,newCamYPos) {
        this.camXPos = newCamXPos;
        this.camYPos = newCamYPos;
        camera(this.camXPos,this.camYPos,this.camZDefaultPos, 0, 0, 0, 0, 1, 0);
    }

        // Draws Camera with new placement
    display(){
    camera(this.camXPos,this.camYPos ,this.camZDefaultPos, 0, 0, 0, 0, 1, 0);
    }
}
