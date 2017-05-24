var highscoreArr = [];
var highscoreList = document.getElementById("highscoreList");

/*Get the get highscores from localStorage if there are any saved*/
if (window.localStorage.highscores !== undefined) {
	highscoreArr = JSON.parse(window.localStorage.highscores);
	highscoreList.innerHTML = "";

	for(var i = 0; i<highscoreArr.length; i++){
		var highscoreElt = document.createElement("li");
		highscoreElt.innerHTML = highscoreArr[i];
		highscoreList.appendChild(highscoreElt);
	}

} else {
	//If no highscores...
}



document.getElementById("menuButton").addEventListener("click",function(){
	getScreen("menu");
});
