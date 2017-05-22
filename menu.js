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
