var soundOn; //A variable to keep track on if the sound is on

if (window.localStorage.soundOn !== undefined) { //Check if there are any sound settings saved previously
	soundOn = JSON.parse(window.localStorage.soundOn);
} else {
	soundOn = true;
}


/*Menu Sound button*/
var soundButton = document.getElementById("sound");

/*A function for giving the sound button the right look*/
function toggleSoundCss(){
	if(!soundOn){//if sound is off
		soundButton.className = "mute";
	}else{
		soundButton.className = ""; //Remove the css class
	}
}

toggleSoundCss();//Set the sound symbol to display sound on or sound off, depending on what the global variable is set to.

/*
 * If the sound button is clicked we set the global variable for sound,
 * found in main.js, to its opposite and change the css.
 */
soundButton.addEventListener("click",function() {
	soundOn = !soundOn;

	toggleSoundCss();
	window.localStorage.soundOn = JSON.stringify(soundOn);//Save the soundOn variable to the localstorage.
});



document.getElementById("gameButton").addEventListener("click",function(){
	getScreen("game");
});

document.getElementById("highscoreButton").addEventListener("click",function(){
	getScreen("highscore");
});

document.getElementById("infoButton").addEventListener("click",function(){
	getScreen("info");
});
