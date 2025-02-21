class Bars
{
	constructor(y, mode)
	{
		this.x;
		this.y = y;
		this.mode = mode;
		this.nSpeed = 0;
		this.speed = 0;

		this.width = 20;
		this.height = 120;
		this.i = 0;

		this.charge = 0;
		this.power = 0;

		this.timer = 0;

		this.texture = document.getElementById("Bar");
	}

	start()
	{
		if (this.mode == "player")
			this.x = this.width * 2;

		else this.x = canvas.width - (this.width * 3);

		this.y = (canvas.height / 2) - 60;
	}

	update()
	{
		//Jugadores
		//ctx.fillStyle = "#fff"
		//ctx.fillRect(this.x, this.y, this.width, this.height)
		/*ctx.rotate(50);
		ctx.drawImage(this.texture, this.x, this.y)
		ctx.rotate(-50);*/

		ctx.save();
		ctx.translate(parseInt(this.x), parseInt(this.y));
		if (pause == "win" && this.mode == "player" && points.p2 == limit)
		{
			ctx.rotate(- this.i * (Math.PI/180));
			if(this.i <= 75)
				this.i++;

			this.y += 0.5 * this.i;
		}
		else if (pause == "win" && (this.mode == "CPU" || this.mode == "player2") && points.p1 == limit)
		{
			ctx.rotate(this.i * (Math.PI/180));
			if(this.i <= 75)
				this.i++;

			this.y += 0.5 * this.i;
		}
		ctx.drawImage(this.texture, this.charge * 20, this.power * 120, 20, 120, 0, 0, 20, 120);
		ctx.translate(parseInt(-this.x), parseInt(-this.y));
		ctx.restore();

		if (pause == "game")
		{
			//if (ball.nSpeed >= 15) this.speed = 16;
			//else this.speed = 8;

			this.speed = 0;
			if (this.power) this.nSpeed = 16;
			else this.nSpeed = 8;

			if (this.mode == "player") {
				if (mode == "CPU") {
					if (keys.down || keys.down1)
						if (this.y + this.height < canvas.height)
							this.speed = this.nSpeed * DeltaTime;
					if (keys.up || keys.up1)
						if (this.y > 0)
							this.speed = -this.nSpeed * DeltaTime;
				}

				else {
				if (keys.down)
					if (this.y + this.height < canvas.height)
						this.speed = this.nSpeed * DeltaTime;
				if (keys.up)
					if (this.y > 0)
						this.speed = -this.nSpeed * DeltaTime;
				}

				if (keys.E1 && this.charge == 1) {
					this.power = 1;
					this.timer = 0;
				}

				this.collision(1);
			}

			else if (this.mode == "player2") {
				if (keys.down1)
					if (this.y + this.height < canvas.height)
						this.speed = this.nSpeed * DeltaTime;
				if (keys.up1)
					if (this.y > 0)
						this.speed = -this.nSpeed * DeltaTime;

				if (keys.E2 && this.charge == 1) {
					this.power = 1;
					this.timer = 0;
				}

				this.collision(0);
			}

			else if (this.mode == "CPU") {
				if (ball.direction.x == true && ball.x > canvas.width / 3)
				{
					if (ball.y + ball.size < this.y + (this.height / 3))
						if (this.y > 0)
							this.speed = -this.nSpeed * DeltaTime;

					if (ball.y > this.y + ((this.height / 3) * 2)) 
						if (this.y + this.height < canvas.height)
							this.speed = this.nSpeed * DeltaTime;
				}

				this.collision(0);
			}

			if (ball.x + ball.size >= this.x &&
				ball.x <= this.x + this.width &&
				ball.y - ball.speed.y <= this.y + this.height &&
				ball.y + ball.size + ball.speed.y >= this.y)
				if(ball.direction.y == 2)
					ball.direction.y = 1;
				else ball.direction.y = 2;

			if (this.power && parseInt(this.timer) < 250) {
				this.timer += DeltaTime;
			} else if (this.power) {
				this.power = 0;
				this.charge = 0;
				this.timer = 0;
			}

			this.y += this.speed;
		}
	}

	collision(state) {
		if (ball.x + ball.speed.x <= this.x + this.width &&
			ball.x + ball.size + ball.speed.x >= this.x &&
			ball.y + ball.speed.y <= this.y + this.height &&
			ball.y + ball.size + ball.speed.y >= this.y) {

			ball.direction.x = state;
			ball.timer++;
			this.powerF();
			this.ballAngle();
			Sound(hit0);
		}
	}

	powerF() {
		if (this.charge < 1 && this.timer >= 12) {
			this.charge++;
			this.timer = 0;
		} else if (!this.power) this.timer++;
	}

	ballAngle() {
		let Rx;
		let Ry;

		if (!ball.direction.y) {
			Ry = 45;
			ball.direction.y = 1
		}

		else if (ball.y + ball.size/2 <= this.y + this.height / 2) {
			Rx = ball.y + ball.size/2 - this.y
			if (Rx < 0) Rx = 0;
			Ry = (1620 - 27 * Rx) / 20;
			ball.direction.y = 1;
		}

		else if (ball.y + ball.size/2 > this.y + this.height / 2) {
			Rx = ball.y + ball.size/2 - this.y - this.height/2
			if (Rx > 60) Rx = 60;
			Ry = 27 * Rx / 20;
			ball.direction.y = 2;
		}

		if (Ry < 0) Ry = Ry * -1;

		ball.angle = Ry;
	}
}