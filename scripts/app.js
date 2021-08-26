window.onload = () => {

    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    const screamSound = new Audio('assets/screaming.mp3')
    const startSound = new Audio('assets/start.mp3')
    const bonusSound = new Audio('assets/bonus.mp3')
    let character = new Character(ctx, 400, 400)
    let bgImg = new Background(ctx)
    let obstaclesArray = [];
    let bonusArray = [];
    let obstaclesId = null;
    let bonusId = null;
    let startButton = document.getElementById('start-button')
    let restartButton = document.getElementById('restart-button')
    let startPage = document.getElementById('start-page')
    let gamePage = document.getElementById('game-page')
    let endPage = document.getElementById('end-page')
    let finalScore = document.getElementById('final-score')
    let score = {
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
        startSound.play()
    })
    restartButton.addEventListener('click', () => {
        startSound.play()
        restart()
    })

    //movement key listeners
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
        obstaclesId = setInterval(function () {
            let obstacle = new Obstacle(
                ctx,
                Math.random() * canvas.width - 20,
                0,
                Math.ceil(Math.random() * 2)
            );
            if (score.points > 50) {
                obstacle.speed += Math.ceil(Math.random() * 3)
            }
            if (score.points > 100) {
                obstacle.speed += Math.ceil(Math.random() * 4);
            }
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
    }

    function gameOver() {
        startPage.style.display = 'none'
        gamePage.style.display = 'none'
        endPage.style.display = 'flex'
        window.cancelAnimationFrame(gameLoop)
        window.clearInterval(obstaclesId)
        window.clearInterval(bonusId)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        obstaclesArray = []
    }

    function restart() {
        startPage.style.display = 'none'
        gamePage.style.display = 'block'
        endPage.style.display = 'none'
        character.positionX = 350
        character.positionY = 400
        score.points = 0
        obstaclesArray = []
        bonusArray = []
        start()
    }

    function bonusCheck(bonus) {
        let bonusContact =
            character.positionX < bonus.x + bonus.width &&
            character.positionX + character.scaledWidth > bonus.x &&
            character.positionY < bonus.y + bonus.height &&
            character.positionY + character.scaledHeight > bonus.y;
        if (bonusContact) {
            bonusSound.play()
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
            screamSound.play()
            obstaclesArray.splice(obstacle, 1)
            cancelAnimationFrame(gameLoop);
            gameOver()
        }
    }

    function gameLoop() {
        // ctx.clearRect(0, 0, canvas.width, canvas.height); ask Marco about this.
        bgImg.draw()
        character.draw()
        score.draw()
        character.move()
        finalScore.innerText = `final score: ${score.points}`

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

        window.requestAnimationFrame(gameLoop);
    }

}