const canvas = document.getElementById('flappyBird');
const ctx = canvas.getContext('2d');

canvas.width = 320;
canvas.height = 480;

let bird = {
    x: 50,
    y: 150,
    width: 20,
    height: 20,
    gravity: 0.6,
    lift: -10,
    velocity: 0,
    draw: function() {
        ctx.fillStyle = "#FF0";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    },
    update: function() {
        this.velocity += this.gravity;
        this.velocity *= 0.9; // air resistance
        this.y += this.velocity;

        if (this.y + this.height > canvas.height) {
            this.y = canvas.height - this.height;
            this.velocity = 0;
        }
        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
    },
    flap: function() {
        this.velocity = this.lift;
    }
};

let pipes = [];
let frame = 0;

function addPipe() {
    let pipeHeight = Math.floor(Math.random() * (canvas.height - 120)) + 20;
    let gap = 120;

    pipes.push({
        x: canvas.width,
        y: pipeHeight,
        width: 40,
        height: canvas.height - pipeHeight - gap
    });
}

function drawPipes() {
    ctx.fillStyle = "#00FF00";
    pipes.forEach(pipe => {
        // Top pipe
        ctx.fillRect(pipe.x, 0, pipe.width, pipe.y);

        // Bottom pipe
        ctx.fillRect(pipe.x, pipe.y + 120, pipe.width, pipe.height);
    });
}

function updatePipes() {
    pipes.forEach(pipe => {
        pipe.x -= 2;
    });

    if (pipes[0] && pipes[0].x + pipes[0].width < 0) {
        pipes.shift();
    }
}

function checkCollision() {
    pipes.forEach(pipe => {
        if (
            bird.x < pipe.x + pipe.width &&
            bird.x + bird.width > pipe.x &&
            (bird.y < pipe.y || bird.y + bird.height > pipe.y + 120)
        ) {
            resetGame();
        }
    });
}

function resetGame() {
    bird.y = 150;
    bird.velocity = 0;
    pipes = [];
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bird.update();
    bird.draw();

    if (frame % 100 === 0) {
        addPipe();
    }

    drawPipes();
    updatePipes();
    checkCollision();

    frame++;
    requestAnimationFrame(gameLoop);
}

canvas.addEventListener('click', () => bird.flap());

gameLoop();