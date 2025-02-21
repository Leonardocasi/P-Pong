let hit0 = new Audio('Sounds/hit0.wav');
let hit1 = new Audio('Sounds/hit1.wav');

function Sound(file) {
	if (audio) {
		file.pause()
		file.load()
		file.play()
	}
}