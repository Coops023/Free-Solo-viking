window.onload = () => {
  //all const variables
  // const scale = 2;
  // const width = 113;
  // const height = 292;
  // const scaledWidth = width / scale;
  // const scaledHeight = height / scale;
  const cycleLoop = [0, 1, 0, 1];
  const movementSpeed = 2;
  const frameLimit = 12;

  //all let variable
  let canvas = document.querySelector("canvas");
  let ctx = canvas.getContext("2d");
  let currentLoopIndex = 0;
  let frameCount = 0;
  let currentDirection = 0;
  let keyPresses = {};
  let positionX = 280;
  let positionY = 450;
  let bgImg = new Background(ctx);
  //inistialise character class
  let character = new Character(ctx, positionX, positionY);
  // let obstaclesId = null;
  let obstaclesArray = [];

  // let background = new Background(ctx)
  //event listeners

  function keyDownListner(event) {
    keyPresses[event.key] = true;
  }
  window.addEventListener("keydown", keyDownListner, false);

  function keyUpListner(event) {
    keyPresses[event.key] = true;
  }
  window.addEventListener("keyup", keyUpListner, false);

  let obstaclesId = setInterval(function () {
    let obstacle = new Obstacle(
      ctx, //canvas context
      Math.random() * canvas.width - 200, //position X
      0, //position Y
      Math.random() * 50 + 50, //width
      Math.random() * 15 + 10, //height
      Math.ceil(Math.random() * 5) //speed
    );

    obstaclesArray.push(obstacle);
  }, 1000);

  //load character

  // // img.src = '/assets/climber-images.png';
  // character.onload = function () {
  //     window.requestAnimationFrame(gameLoop);
  // };
  // // img.src = '/assets/climber-images.png';
  // bgImg.onload = function () {
  //     console.log('load')
  //     window.requestAnimationFrame(gameLoop);
  // };

  // draws the image frame for animation
  // function drawFrame(frameX, frameY, canvasX, canvasY) {
  //     ctx.drawImage(img,
  //         frameX * width, frameY * height, width, height,
  //         canvasX, canvasY, scaledWidth, scaledHeight);
  // }

  // game loop
  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bgImg.draw();
    //charcter draw function
    character.draw(
      cycleLoop[currentLoopIndex],
      currentDirection,
      positionX,
      positionY
    );
    window.requestAnimationFrame(gameLoop);

    obstaclesArray.forEach((eachObstacle) => {
      eachObstacle.draw();
      eachObstacle.move();
    });

    let hasMoved = false;

    // Watch out for your logic: you are looking for .w .a .s et, which do not exist on keyPresses
    console.log("keyPresses: ", keyPresses);
    if (keyPresses.w) {
      character.move(0, -movementSpeed);
      hasMoved = true;
    } else if (keyPresses.s) {
      character.move(0, movementSpeed);
      hasMoved = true;
    }
    if (keyPresses.a) {
      character.move(-movementSpeed, 0);
      hasMoved = true;
    } else if (keyPresses.d) {
      character.move(movementSpeed, 0);
      hasMoved = true;
    }

    if (hasMoved) {
      frameCount++;
      if (frameCount >= frameLimit) {
        frameCount = 0;
        currentLoopIndex++;
        if (currentLoopIndex >= cycleLoop.length) {
          currentLoopIndex = 0;
        }
      }
    }
  }

  gameLoop();
  // // move character function stops the character from leaving the canvas
  // // function moveCharacter(deltaX, deltaY) {
  // //     if (positionX + deltaX > 0 && positionX + scaledWidth + deltaX < canvas.width) {
  // //         positionX += deltaX;
  // //     }
  // //     if (positionY + deltaY > 0 && positionY + scaledHeight + deltaY < canvas.height) {
  // //         positionY += deltaY;
  // //     }

  // }
};
