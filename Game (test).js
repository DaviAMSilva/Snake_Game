var squareSize = 100; // WARNING don't set it too high or low, 30 to 200 is a good size
var isSquare = false; // This makes the biggest square possible
var speed = 2;

var sideX, sideY, hasHitBody, hasWon;
var points = -200;
var snake = [],
    fruit;
var stage = 1; // 1 = Normal, 2 = Win or Lost, 3 = Ready to restart
var velReset = 2,
    vel = velReset,
    acc = 1.1;

function setup() {
    if (isSquare) {
        sideY = min(floor(windowHeight / squareSize),
            floor(windowWidth / squareSize));
        sideX = sideY;
    } else {
        sideY = floor(windowHeight / squareSize * 0.98);
        sideX = floor(windowWidth / squareSize * 0.98);
    } // This fills the screen with how many squares possible on the X and Y axis. 0.98 is there because of some incosistencies with the screen size

    createCanvas(sideX * squareSize, sideY * squareSize);
    background(135);
    strokeWeight(2);
    frameRate(speed);
    textAlign(CENTER, CENTER);
    textSize(30);
    translate(-0.5, -0.5);

    fruit = new Fruit();
    snake[0] = new Snake(squareSize, 0, 1, 0);
    snake[snake.length - 1].grow();
    snake[snake.length - 1].grow();

    headColor = color(0, 100, 0);
    tailColor = color(0, 255, 0);
    fruitColor = color(255, 60, 50);
}

function draw() {
    if (stage === 1) {
        fill(0);
        background(255);

        for (i = 0; i < (sideY + 1) * squareSize; i += squareSize) {
            line(0, i, width, i);
        }
        for (i = 0; i < (sideX + 1) * squareSize; i += squareSize) {
            line(i, 0, i, height);
        }

        if (fruit.eaten()) {
            snake[snake.length - 1].grow();
            fruit.newLocation();
        }

        for (i = snake.length - 1; i >= 0; i--) {
            if (snake[i].hitBody() && i > 0) {
                hasHitBody = true;
            }
        }

        if (snake.length === sideX * sideY || hasHitBody || snake[0].hitWall()) {
            snake[0].draw()
            stage = 2;
            if (snake.length === sideX * sideY) {
                hasWon = true;
            }
        }

        for (i = snake.length - 1; i >= 0; i--) {
            bodyColor = lerpColor(headColor, tailColor, i / (snake.length - 1));
            if (snake[0].hitWall() || hasHitBody) {
                fruit.draw();
                snake[i].draw();
            } else {
                fruit.draw();
                snake[i].move();
                snake[i].draw();
                if (i > 0) {
                    snake[i].dir.x = snake[i - 1].dir.x;
                    snake[i].dir.y = snake[i - 1].dir.y;
                }
            }
        }
    } else if (stage === 2) {
        frameRate(vel);
        background(255);
        fruit.draw();
        vel *= acc;
        snake.splice(snake.length - 1);

        for (i = 0; i < (sideY + 1) * squareSize; i += squareSize) {
            line(0, i, width, i);
        }
        for (i = 0; i < (sideX + 1) * squareSize; i += squareSize) {
            line(i, 0, i, height);
        }
        for (i = snake.length - 1; i >= 0; i--) {
            bodyColor = lerpColor(headColor, tailColor, i / (snake.length));
            snake[i].draw();
            fruit.draw();
        }

        if (snake.length === 0) {
            frameRate(speed);
            stage = 3;
        }
    } else if (stage === 3) {
        background(200);
        fill(225);
        if (hasWon) {
            text("CONGRATULATIONS YOU WON!!!", width / 2, height / 2 - 40);
        }
        text("YOU GOT " + points + " POINTS", width / 2, height / 2);
        text("CLICK TO RESTART", width / 2, height / 2 + 40);
    }



    if (stage === 1) {
        var mouseSquare = new p5.Vector(squareSize * floor(mouseX * sideX / width), squareSize * floor(mouseY * sideY / height));
        var mouseDifAbs = new p5.Vector(dist(mouseSquare.x, 0, snake[0].pos.x, 0), dist(0, mouseSquare.y, 0, snake[0].pos.y));
        var mouseDif = new p5.Vector(mouseSquare.x - snake[0].pos.x, mouseSquare.y - snake[0].pos.y);


        var mouseSquare = new p5.Vector(squareSize * floor(fruit.pos.x * sideX / width), squareSize * floor(fruit.pos.y * sideY / height));
        var mouseDifAbs = new p5.Vector(dist(mouseSquare.x, 0, snake[0].pos.x, 0), dist(0, mouseSquare.y, 0, snake[0].pos.y));
        var mouseDif = new p5.Vector(mouseSquare.x - snake[0].pos.x, mouseSquare.y - snake[0].pos.y);

        var moveDir = createVector(0, 0);

        if (mouseDifAbs.x > mouseDifAbs.y) {
            moveDir.x = Math.sign(mouseDif.x);
            moveDir.y = 0;
        }
        if (mouseDifAbs.x <= mouseDifAbs.y) {
            moveDir.y = Math.sign(mouseDif.y);
            moveDir.x = 0;
        }

        // if (mouseDifAbs.x === mouseDifAbs.y) {
        //     moveDir.x = Math.sign(mouseDif.x);
        //     moveDir.y = 0;
        // }

        // if (Math.sign(mouseDif.x) !== snake[0].dir.x) {
        //     moveDir.y = Math.sign(mouseDif.y);
        //     moveDir.x = 0;
        // }
        // if (Math.sign(mouseDif.y) !== snake[0].dir.y) {
        //     moveDir.x = Math.sign(mouseDif.x);
        //     moveDir.y = 0;
        // }

        // fill(0, 0, 255);
        // rect(mouseSquare.x, mouseSquare.y, 10, 10);
        // fill(255, 0, 0);
        // rect(snake[0].pos.x + moveDir.x * squareSize, snake[0].pos.y + moveDir.y * squareSize, 10, 10);

        if ((moveDir.x !== 0 || moveDir.y !== 0) && (moveDir.x !== -snake[0].lastDir.x || moveDir.y !== -snake[0].lastDir.y)) {
            console.log(moveDir.x,moveDir.y);
            console.log((moveDir.x !== -snake[0].lastDir.x || moveDir.y !== -snake[0].lastDir.y));
            snake[0].dir = moveDir; 
        }
    }
}

// function mouseMoved() {
//     if (stage === 1) {
//     	if (mouseX - snake[0].pos.x > mouseY - snake[0].pos.y) {
//     		snake[0].dir.x = Math.sign(mouseX - snake[0].pos.x);
//     		snake[0].dir.y = 0;
//     		console.log("x>y");
//     	} else if (mouseX - snake[0].pos.x < mouseY - snake[0].pos.y) {
//     		snake[0].dir.y = Math.sign(mouseY - snake[0].pos.y);
//     		snake[0].dir.x = 0;
//     		console.log("x<y");
//     	}

//     	//console.log(mouseSquare);
//     	// else if (key === ' ') {
//     	// snake[snake.length - 1].grow();
//     	// } //Oh no you found my little secret!
//     }
// }

function mousePressed() {
    if (stage === 3) {
        setup();
        stage = 1;
        vel = velReset;
        points = 0;
        hasHitBody = false;
    }
}