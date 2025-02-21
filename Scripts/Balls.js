class Balls {
	constructor(x, y, speed) {
		this.x = x;
		this.y = y;
		this.nSpeed = speed;
		this.speed = { x: 0, y: 0 };
		this.angle = 0;

		this.size = 16;
		this.timer = 0;

		this.direction = { x: true, y: 0 }
		this.texture = document.getElementById("Ball");
	}

	update() {
		if (pause == "game") {

			if (this.direction.x == 1) 			this.speed.x = this.nSpeed * Math.cos(this.grades(this.angle)) * DeltaTime;
			else 							this.speed.x = -this.nSpeed * Math.cos(this.grades(this.angle)) * DeltaTime;
			if (this.direction.y == 1)		this.speed.y = -this.nSpeed * Math.sin(this.grades(this.angle)) * DeltaTime;
			else if (this.direction.y == 2) this.speed.y = this.nSpeed * Math.sin(this.grades(this.angle)) * DeltaTime;
			
			

			if (this.y + this.speed.y <= 0) {
				this.direction.y = 2;
				Sound(hit1);
			}
			else if (this.y + this.size + this.speed.y >= canvas.height) {
				this.direction.y = 1;
				Sound(hit1);
			}

			if (this.timer >= 3)
			{
				this.nSpeed++;
				console.log(this.nSpeed);
				this.timer = 0;
			}

			if (this.x + this.size <= 0)
				start(2);
			else if (this.x >= canvas.width)
				start(1);

			this.x += this.speed.x;
			this.y += this.speed.y;
		}

		//ctx.fillStyle = "#fff";
		//ctx.fillRect(this.x, this.y, this.size, this.size);
		ctx.drawImage(this.texture, parseInt(this.x - 2), parseInt(this.y - 2))
	}

	grades(angle) {
		let grade;
		grade = angle * Math.PI / 180;

		return grade;
	}
}