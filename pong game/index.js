const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

let hit = new Audio();
let wall = new Audio();
let userScore = new Audio();
let comScore = new Audio();

hit.src = 'sounds/hit.mp3';
wall.src = 'sounds/wall.mp3';
comScore.src = 'sounds/comScore.mp3';
userScore.src = 'sounds/userScore.mp3';

class Paddle {
	constructor(x, y, width, height, score, color) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.score = score;
		this.color = color;
	}
}

const user = new Paddle(0, (canvas.height - 100) / 2, 10, 100, 0, 'WHITE');
const com = new Paddle(canvas.width - 10, (canvas.height - 100) / 2, 10, 100, 0, 'WHITE');
const net = new Paddle((canvas.width - 2) / 2, 0, 2, 10, null, 'WHITE');

function drawRect(x, y, w, h, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, w, h);
}

function drawArc(x, y, r, color) {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.fill();
}

canvas.addEventListener('mousemove', getMousePos);

function getMousePos(evt) {
	let rect = canvas.getBoundingClientRect();
	user.y = evt.clientY - rect.top - user.height / 2;
}

function resetBall() {
	ball.x = canvas.width / 2;
	ball.y = canvas.height / 2;
	ball.velocityX = -ball.velocityX;
	ball.speed = selectedSpeed;
}

function drawNet() {
	for (let i = 0; i <= canvas.height; i += 15) {
		drawRect(net.x, net.y + i, net.width, net.height, net.color);
	}
}

function drawText(text, x, y) {
	ctx.fillStyle = '#FFF';
	ctx.font = '75px fantasy';
	ctx.fillText(text, x, y);
}

function collision(b, p) {
	p.top = p.y;
	p.bottom = p.y + p.height;
	p.left = p.x;
	p.right = p.x + p.width;

	b.top = b.y - b.radius;
	b.bottom = b.y + b.radius;
	b.left = b.x - b.radius;
	b.right = b.x + b.radius;
	return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}

function update() {
	if (ball.x - ball.radius < 0) {
		com.score++;
		comScore.play();
		resetBall();
	} else if (ball.x + ball.radius > canvas.width) {
		user.score++;
		userScore.play();
		resetBall();
	}

	ball.x += ball.velocityX;
	ball.y += ball.velocityY;
	com.y += (ball.y - (com.y + com.height / 2)) * 0.1;

	if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
		ball.velocityY = -ball.velocityY;
		wall.play();
	}

	let player = ball.x + ball.radius < canvas.width / 2 ? user : com;

	if (collision(ball, player)) {
		hit.play();
		let collidePoint = ball.y - (player.y + player.height / 2);
		collidePoint = collidePoint / (player.height / 2);

		let angleRad = (Math.PI / 4) * collidePoint;

		let direction = ball.x + ball.radius < canvas.width / 2 ? 1 : -1;
		ball.velocityX = direction * ball.speed * Math.cos(angleRad);
		ball.velocityY = ball.speed * Math.sin(angleRad);

		ball.speed += 0.1;
	}
}

function render() {
	drawRect(0, 0, canvas.width, canvas.height, boardColor);
	drawRect(0, 0, (1 / 24) * canvas.width, canvas.height, 'GREEN');
	drawRect(
		(1 / 24) * canvas.width,
		0,
		(1 / 12) * canvas.width,
		canvas.height,
		'rgba(255, 245, 52, 0.807)'
	);
	drawRect(
		(21 / 24) * canvas.width,
		0,
		(1 / 12) * canvas.width,
		canvas.height,
		'rgba(255, 245, 52, 0.807)'
	);
	drawRect((23 / 24) * canvas.width, 0, (1 / 24) * canvas.width, canvas.height, 'GREEN');

	drawText(user.score, canvas.width / 4, canvas.height / 5);
	drawText(com.score, (3 * canvas.width) / 4, canvas.height / 5);
	drawNet();

	drawRect(user.x, user.y, user.width, user.height, user.color);

	drawRect(com.x, com.y, com.width, com.height, com.color);
	if (impossibleMode) {
		net.x = (1 / 3) * canvas.width;
		drawNet();
		net.x = (2 / 3) * canvas.width;
		drawNet();
	} else {
		drawNet();
	}
	if (impossibleMode && ball.x > (1 / 3) * canvas.width && ball.x < (2 / 3) * canvas.width) {
		return;
	} else {
		drawArc(ball.x, ball.y, ball.radius, ball.color);
	}
}
function game() {
	update();
	render();
}

const FRAME_PER_SECOND = 50;
let selectedSpeed = null;
const ball = {
	x: canvas.width / 2,
	y: canvas.height / 2,
	radius: 10,
	velocityX: 5,
	velocityY: 5,
	speed: selectedSpeed,
	color: 'BROWN',
};

let boardColor = null;
let impossibleMode = false;

[...document.querySelectorAll('.menu .button-3')].forEach((button) =>
	button.addEventListener('click', () => {
		document.querySelector('.menu').style.display = 'none';
		document.querySelector('.button').style.display = 'block';
		if (button.innerText === 'Slow') {
			selectedSpeed = 7.5;
			boardColor = 'rgba(0, 234, 255, 0.5)';
		} else {
			selectedSpeed = 12;
			boardColor = 'RED';
		}
		if (button.innerText === 'Impossible') {
			impossibleMode = true;
			selectedSpeed = 12.5;
		}
		ball.speed = selectedSpeed;
		let loop = setInterval(game, 1000 / FRAME_PER_SECOND);
	})
);
