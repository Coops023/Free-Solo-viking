const characterImg = document.createElement("img");

characterImg.src = "/assets/climber-images.png";

class Character {
  constructor(canvasContext, positionX, positionY) {
    this.ctx = canvasContext;
    this.positionX = positionX;
    this.positionY = positionY;
    this.scale = 0.5;
    this.width = 113;
    this.height = 292;
    this.scaledWidth = this.width * this.scale;
    this.scaledHeight = this.height * this.scale;
  }

  draw(frameX, frameY, canvasX, canvasY) {
    this.ctx.drawImage(
      characterImg,
      frameX * this.width,
      frameY * this.height,
      this.width,
      this.height,
      canvasX,
      canvasY,
      this.scaledWidth,
      this.scaledHeight
    );
  }

  move(deltaX, deltaY) {
    console.log("move", deltaX, deltaY);
    if (
      this.positionX + deltaX > 0 &&
      this.positionX + this.scaledWidth + deltaX < this.ctx.width
    ) {
      this.positionX = deltaX + 2;
    }
    if (
      this.positionY + deltaY > 0 &&
      this.positionY + this.scaledHeight + deltaY < this.ctx.height
    ) {
      this.positionY = deltaY + 2;
    }
  }
}
