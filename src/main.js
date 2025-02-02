const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const highScoreListElement = document.getElementById('highScoreList');

const gridSize = 20;
let snake = [];
let food = {};
let direction = 'right';
let gameSpeed = 150;
let gameInterval;
let gameOverFlag = false;
let score = 0;
let highScores = JSON.parse(localStorage.getItem('highScores') || '[]');

function initGame() {
    snake = [{ x: 10, y: 10 }];
    food = { x: 15, y: 15 };
    direction = 'right';
    gameOverFlag = false;
    score = 0;
    gameSpeed = 150;
    if (gameInterval) {
        clearInterval(gameInterval);
    }
    gameInterval = setInterval(() => {
        update();
        draw();
    }, gameSpeed);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (gameOverFlag) {
        ctx.fillStyle = 'black';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
        return;
    }
    drawSnake();
    drawFood();
    drawScore();
}

function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Score: ' + score, 10, 20);
}

function update() {
    if (gameOverFlag) return;
    const head = { ...snake[0] };
    switch (direction) {
        case 'up':
            head.y -= 1;
            break;
        case 'down':
            head.y += 1;
            break;
        case 'left':
            head.x -= 1;
            break;
        case 'right':
            head.x += 1;
            break;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        gameSpeed -= 10;
        clearInterval(gameInterval);
        gameInterval = setInterval(() => {
            update();
            draw();
        }, gameSpeed);
        food = {
            x: Math.floor(Math.random() * (canvas.width / gridSize)),
            y: Math.floor(Math.random() * (canvas.height / gridSize))
        };
    } else {
        snake.pop();
    }

    checkCollision();
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width / gridSize || head.y < 0 || head.y >= canvas.height / gridSize) {
        gameOver();
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
        }
    }
}

function gameOver() {
    clearInterval(gameInterval);
    gameOverFlag = true;
    updateHighScores();
    draw();
}

function updateHighScores() {
    highScores.push(score);
    highScores.sort((a, b) => b - a);
    highScores = highScores.slice(0, 5);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    displayHighScores();
}

function displayHighScores() {
    if (highScoreListElement) {
        highScoreListElement.innerHTML = '<h2>High Scores</h2><ol>' +
            highScores.map(score => `<li>${score}</li>`).join('') +
            '</ol>';
    }
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
    }
});

startButton.addEventListener('click', () => {
    initGame();
    displayHighScores();
});

displayHighScores();
