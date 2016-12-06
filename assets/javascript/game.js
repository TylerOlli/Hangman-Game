


var keyboardKeys = "qwertyuiopasdfghjklzxcvbnm".split('');

var hangman = {
	hidden: [],
	answer: [],
	choices: [""],
	possibleWords: ['mario', 'luigi', 'bowser', 'peach', 'nintendo', 'videogame', 'mushroom', 'super', 'brothers', 'super mario', 'kingdom', 'donkey kong'],
	wins: 	0,
	losses: 0,
	attempts: 6,
	keyboard: keyboardKeys,
	currentKey: "",
	playSound: function(filepath){
		var audioElement = document.createElement('audio');
			audioElement.setAttribute('src', filepath);
			
			audioElement.addEventListener("load", function() { 
			  audioElement.play(); 
			}, true);
			audioElement.load();
			audioElement.play();
	},
	checkWin: function(){
		if(this.hidden.indexOf('-') < 0) {
			var winner = this.answer.toString();
			winner = winner.replace(/\,/g,'');
			document.getElementById('hidden').innerHTML = winner;
			this.wins++;
			this.display();
			console.log("-----\nthis should be below the display log");
			///////////////////////////////////////Play sound code
			this.playSound('http://www.moviesoundclips.net/movies1/tron/radical.mp3');
			//end of game
			setTimeout(function(){ alert("Congratulations, Mario you win.\nYou got the word in question! Amazing Job!" + "\nYou got the word:  " + winner);}, 1000);
			setTimeout(function(){ hangman.resetGame(); }, 1000);
		}
	},
	checkKey: function(val){ //literally checking the keypress for everything here
		var testArr = [];
		
		if(this.choices.indexOf(val) >= 0){ // checks to see if you already pressed a given key
			console.log("YOU ALREADY TRIED THAT");
			this.playSound('http://datacore.sciflicks.com/tron/sounds/tron_bit_no.wav');
		return;
		}

		if(this.keyboard.indexOf(val) < 0 || this.attempts <= 0) { // checks to see if you pressed something besides a letter
			console.log("you didn't press a letter");
			this.playSound('http://datacore.sciflicks.com/tron/sounds/tron_bit_no.wav');
		return;
		}

		this.choices.push(val); //pushes the most recent keypress to an array of previous choices
		document.getElementById(val).style.backgroundColor = "#1dc9f1"; //changes the background of the key most recently pressed to show it's been pressed

		if(this.answer.indexOf(val) >= 0){ //checking to see if you picked a letter that is in the answer
			this.playSound('http://datacore.sciflicks.com/tron/sounds/tron_bit_yes.wav');
			for(var i = 0; i < this.answer.length; i++){ //loop to check for multiple instances of the letter you just picked in the answer
				if(val === this.answer[i]){
					testArr.push(i);
				}
			}
			for(var i = 0; i < testArr.length; i++){
				this.hidden[testArr[i]] = this.answer[testArr[i]];
			}
			this.display();
			//function to check for the win
			this.checkWin();
		}
		else {
			this.playSound('http://datacore.sciflicks.com/tron/sounds/tron_bit_no.wav');
			this.attempts--;
			this.display();
			if(this.attempts <= 0) {//if statement to check for the loss
				var loserAnswer = this.answer.toString();
				loserAnswer = loserAnswer.replace(/\,/g,'');
				this.losses++;
				//play losing sound
				this.playSound('http://www.moviesoundclips.net/movies1/tron/endofline.mp3');
				setTimeout( function loseGame() {
				alert(" You Lost A Life\n Please try again\n Your word was:  " + loserAnswer + "\n Try again next time");
				hangman.resetGame();
			}, 5000);
			}
		}



	},
	display: function(){//function to display/append all the information to the html page
		var hiddenStr = "";
		document.getElementById('attempts').innerHTML = this.attempts;
		document.getElementById('wins').innerHTML = this.wins;
		document.getElementById('losses').innerHTML = this.losses;
		for(var i = 0; i < this.hidden.length; i++){
			hiddenStr += this.hidden[i];
		}
		document.getElementById('hidden').innerHTML = hiddenStr;
		return;

	},
	resetGame: function(){
		this.choices = [""];
		this.currentKey = "";
		this.hidden = [];
		this.answer = this.possibleWords[Math.floor(Math.random() * this.possibleWords.length)].split('');
		for(var i = 0; i < this.answer.length; i++){
			this.hidden.push("-");
		}
		this.attempts = 6;
		choices = [];
		for(var i = 0; i < this.keyboard.length; i++){
			var keyBackground = document.getElementById(this.keyboard[i]);
			keyBackground.style.backgroundColor = "#092e47";
		}
		this.display();
		this.playSound('http://www.moviesoundclips.net/movies1/tron/battle.mp3');
			
		//	https://googledrive.com/host/0B75VjK_3Ysw1RHRJWnR5Y1lGQ1k/battle.mp3
		// https://drive.google.com/file/d/0B75VjK_3Ysw1aG5SSXdyUlRqSG8/view?usp=sharing
		return;
	}
};

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");
    
//create fancy keyboard
for(var i = 0; i < hangman.keyboard.length; i++) {
	var element = document.createElement("div");
	element.innerHTML = "<p>" + hangman.keyboard[i] + "</p>";
	element.className +=" " + "keyboard-button neon-font";
	element.id = hangman.keyboard[i];
	document.getElementById("keyboard").appendChild(element);
}
hangman.resetGame();
//listen for keyboard press
document.onkeyup = function(event){
	var playerSelection = event.key.toLowerCase();
	//checks for making the same choice twice and everything else
	hangman.checkKey(playerSelection);

	


}


});