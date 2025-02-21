const canvas = document.getElementById("game");
const ctx = canvas.getContext('2d');
let audio = 1;

canvas.width = 1000;
canvas.height = 700;

let perfectFrame = 1000/60;
let DeltaTime = 0;
let lastTimeStam = 0;

const Pause = document.getElementById("Pausa");
const Options = document.getElementById("Options");
const Menu = document.getElementById("Menu");
const Title = document.getElementById("Title");

let limit = 10;
let ballSpeed = 8;
let mode = "CPU";

const keys = {
	up: false,
	down: false,
	up1: false,
	down1: false,
	E1: false,
	E2: false
};
let pause = "menu";

let player;
let bar;
let ball;
let sPoints = [ new Counters(1), new Counters(2) ]
let points = { p1: 0, p2: 0}

function start(win) {
	ball = new Balls((canvas.width / 2) - 8, (canvas.height / 2) - 8, ballSpeed);

	if (!win) {
		player = new Bars((canvas.height / 2) - 60, "player");
		bar = new Bars((canvas.height / 2) - 60, mode);
		player.start();
		bar.start();
	}
	else if (win == 1) {
		points.p1++;
		player.start();
		bar.start();
		ball.direction.x = 0;
	}
	else if (win == 2) {
		points.p2++;
		player.start();
		bar.start();
		ball.direction.x = 1;
	}

	if (points.p1 == limit || points.p2 == limit) {
		pause = "win"
	}
	console.log("Player 1: " + points.p1 + "    Player 2: " + points.p2);
}

function update(timeStamp) {
	//console.log("Frame");
	requestAnimationFrame(update);
	DeltaTime = (timeStamp - lastTimeStam) / perfectFrame;
	lastTimeStam = timeStamp;

	//console.log(DeltaTime);
	ctx.clearRect(0,0, canvas.width, canvas.height)

	//Escenario xd
	ctx.fillStyle = "#aaa";
	for(var i = 0; i < 10; i++) {
		ctx.fillRect(canvas.width / 2 - 2, i * (canvas.height / 10), 4, (canvas.height /12))
	}

	sPoints.forEach(counter => {
		counter.update();
	});

	player.update();
	bar.update();
	ball.update();

	if (pause == "menu" || pause == "options") {
		ctx.drawImage(Title, (canvas.width / 2) - 393, (canvas.height / 4) - 150)
	}

	if (pause == "pause") {
		ctx.fillStyle = "#FFFFFF";
		ctx.font = "28px impact";
		ctx.drawImage(Pause, (canvas.width / 2) - 190, (canvas.height / 2) - 50);
		ctx.fillText("Presiona Enter para continuar", (canvas.width / 2) - 175, (canvas.height / 2) + 110);
		ctx.fillText("Presiona ESC para salir", (canvas.width / 2) - 135, (canvas.height / 2) + 140);
	}

	else if (pause == "menu") {
		ctx.drawImage(Menu, (canvas.width / 2) - 150, (canvas.height / 2) - 50);

		ctx.fillStyle = "#FFFFFF";
		ctx.font = "28px impact";

		ctx.fillText("Un Jugador", (canvas.width / 2) - 50, (canvas.height / 2));
		ctx.fillText("Dos Jugadores", (canvas.width / 2) - 50, (canvas.height / 2) + 46);
		ctx.fillText("Opciones", (canvas.width / 2) - 50, (canvas.height / 2) + 120);
		

		if (mode == "CPU") {
			ctx.drawImage(ball.texture, (canvas.width / 2) - 100, (canvas.height / 2) - 22);
			ctx.fillText("W ↑", player.x + player.width, player.y);
			ctx.fillText(" S ↓", player.x + player.width, player.y + player.height + 28);
		}

		else if (mode == "player2") {
			ctx.drawImage(ball.texture, (canvas.width / 2) - 100, (canvas.height / 2) + 24 );
			ctx.fillText("W", player.x + player.width, player.y);
			ctx.fillText(" S", player.x + player.width, player.y + player.height + 28);
			ctx.fillText("↑", bar.x - 28, bar.y);
			ctx.fillText("↓", bar.x - 28, bar.y + bar.height + 28);
		}

		else if (mode == "options")
			ctx.drawImage(ball.texture, (canvas.width / 2) - 100, (canvas.height / 2) + 98);

		ctx.font = "18px impact";
		ctx.fillText("By Leonardocasi", 2, canvas.height - 2);
	}

	else if (pause == "options") {
		ctx.drawImage(Options, (canvas.width / 2) - 225, (canvas.height / 2) - 50);

		ctx.font = "18px impact";

		ctx.fillStyle = "#FFFFFF";
		ctx.fillText("Área de juego", (canvas.width / 2) - 140, (canvas.height / 2));
		ctx.fillStyle = "#FFFF33";
		ctx.fillText(canvas.width, (canvas.width / 2) + 40, (canvas.height / 2));
		ctx.fillText("x         " + canvas.height, (canvas.width / 2) + 100, (canvas.height / 2));

		ctx.fillStyle = "#FFFFFF";
		ctx.fillText("Velocidad de la pelota", (canvas.width / 2) - 140, (canvas.height / 2) + 36);
		if (ballSpeed >= 10)
		ctx.fillStyle = "#FF2222";
		else ctx.fillStyle = "#FFFF33";
		ctx.fillText(ballSpeed, (canvas.width / 2) + 40, (canvas.height / 2) + 36);

		ctx.fillStyle = "#FFFFFF";
		ctx.fillText("Puntuación límite", (canvas.width / 2) - 140, (canvas.height / 2) + 36 * 2);
		ctx.fillStyle = "#FFFF33";
		ctx.fillText(limit, (canvas.width / 2) + 40, (canvas.height / 2) + 36 * 2);

		ctx.fillText("volver", (canvas.width / 2) - 140, (canvas.height / 2) + 120);

		if (mode == "area" || mode == "area1" || mode == "area2") {
			ctx.drawImage(ball.texture, (canvas.width / 2) - 180, (canvas.height / 2) - 18)
			if (mode == "area1") {
				ctx.fillText("▲", (canvas.width / 2) + 50, (canvas.height / 2)-18);
				ctx.fillText("▼", (canvas.width / 2) + 50, (canvas.height / 2)+18);
			}
			else if (mode == "area2") {
				ctx.fillText("▲", (canvas.width / 2) + 147, (canvas.height / 2)-18);
				ctx.fillText("▼", (canvas.width / 2) + 147, (canvas.height / 2)+18);
			}
		}

		else if (mode == "speed" || mode == "speed1") {
			ctx.drawImage(ball.texture, (canvas.width / 2) - 180, (canvas.height / 2) - 18 + 36)
			if (mode == "speed1") {
				ctx.fillText("▲", (canvas.width / 2) + 50, (canvas.height / 2)-20 +36);
				ctx.fillText("▼", (canvas.width / 2) + 50, (canvas.height / 2)+20 +36);
			}
		}
		
		else if (mode == "points" || mode == "points1") {
			ctx.drawImage(ball.texture, (canvas.width / 2) - 180, (canvas.height / 2) - 18 + 36 * 2)
			if (mode == "points1") {
				ctx.fillText("▲", (canvas.width / 2) + 50, (canvas.height / 2)-20 +36*2);
				ctx.fillText("▼", (canvas.width / 2) + 50, (canvas.height / 2)+20 +36*2);
			}
		}

		else if (mode == "back") {
			ctx.drawImage(ball.texture, (canvas.width / 2) - 180, (canvas.height / 2) - 18 + 120)
		}

		ctx.font = "18px impact";
		ctx.fillText("v1.0", 2, canvas.height - 2);
	}

	else if (pause == "win") {
		ctx.fillStyle = "#ffff22";
		ctx.font = "50px impact";
		ctx.fillText("GANA EL", (canvas.width / 2) - 80, (canvas.height / 2) - 25);
		
		if (points.p1 == limit) {
			ctx.fillText("JUGADOR 1", (canvas.width / 2) - 100, (canvas.height / 2) + 25 + 40);
		}

		else if (points.p2 == limit) {
			ctx.fillText("JUGADOR 2", (canvas.width / 2) - 100, (canvas.height / 2) + 25 + 40);
		}

		ctx.fillStyle = "#fff";
		ctx.font = "20px impact";
		ctx.fillText("Presiona Enter para continuar", (canvas.width / 2) - 120, (canvas.height / 2) + 100);
	}
}

start(0);
requestAnimationFrame(update);

window.addEventListener("keydown", ({keyCode}) => {
	//console.log(keyCode);
	
	switch(keyCode) {
		case 87:
			keys.up = true;

			if (pause == "menu") {
				if (mode == "player2")
					mode = "CPU";
				else if (mode == "options")
					mode = "player2";
				else if (mode == "CPU")
					mode = "options";
			}

			else if (pause == "options") {
				if (mode == "area")
					mode = "back";
				else if (mode == "back")
					mode = "points";
				else if (mode == "points")
					mode = "speed";
				else if (mode == "speed")
					mode = "area";

				else if (mode == "area1")
				{
					canvas.width += 50;
					start(0);
				}
				else if (mode == "area2")
				{
					canvas.height += 50;
					start(0);
				}
				else if (mode == "speed1")
					ballSpeed++;
				else if (mode == "points1")
					limit++;
			}
			break;

		case 83:
			keys.down = true;

			if (pause == "menu") {
				if (mode == "player2")
					mode = "options";
				else if (mode == "options")
					mode = "CPU";
				else if (mode == "CPU")
					mode = "player2";
			}

			else if (pause == "options") {
				if (mode == "area")
					mode = "speed";
				else if (mode == "back")
					mode = "area";
				else if (mode == "points")
					mode = "back";
				else if (mode == "speed")
					mode = "points";

				else if (mode == "area1") {
					if (canvas.width > 800) {
						canvas.width -= 50;
						start(0);
					}
				}
				else if (mode == "area2") {
					if (canvas.height > 600) {
						canvas.height -= 50;
						start(0);
					}
				}
				else if (mode == "speed1") {
					if (ballSpeed > 1) {
						ballSpeed--;
					}
				}
				else if (mode == "points1") {
					if (limit > 1) {
						limit--;
					}
				}
			}
			break;

		case 13:
			if(pause == "game")
				pause = "pause";

			else if (pause == "menu") {
				if (mode != "options") {
					start(0)
					pause = "game";
				}

				else if (mode == "options") {
					pause = "options";
					mode = "area";
				}
			}

			else if (pause == "options") {
				if (mode == "area")
					mode = "area1";
				else if (mode == "area1")
					mode = "area2";
				else if (mode == "area2")
					mode = "area";

				else if (mode == "speed")
					mode = "speed1";
				else if (mode == "speed1")
					mode = "speed";

				else if (mode == "points")
					mode = "points1";
				else if (mode == "points1")
					mode = "points";

				else if (mode == "back") {
					pause = "menu";
					mode = "CPU"
				}

			}

			else if (pause == "win") {
				pause = "menu";
				points = {p1: 0, p2: 0}
				start(0)
			}

			else pause = "game";
			break;

		case 27:
			if (pause == "pause") {
				points.p1 = 0;
				points.p2 = 0;
				start(0);
				pause = "menu"
				mode = "CPU"
			}

			if (pause == "game")
				pause = "pause";
			break;

		case 69:
			keys.E1 = true;
			break;
	}

	switch(keyCode) {
		case 38:
			keys.up1 = true;

			if (pause == "menu") {
				if (mode == "player2")
					mode = "CPU";
				else if (mode == "options")
					mode = "player2";
				else if (mode == "CPU")
					mode = "options";
			}

			else if (pause == "options") {
				if (mode == "area")
					mode = "back";
				else if (mode == "back")
					mode = "points";
				else if (mode == "points")
					mode = "speed";
				else if (mode == "speed")
					mode = "area";

				else if (mode == "area1") {
					canvas.width += 50;
					start(0);
				}
				else if (mode == "area2") {
					canvas.height += 50;
					start(0);
				}
				else if (mode == "speed1")
					ballSpeed++;
				else if (mode == "points1")
					limit++;
			}
			break;

		case 40:
			keys.down1 = true;

			if (pause == "menu") {
				if (mode == "player2")
					mode = "options";
				else if (mode == "options")
					mode = "CPU";
				else if (mode == "CPU")
					mode = "player2";
			}

			else if (pause == "options") {
				if (mode == "area")
					mode = "speed";
				else if (mode == "back")
					mode = "area";
				else if (mode == "points")
					mode = "back";
				else if (mode == "speed")
					mode = "points";

				else if (mode == "area1") {
					if (canvas.width > 800) {
						canvas.width -= 50;
						start(0);
					}
				}
				else if (mode == "area2") {
					if (canvas.height > 600) {
						canvas.height -= 50;
						start(0);
					}
				}
				else if (mode == "speed1") {
					if (ballSpeed > 1) {
						ballSpeed--;
					}
				}
				else if (mode == "points1") {
					if (limit > 1) {
						limit--;
					}
				}
			}
			break;

		case 37:
			keys.E2 = true;
			break;
	}
});

window.addEventListener("keyup", ({keyCode}) => {
	switch(keyCode) {
		case 87:
			keys.up = false;
			break;

		case 83:
			keys.down = false;
			break;

		case 69:
			keys.E1 = false;
			break;
	}

	switch(keyCode) {
		case 38:
			keys.up1 = false;
			break;

		case 40:
			keys.down1 = false;
			break;

		case 37:
			keys.E2 = false;
			break;
	}
});