const chalkImg = document.createElement('img');

chalkImg.src = 'assets/chalk.png'

class Bonus {
    constructor(canvasContext, positionX, positionY, speed) {
        this.ctx = canvasContext,
            this.x = positionX,
            this.y = positionY,
            this.width = 25,
            this.height = 25,
            this.speed = speed
    }

    draw() {

        this.ctx.drawImage(chalkImg, this.x, this.y, this.width, this.height);
    }

    move() {
        this.y += this.speed;
    }
}