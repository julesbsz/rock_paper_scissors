document.addEventListener("DOMContentLoaded", function () {
	var splide = new Splide(".splide");
	splide.mount();
});

const scoreElement = document.querySelector(".numbers");

if (localStorage.getItem("score") === null) {
	score = [0, 0];
} else {
	score = JSON.parse(localStorage.getItem("score"));
	scoreElement.innerHTML = score[0] + " : " + score[1];
}

gameStatus = "";

function getSign() {
	var signs = ["rock", "paper", "scissors"];
	var randomSign = Math.floor(Math.random() * 3);
	return signs[randomSign];
}

function getWinner(userSign, computerSign) {
	if (userSign === computerSign) {
		gameStatus = "EQUALITY";
		return "Computer also made " + computerSign;
	} else if (userSign === "rock") {
		if (computerSign === "paper") {
			score[1]++;
			gameStatus = "LOST";
			return "Computer made paper";
		} else {
			score[0]++;
			gameStatus = "WON";
			return "Computer made paper";
		}
	} else if (userSign === "paper") {
		if (computerSign === "scissors") {
			score[1]++;
			gameStatus = "LOST";
			return "Computer made paper";
		} else {
			score[0]++;
			gameStatus = "WON";
			return "Computer made scissors";
		}
	} else if (userSign === "scissors") {
		if (computerSign === "rock") {
			score[1]++;
			gameStatus = "LOST";
			return "Computer made rock";
		} else {
			score[0]++;
			gameStatus = "WON";
			return "Computer made scissors";
		}
	}
}

const signs = document.querySelectorAll(".sign");
const winnerElement = document.querySelector(".winner");
const statusElement = document.querySelector(".status");
const saveButton = document.querySelector("#save");

signs.forEach((sign) => {
	sign.addEventListener("click", function () {
		const userSign = sign.dataset.sign;
		const computerSign = getSign();
		const winner = getWinner(userSign, computerSign);
		winnerElement.innerHTML = winner;
		scoreElement.innerHTML = score[0] + " : " + score[1];
		statusElement.innerHTML = gameStatus;
		saveButton.disabled = false;
		saveButton.innerHTML = "Save my score";
	});
});

const resetButton = document.querySelector("#reset");

resetButton.addEventListener("click", function () {
	score = [0, 0];
	localStorage.setItem("score", JSON.stringify([0, 0]));
	scoreElement.innerHTML = score[0] + " : " + score[1];
	winnerElement.innerHTML = "&nbsp;";
	statusElement.innerHTML = "&nbsp;";
});

saveButton.addEventListener("click", function () {
	localStorage.setItem("score", JSON.stringify(score));
	saveButton.innerHTML = "Saved !";
	saveButton.disabled = true;
});
