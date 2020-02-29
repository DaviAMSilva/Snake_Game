class Snake {
	constructor(x, y, speedX, speedY) {
		this.pos = createVector(x, y);
		this.dir = createVector(speedX, speedY);
		this.lastDir = createVector(0, 0);

		this.draw = function () {
			fill(bodyColor);
			rect(this.pos.x, this.pos.y, squareSize, squareSize);
		};
		this.move = function () {
			this.pos.x += this.dir.x * squareSize;
			this.pos.y += this.dir.y * squareSize;
			this.lastDir = createVector(this.dir.x, this.dir.y);
		};
		this.hitWall = function () {
			return (this.pos.x + this.dir.x * squareSize < 0 ||
					this.pos.x + this.dir.x * squareSize > (sideX - 1) * squareSize ||
					this.pos.y + this.dir.y * squareSize < 0 ||
					this.pos.y + this.dir.y * squareSize > (sideY - 1) * squareSize);
		};
		this.grow = function () {
			points += 100;
			snake.push(new Snake(this.pos.x - this.dir.x * squareSize, this.pos.y - this.dir.y * squareSize, this.dir.x, this.dir.y));
		};
		this.hitBody = function () {
			return (this.pos.x + this.dir.x * squareSize === snake[0].pos.x + snake[0].dir.x * squareSize &&
				this.pos.y + this.dir.y * squareSize === snake[0].pos.y + snake[0].dir.y * squareSize);
		};
	}
}