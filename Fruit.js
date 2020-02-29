class Fruit {
    constructor() {
        var tries = 1;
        var pickNewLocation = true;
        while (pickNewLocation) {
            var possibleLocation = createVector(floor(random(0, sideX)) * squareSize, floor(random(0, sideY)) * squareSize);
            if (possibleLocation.y === 0 && possibleLocation.x <= squareSize * 2) {
                pickNewLocation = true;
                tries++;
            } else {
                this.pos = possibleLocation;
                pickNewLocation = false;
            }
            if (tries > sideX * sideY * 5 || tries > 1000) {
                this.pos = createVector(-squareSize, -squareSize);
                pickNewLocation = false;
                //console.log("TOO MANY TRIES");
            }
        }
        this.draw = function () {
            fill(fruitColor);
            rect(this.pos.x, this.pos.y, squareSize, squareSize);
        };
        this.eaten = function () {
            return (this.pos.x === snake[0].pos.x + snake[0].dir.x * squareSize &&
                this.pos.y === snake[0].pos.y + snake[0].dir.y * squareSize);
        };
        this.newLocation = function () {
            var pickNewLocation = true;
            tries = 1;
            while (pickNewLocation) {
                pickNewLocation = false;
                possibleLocation = createVector(floor(random(0, sideX)) * squareSize, floor(random(0, sideY)) * squareSize);
                for (var i = 0; i < snake.length; i++) {
                    if (possibleLocation.x === snake[i].pos.x + snake[i].dir.x * squareSize &&
                        possibleLocation.y === snake[i].pos.y + snake[i].dir.y * squareSize) {
                        pickNewLocation = true;
                        tries++;
                        break;
                    }
                }
                if (!pickNewLocation) {
                    this.pos = possibleLocation;
                }
                if (tries > sideX * sideY * 5 || tries > 1000) {
                    this.pos = createVector(-squareSize, -squareSize);
                    pickNewLocation = false;
                    //console.log("TOO MANY TRIES");
                }
            }
        };
        this.checkAvailableSquares = function () {
            availableSquares = [];
            for (var i = 0; i < sideX; i++) {
                this.availableSquares[i] = [];
                for (var j = 0; j < sideY; j++) {
                    this.availableSquares[i][j] = true;
                }
            }
        };
    }
}