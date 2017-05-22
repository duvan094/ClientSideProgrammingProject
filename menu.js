/*Frontpage Menu Sound Check*/
var soundChange = document.getElementById("sound");
var soundOn = false;

soundChange.addEventListener("click",soundEvent);


function soundEvent() {
	if(!soundOn){
		soundChange.className = "clicked";
	}else{
		soundChange.className = ""; //Remove the css class
	}
  soundOn = !soundOn;
}

document.getElementById("gameButton").addEventListener("click",function(){
	getScreen("game");
});

document.getElementById("highscoreButton").addEventListener("click",function(){
	getScreen("highscore");
});

document.getElementById("infoButton").addEventListener("click",function(){
	getScreen("info");
});
