const obstacleImg = document.createElement('img')

obstacleImg.src = 'assets/face-boulder.png'

class Obstacle {
    constructor(canvasContext, posX, posY, speed) {
        this.ctx = canvasContext,
            this.x = posX,
            this.y = posY,
            this.width = 50,
            this.height = 50,
            this.speed = speed
    }

    draw() {

        this.ctx.drawImage(obstacleImg, this.x, this.y, this.width, this.height);
    }

    move() {
        this.y += this.speed;
    }
}