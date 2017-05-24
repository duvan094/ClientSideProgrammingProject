var soundOn = true;//A global variable to keep track on if the sound is on


var myRequest = new XMLHttpRequest(); // This object contains methods for fetching data from other files
myRequest.responseType = "text"; // choose between document, text, json, blob and arraybuffer


/*http://www.javascriptkit.com/javatutors/loadjavascriptcss2.shtml*/
/*function removejscssfile(filename, filetype){
  var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none"; //determine element type to create nodelist from
  var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none"; //determine corresponding attribute to test for
  var allsuspects=document.getElementsByTagName(targetelement);
  for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
    if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!==null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1){
        allsuspects[i].parentNode.removeChild(allsuspects[i]); //remove element by calling parentNode.removeChild()
    }
  }
}*/


/*
* A function that is called to request a new screen. Call getScreen with a string containing the screen name.
* For example: getScreen("menu");, getScreen("game");. To make this function to work you have to give the
* .html and .js file the same name.
*/
function getScreen(screen){
  if(document.getElementById("main-container").firstChild){
    document.getElementById("main-container").querySelector("script").remove();
  }
/*  for (var i = 0; i<document.getElementById("main-container").children.length; i++){
    document.getElementById("main-container").removeChild(document.getElementById("main-container").children[i]);
  }*/
  var container = document.getElementById("main-container");

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
