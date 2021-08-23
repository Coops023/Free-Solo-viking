const characterImg = document.createElement('img');

characterImg.src = '/assets/climber-images.png';

class Character {
    constructor(canvasContext, positionX, positionY) {

        this.ctx = canvasContext;
        this.positionX = positionX;
        this.positionY = positionY;
        this.movementSpeed = 2;
        this.scale = 0.5;
        this.width = 113;
        this.height = 292;
        this.scaledWidth = this.width * this.scale;
        this.scaledHeight = this.height * this.scale;
        // this.color = 'black'
    }


    draw(frameX, frameY, canvasX, canvasY) {
        this.ctx.drawImage(characterImg,
            frameX * this.width, frameY * this.height, this.width, this.height,
            canvasX, canvasY, this.scaledWidth, this.scaledHeight);
    }



}