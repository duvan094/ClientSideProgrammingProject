var soundOn; //A global variable to keep track on if the sound is on

if (window.localStorage.soundOn !== undefined) { //Check if there are any sound settings saved previously
	soundOn = JSON.parse(window.localStorage.soundOn);
} else {
	soundOn = true;
}

/*
* A function that is called to request a new screen. Call getScreen with a string containing the screen name.
* For example: getScreen("menu");, getScreen("game");. To make this function to work you have to give the
* .html and .js file the same name.
*/
function getScreen(screen){
  var container = document.getElementById("main-container");

  var myRequest = new XMLHttpRequest(); // This object contains methods for fetching data from other files
  myRequest.responseType = "text"; // choose between document, text, json, blob and arraybuffer

  myRequest.open("GET", screen + ".html"); // the file you wish to fetch
  myRequest.send(); // send the request for the file

  // this is an event listener. It will run your function when the page has loaded.
  myRequest.addEventListener("load", function(e){
  	container.innerHTML = myRequest.responseText; // if you choose text as responseType you'll find the contents of the file as a string using the property response or responseText
    /*Add the game script file*/
    var script = document.createElement('script');
    script.src = screen + ".js";

    container.appendChild(script);
  });

}

getScreen("menu");
