class Counters
{
	constructor(type)
	{
		this.texture = document.getElementById("Numeros");
		this.background = document.getElementById("Counter");

		this.type = type;
		this.i;
		this.o;
	}

	update()
	{
		if (this.type == 1)
		{
			if (points.p1 < 10)
			{
				this.i = points.p1;
				this.o = 10;
			}	
			else if (points.p1 >= 10 && points.p1 < 20)
			{
				this.i = points.p1 - 10;
				this.o = 1;
			}
			else if (points.p1 >= 20 && points.p1 < 30)
			{
				this.i = points.p1 - 20;
				this.o = 2;
			}
			else if (points.p1 >= 30 && points.p1 < 40)
			{
				this.i = points.p1 - 30;
				this.o = 3;
			}
			else if (points.p1 >= 40 && points.p1 < 50)
			{
				this.i = points.p1 - 40;
				this.o = 4;
			}
			else if (points.p1 >= 50 && points.p1 < 60)
			{
				this.i = points.p1 - 50;
				this.o = 5;
			}
			else if (points.p1 >= 60 && points.p1 < 70)
			{
				this.i = points.p1 - 60;
				this.o = 6;
			}
			else if (points.p1 >= 70 && points.p1 < 80)
			{
				this.i = points.p1 - 70;
				this.o = 7;
			}
			else if (points.p1 >= 80 && points.p1 < 90)
			{
				this.i = points.p1 - 80;
				this.o = 8;
			}
			else if (points.p1 >= 90 && points.p1 < 100)
			{
				this.i = points.p1 - 90;
				this.o = 9;
			}

			if (!(pause == "options" || pause == "menu"))
			{
				ctx.drawImage(this.background, (canvas.width / 4) - 56 - 5, 40 - 5);
				ctx.drawImage(this.texture, this.i * 56, 0, 56, 103, (canvas.width / 4), 40, 56, 103);
				ctx.drawImage(this.texture, this.o * 56, 0, 56, 103, (canvas.width / 4) - 56, 40, 56, 103);
			}
		}

		else if (this.type == 2)
		{
			if (points.p2 < 10)
			{
				this.i = points.p2;
				this.o = 10;
			}	
			else if (points.p2 >= 10 && points.p2 < 20)
			{
				this.i = points.p2 - 10;
				this.o = 1;
			}
			else if (points.p2 >= 20 && points.p2 < 30)
			{
				this.i = points.p2 - 20;
				this.o = 2;
			}
			else if (points.p2 >= 30 && points.p2 < 40)
			{
				this.i = points.p2 - 30;
				this.o = 3;
			}
			else if (points.p2 >= 40 && points.p2 < 50)
			{
				this.i = points.p2 - 40;
				this.o = 4;
			}
			else if (points.p2 >= 50 && points.p2 < 60)
			{
				this.i = points.p2 - 50;
				this.o = 5;
			}
			else if (points.p2 >= 60 && points.p2 < 70)
			{
				this.i = points.p2 - 60;
				this.o = 6;
			}
			else if (points.p2 >= 70 && points.p2 < 80)
			{
				this.i = points.p2 - 70;
				this.o = 7;
			}
			else if (points.p2 >= 80 && points.p2 < 90)
			{
				this.i = points.p2 - 80;
				this.o = 8;
			}
			else if (points.p2 >= 90 && points.p2 < 100)
			{
				this.i = points.p2 - 90;
				this.o = 9;
			}

			if (!(pause == "options" || pause == "menu"))
			{
				ctx.drawImage(this.background, (canvas.width / 4) * 3 - 56 - 5, 40 - 5)
				ctx.drawImage(this.texture, this.i * 56, 0, 56, 103, (canvas.width / 4) * 3, 40, 56, 103);
				ctx.drawImage(this.texture, this.o * 56, 0, 56, 103, (canvas.width / 4) * 3 - 56, 40, 56, 103);
			}
		}
	}
}