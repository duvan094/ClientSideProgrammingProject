var myRequest = new XMLHttpRequest(); // This object contains methods for fetching data from other files
myRequest.responseType = "text"; // choose between document, text, json, blob and arraybuffer

/*A function for requesting the game*/
function getGame(){
  myRequest.open("GET", "game.html"); // the file you wish to fetch
  myRequest.send(); // send the request for the file

  // this is an event listener. It will run your function when the page has loaded.
  myRequest.addEventListener("load", function(e){
  	document.getElementById("main-container").innerHTML = myRequest.responseText; // if you choose text as responseType you'll find the contents of the file as a string using the property response or responseText
  });

  /*Add the game script file*/
  var gameScript = document.createElement('script');
  gameScript.src = "game.js";

  document.body.appendChild(gameScript);
}

getGame();
