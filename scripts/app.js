window.onload = () => {
    //variables 
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let frameCount = null;
    let character = new Character(ctx, 250, 450)
    let bgImg = new Background(ctx)
    let obstaclesId = null;
    let obstaclesArray = [];
    let bonusId = null;
    let bonusArray = [];
    let startButton = document.getElementById('start-button')
    let restartButton = document.getElementById('restart-button')
    let startPage = document.getElementById('start-page')
    let gamePage = document.getElementById('game-page')
    let endPage = document.getElementById('end-page')
    const score = {
        points: 0,
        draw: function () {
            ctx.font = '50px Rampart One';
            ctx.fillStyle = 'white';
            ctx.fillText('Score: ' + this.points, 300, 580);
        }
    };
    //event listners
    startButton.addEventListener('click', () => {
        start()
        gameLoop()
        obstaclesId = setInterval(function () {
            let obstacle = new Obstacle(
                ctx,
                Math.random() * canvas.width,
                0,
                Math.ceil(Math.random() * 3)
            );
            score.points += 1;
            obstaclesArray.push(obstacle);
        }, 2000);
        bonusId = setInterval(function () {
            let bonus = new Bonus(
                ctx,
                Math.random() * canvas.width,
                0,
                Math.ceil(Math.random() * 4)
            );
            bonusArray.push(bonus);
        }, 6000);
    })
    restartButton.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        start()

    })
    window.addEventListener('keydown', keyDownListner, false);
    function keyDownListner(event) {
        character.keyPresses[event.key] = true;
    }
    window.addEventListener('keyup', keyUpListner, true);
    function keyUpListner(event) {
        character.keyPresses[event.key] = false;
    }
    //functions
    function start() {
        startPage.style.display = 'none'
        gamePage.style.display = 'block'
        endPage.style.display = 'none'
    }

    function gameOver() {
        startPage.style.display = 'none'
        gamePage.style.display = 'none'
        endPage.style.display = 'flex'
    }

    function bonusCheck(bonus) {
        let bonusContact =
            character.positionX < bonus.x + bonus.width &&
            character.positionX + character.scaledWidth > bonus.x &&
            character.positionY < bonus.y + bonus.height &&
            character.positionY + character.scaledHeight > bonus.y;
        if (bonusContact) {
            bonusArray.splice(bonus, 1)
            score.points += 10
        }
    }

    function checkCollisions(obstacle) {
        let obstacleCollision =
            character.positionX < obstacle.x + obstacle.width &&
            character.positionX + character.scaledWidth > obstacle.x &&
            character.positionY < obstacle.y + obstacle.height &&
            character.positionY + character.scaledHeight > obstacle.y;
        if (obstacleCollision) {
            obstaclesArray.splice(obstacle, 1)
            clearInterval(obstaclesId);
            cancelAnimationFrame(frameCount);
            gameOver()
        }
    }

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        bgImg.draw()
        score.draw();
        obstaclesArray.forEach((eachObstacle) => {
            eachObstacle.draw();
            eachObstacle.move();
            checkCollisions(eachObstacle);

        });
        bonusArray.forEach((eachBonus) => {
            eachBonus.draw();
            eachBonus.move();
            bonusCheck(eachBonus);
        });
        character.draw();
        character.move()
        window.requestAnimationFrame(gameLoop);
    }

}