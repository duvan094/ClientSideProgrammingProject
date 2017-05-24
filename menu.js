/*A function for giving the sound button the right look*/
function toggleSoundCss(){
	if(!soundOn){//if sound is off
		soundChange.className = "clicked";
	}else{
		soundChange.className = ""; //Remove the css class
	}
}

toggleSoundCss();//Set the sound symbol to display sound on or sound off, depending on what the global variable is set to.

/*Menu Sound button*/
var soundChange = document.getElementById("sound");

/*
 * If the sound button is clicked we set the global variable for sound,
 * found in main.js, to its opposite and change the css.
 */
soundChange.addEventListener("click",function() {
	soundOn = !soundOn;
	toggleSoundCss();
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
