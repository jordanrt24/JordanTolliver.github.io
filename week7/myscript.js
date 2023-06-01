const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext('2d');
const RADIUS = 10;
const X_MAX = canvas.width;
const Y_MAX = canvas.height;
const HOT_DOG_WIDTH = (1 / 2) * X_MAX;
const HOT_DOG_HEIGHT = (2 / 5) * Y_MAX;
const Y_POS = (1 / 2) * Y_MAX;
const X_POS = (1 / 4) * X_MAX;
let y = Y_POS;
let x = Math.random() * HOT_DOG_WIDTH + X_POS;

const DY_THRESHOLD = 2;
const DY_CONSTANT = 55 - DY_THRESHOLD;
let dy = null;

class HotDog {
	constructor(condition, temperature, length, condiments, bread, meat) {
		this.condition = condition;
		this.temperature = temperature;
		this.length = length;
		this.condiments = condiments;
		this.bread = bread;
		this.meat = meat;
	}
	timeTillCool = () => {
		if (this.temperature <= 55) {
			return 'Hotdog is already cold';
		}
		let time = parseInt(this.temperature) - 50;
		return 'It will take ' + time + ' minutes before your hotdog gets cold!';
	};
	timeTillConsumption = () => {
		let time = parseInt(this.length) * 0.5;
		return 'It will take ' + time + ' minutes for you to finish your hotdog!';
	};
}
const updateFunction = () => {
	const form = document.myForm;
	const userHotDog = new HotDog(
		form.Condition.value,
		form.Temperature.value,
		form.Length.value,
		form.Condiments.value,
		form.Bread.value,
		form.Meat.value
	);
	document.getElementById('condition').innerHTML = userHotDog.condition;
	document.getElementById('temperature').innerHTML = userHotDog.temperature;
	document.getElementById('length').innerHTML = userHotDog.length;
	document.getElementById('condiments').innerHTML = userHotDog.condiments;
	document.getElementById('bread').innerHTML = userHotDog.bread;
	document.getElementById('meat').innerHTML = userHotDog.meat;
	document.getElementById('coolingTime').innerHTML = userHotDog.timeTillCool();
	document.getElementById('eatingTime').innerHTML = userHotDog.timeTillConsumption();
	document.querySelector('.wrapper').style.display = 'flex';

	dy = userHotDog.temperature - DY_CONSTANT;
};

[...document.querySelectorAll('.section')].forEach(function (item) {
	item.addEventListener('mouseup', () => {
		if (
			window.getComputedStyle(item).background ===
			'rgba(0, 0, 255, 0.32) none repeat scroll 0% 0% / auto padding-box border-box'
		) {
			item.style.background = 'yellow';
		} else {
			item.style.background = 'rgba(0, 0, 255, 0.322)';
		}
	});
});

const hotDogPhoto = document.querySelector('.hotdog-section');
const hotDogText = document.querySelector('.hotdog-text');
hotDogPhoto.addEventListener('click', () => {
	if (hotDogText.innerText === "Hey, don't do that!") {
		hotDogText.innerText = 'Ouch!';
	} else if (hotDogText.innerText === 'Ouch!') {
		hotDogText.innerText = 'Quit it!';
	} else {
		hotDogText.innerText = "Hey, don't do that!";
	}
});

const animate = () => {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	init();
	if (y < 0 && dy <= DY_THRESHOLD) {
		canvas.style.background = 'rgba(0, 234, 255, 0.961)';
		return;
	} else if (y < 0) {
		y = Y_POS;
		x = Math.random() * HOT_DOG_WIDTH + X_POS;
	}

	ctx.strokeStyle = 'blue';
	ctx.arc(x, y, RADIUS, 0, 2 * Math.PI, false);
	ctx.stroke();
	dy -= 1 / 60;
	y -= dy;
	document.getElementById('temperature').innerHTML = (dy + DY_CONSTANT).toFixed(1);

	let canvasMessage = canvasTemperatureTime(dy);
	document.getElementById('coolingTime').innerHTML = canvasMessage;
};
const init = () => {
	ctx.fillStyle = 'red';
	ctx.fillRect(X_POS, Y_POS, HOT_DOG_WIDTH, HOT_DOG_HEIGHT);
};
const canvasTemperatureTime = (dy) => {
	if (dy <= DY_THRESHOLD) {
		return 'Hotdog is now cold';
	}
	let time = (dy - DY_THRESHOLD).toFixed(1);
	return 'It will take ' + time + ' seconds before your hotdog gets cold!';
};

document.querySelector('#canvasButton').addEventListener('click', animate);
