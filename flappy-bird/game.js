const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let player;
let pipes;
let score = 0;
let scoreText;

const game = new Phaser.Game(config);

function preload() {
    this.load.image('bird', 'bird.png'); // Replace with actual image
    this.load.image('pipe', 'pipe.png'); // Replace with actual image
}

function create() {
    player = this.physics.add.sprite(100, 450, 'bird').setScale(0.5);
    player.setCollideWorldBounds(true);

    pipes = this.physics.add.group();
    
    const pipeInterval = 1500;
    this.time.addEvent({
        delay: pipeInterval,
        callback: addPipeRow,
        callbackScope: this,
        loop: true
    });

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    this.input.on('pointerdown', flap);
}

function flap() {
    player.setVelocityY(-200);
}

function addPipeRow() {
    const gap = Phaser.Math.Between(100, 400);
    
    pipes.create(800, gap - 300, 'pipe').setOrigin(0, 1);
    pipes.create(800, gap + 300, 'pipe').setOrigin(0, 0);
    
    pipes.setVelocityX(-200);

    pipes.children.iterate(function (pipe) {
        if (pipe.x < -pipe.width) {
            pipe.destroy();
            score += 1;
            scoreText.setText('score: ' + score);
        }
    });

    this.physics.add.collider(player, pipes, gameOver, null, this);
}

function update() {
    if (player.y > 600 || player.y < 0) {
        gameOver();
    }
}

function gameOver() {
    this.physics.pause();
    player.setTint(0xff0000);
    scoreText.setText('Game Over! Final Score: ' + score);
}
