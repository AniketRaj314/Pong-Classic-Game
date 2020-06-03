let width, height, player1, player2, diameter, ball, paddleHeight, speed;

function setup() {
    width = 600;
    height = 600;
    diameter = 20;
    paddleHeight = 75;
    speed = 1;
    createCanvas(width, height);
    player1 = new Player(20, height / 2);
    player2 = new Player(width - 20, height / 2);
    ball = new Ball(speed);
}

function draw() {
    for (let i = 0; i < 5; i++) {
        background(0);
        showScore();
        checkPlayer();
        checkLoss();
        ball.update();
        ball.show();
        controlPlayers();
        player1.update();
        player2.update();
        player1.show();
        player2.show();
    }
}

function showScore() {
    fill(255);
    textSize(32);
    text(player1.score, width / 2 - 100, 32);
    text(player2.score, width / 2 + 100, 32);
}

function controlPlayers() {
    if (keyIsDown(UP_ARROW)) {
        player2.y -= 1;
    }
    if (keyIsDown(DOWN_ARROW)) {
        player2.y += 1;
    }
    if (keyIsDown(87)) {
        player1.y -= 1;
    }
    if (keyIsDown(83)) {
        player1.y += 1;
    }
}

function checkLoss() {
    if(((ball.y <= player1.y - paddleHeight / 2) || (ball.y >= player1.y + paddleHeight / 2)) && ball.x < player1.x) {
        player2.score++;
        ball = new Ball(speed);
        player1.y = height / 2;
        player2.y = height / 2;
    }

    if(((ball.y <= player2.y - paddleHeight / 2) || (ball.y >= player2.y + paddleHeight / 2)) && ball.x > player2.x) {
        player1.score++;
        ball = new Ball(speed);
        player1.y = height / 2;
        player2.y = height / 2;
    }
}

function checkPlayer() {
    if ((ball.y >= player1.y - paddleHeight / 2) && (ball.y <= player1.y + paddleHeight / 2) && (ball.x - diameter / 2 <= player1.x + 5)) {
        let angle = random(0, PI / 2 - 0.2);
        ball.xSpeed = speed * cos(angle);
        ball.ySpeed = speed * sin(angle);
    }

    if ((ball.y >= player2.y - paddleHeight / 2) && (ball.y <= player2.y + paddleHeight / 2) && (ball.x + diameter / 2 >= player2.x - 5)) {
        let angle = random(0, PI / 2 - 0.2);
        ball.xSpeed = -speed * cos(angle);
        ball.ySpeed = speed * sin(angle);
    }
}

class Ball {
    constructor(speed) {
        this.x = width / 2;
        this.y = height / 2;
        this.xSpeed = speed * random([-1, 1]);
        this.ySpeed = 0
    }

    show() {
        ellipseMode(CENTER);
        fill(0, 255, 0);
        ellipse(this.x, this.y, diameter);
    }

    update() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if ((this.y - diameter / 2 <= 0) || (this.y + diameter / 2 >= height)) {
            ball.ySpeed = -ball.ySpeed;
        }
        if ((this.x - diameter / 2 <= 0) || (this.x + diameter / 2 >= width)) {
            ball.xSpeed = -ball.xSpeed;
        }
    }
}

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.score = 0;
    }

    show() {
        rectMode(CENTER);
        fill(255);
        rect(this.x, this.y, 10, paddleHeight);
    }

    update() {
        if (this.y - paddleHeight / 2 <= 0) {
            this.y = paddleHeight / 2;
        }
        if (this.y + paddleHeight / 2 >= height) {
            this.y = height - paddleHeight / 2;
        }
    }
}