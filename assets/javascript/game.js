//Our variables!!! YEAHH!!!!!!
var hits = [];
var blanks = [];
var regex=/[a-zA-Z]/
var currentWord  = document.getElementById("currentWord");
var Wins = document.getElementById("Wins");
var numOfGuesses = document.getElementById("numOfGuesses");
var appendGuesses = document.getElementById("Guesses");
var Guesses = [];
var winCount = 0;
var guessCount = 13;
var discChanger = document.getElementById("discChanger")
var WHY = document.getElementById("WHY")
var pic = document.getElementById("pic")

//Game Object
var Hangman = {
	wordOne: "magic",
	wordTwo: "grimoire",
	wordThree: "charm",
	wordFour: "witchcraft",
	wordFive: "black cat",
	wordSix: "faerie",
	wordSeven: "long beard",
	wordEight: "pointy hat",

	gameStart: function() {

		//Creates an array out of the values in this object, but excludes the functions.
		var newArray = Object.values(this);
		for (count = 0; count < newArray.length; count++) {
			if (count > 7) {
				newArray.splice(count)
			}
		}

		//Choice randomizer from RPS game :P!!!
		var wordSelect = newArray[Math.floor(Math.random() * newArray.length)];

		//Pushes the selected word into two arrays: the displayed blanks, and the variable
		//we will test against the user's guesses.
		for (count = 0; count < wordSelect.length; count++) {
			hits.push(wordSelect.charAt(count));
		};
		
		for (count = 0; count < wordSelect.length; count++) {
			if (wordSelect[count] === " ") {
				blanks.push(" ")
			}
			else {
				blanks.push("_")
			}
		};
		//Sets up our DOM so that the game looks freshly loaded and ready to play.
		currentWord.innerHTML = (blanks.join(""));
		Wins.innerHTML = ("Wins: " + winCount);
		numOfGuesses.innerHTML = (guessCount);

		document.onkeydown = function(event) {
			var userGuess = event.key;
			if (userGuess.match(regex) && userGuess.length === 1
				&& guessCount > -1) {


			  if (hits.indexOf(userGuess) === -1 
			      && Guesses.indexOf(userGuess) === -1
			      && guessCount > -1) {
			  	guessCount--
			  	numOfGuesses.innerHTML = guessCount
			  	Guesses.push(userGuess);
			  	Guesses.push(" "); 
			  	appendGuesses.innerHTML = Guesses.join("");
			  }

			  for (count = 0; count < hits.length; count ++) {
				  if (userGuess.toLowerCase() === hits[count]) {
					  blanks.splice(count, 1, userGuess.toLowerCase());
					  currentWord.innerHTML = blanks.join("");
				   } 
			  }
				 if (blanks.toString() === hits.toString()){
				  	  winCount++
				  	  Wins.innerHTML = ("Wins: " + winCount)
				  	  currentWord.innerHTML = ""
				  	  blanks.splice(0, 10)
				  	  hits.splice(0, 10)
					  wordSelect = newArray[Math.floor(Math.random() * newArray.length)];
					  guessCount = 13
					  numOfGuesses.innerHTML = guessCount
			  		  Guesses.splice(0, 28);
					  for (count = 0; count < wordSelect.length; count++) {
			             hits.push(wordSelect.charAt(count));
		              };
				  	  for (count = 0; count < wordSelect.length; count++) {
				  	  	if (wordSelect[count] === " ") {
				  	  		blanks.push(" ")
				  	  	}
				  	  	else {
				  	  		blanks.push("_")
				  	  	}
				  	  	currentWord.innerHTML = (blanks.join(""));
				  	  	appendGuesses.innerHTML = Guesses.join("");
				  	  	discChanger.setAttribute("src", "assets/Music/MAGICWAYS.mp3");
				  	  	discChanger.play();
				  	  	WHY.innerHTML = ""
				  	  	pic.setAttribute("src", "assets/images/sparkle.gif")
				  	  }
				 }
				 else if (guessCount === 0){
				  	  blanks.splice(0, 10)
				  	  hits.splice(0, 10)
					  wordSelect = newArray[Math.floor(Math.random() * newArray.length)];
					  guessCount = 13
					  numOfGuesses.innerHTML = guessCount
			  		  Guesses.splice(0, 28);
					  for (count = 0; count < wordSelect.length; count++) {
			             hits.push(wordSelect.charAt(count));
		              };
				  	  for (count = 0; count < wordSelect.length; count++) {
				  	  	if (wordSelect[count] === " ") {
				  	  		blanks.push(" ")
				  	  	}
				  	  	else {
				  	  		blanks.push("_")
				  	  	}
				  	  	currentWord.innerHTML = (blanks.join(""));
				  	  	appendGuesses.innerHTML = Guesses.join("");	
                        discChanger.setAttribute("src", "assets/Music/JODY.mp3")
				  	  	discChanger.play()
				  	  	WHY.innerHTML = "R.I.P.";
				  	  	pic.setAttribute("src", "assets/images/DEATH.jpg")
				  	  }
				 }



			}
		}
	}
}

document.onload = Hangman.gameStart()