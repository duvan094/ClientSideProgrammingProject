var canvas = document.getElementById("stage");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
var ctx = canvas.getContext("2d");
var pauseTriggered = false; //A boolean to keep track if pause has been triggered

var highscoreArr = [];
var highscoreElt = document.getElementById("highscore");

/*Get the get highscores from localStorage if there are any saved*/
if (window.localStorage.highscores !== undefined) {
	highscoreArr = JSON.parse(window.localStorage.highscores);
	highscoreElt.innerHTML = highscoreArr[0];//take the highest highscore from the array
} else {
	highscoreElt.innerHTML = 0;
}

var currentScore = 0;
var currentScoreElt = document.getElementById("currentScore");
currentScoreElt.innerHTML = currentScore;

canvas.style.background = "#192233";//Change this to change background of canvas



//Change the values of this array to change the colors the ball and walls can get.
var colors = ["#e22642", "#f7bb22", "#214cf7", "#5cce66"];

/*
*  A help function to chose a random color for the ball.
*  First it creates a number between 0-3 and then it returns
*  the color with that index from the array colors.
*/
function getRandomBallColor(){
  var rndNbr = Math.floor(Math.random()*4);
  return colors[rndNbr];
}

var Ball = function(x,y,radius,color,speed){//An object describing a ball
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.speed = speed;
  this.direction = "";

  this.draw = function(){//function for drawing ball
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);//drawing a circle
    ctx.fill();
  };

  this.move = function(){//A move function to update the balls position when its in motion
    if(this.direction == "up"){
      this.y -= this.speed;
    }else if(this.direction == "right"){
      this.x += this.speed * canvas.width/canvas.height;
    }else if(this.direction == "left"){
      this.x -= this.speed * canvas.width/canvas.height;
    }else if(this.direction == "down"){
      this.y += this.speed;
    }
  };

  this.isCollision = function(wall){//A function that checks if a wall is hit
    if(this.x-this.radius >= wall.x && this.x+this.radius <= wall.x+wall.width && this.y-this.radius >= wall.y && this.y+this.radius <= wall.y+wall.height){
      if(this.color === wall.color){  //If player hit the correct wall.
        currentScoreElt.innerHTML = ++currentScore;
        this.color = getRandomBallColor();  //chose new color for ball
        initWalls();
      }else{//The the player hits the wrong
        if(currentScore!==0){
          currentScoreElt.innerHTML = --currentScore;
        }
      }
      //Put the ball in the center of screen
      this.direction = "";
      this.x = canvas.width/2;
      this.y = canvas.height/2;
    }
  };

};

var ball = new Ball(canvas.width/2,canvas.height/2,20,getRandomBallColor(),15);

/*A eventlistener for a keydown to control the ball*/
document.addEventListener("keydown", function(event) {
  if (ball.direction === "" && !pauseTriggered) {//only take input if no other key is pressed and the game is not paused
  	if (event.keyCode == 87 || event.keyCode == 38) { //w or up-arrow
  		ball.direction = "up";
  	} else if (event.keyCode == 65 || event.keyCode == 37) { //a or right arrow
  		ball.direction = "left";
  	} else if (event.keyCode == 83 || event.keyCode == 40) { //s or down arrow
  		ball.direction = "down";
  	} else if (event.keyCode == 68 || event.keyCode == 39) { //d or left arrow
  		ball.direction = "right";
  	}
  }
});

/*Variables to keep track on the touch events*/
var touchStart;
var touchEnd;

document.addEventListener("touchstart", function(event){
	touchStart = event;
});

document.addEventListener("touchmove", function(event){
	touchEnd = event;
});

/*When the touchevents are done this event calculates which direction the swipe was in.*/
document.addEventListener("touchend", function(event){
	if (ball.direction === "" && !pauseTriggered && touchEnd !== undefined) {//only save swipe event as long as game is not paused, ball already moving, or no swipeEvent

		var xDiff = touchEnd.touches[0].clientX - touchStart.touches[0].clientX;
		var yDiff = touchEnd.touches[0].clientY - touchStart.touches[0].clientY;

		if(Math.abs(xDiff) > Math.abs(yDiff)){	//Horizontal swipe if the x-diff is larger than y-Diff
			if(xDiff > 0){	//chek if right or left
					ball.direction = "right";
			}else{
				ball.direction = "left";
			}
		}else{	//Vertical Swipe
			if(yDiff > 0){
				ball.direction = "down";
			}else{
				ball.direction = "up";
			}
		}
		touchEnd = undefined;
	}
});


var Wall = function(x,y,width,height,color,speed){//An object describing a wall
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.speed = speed;
  this.incSpeed = 1.02;

  this.draw = function(){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x,this.y,this.width,this.height);
  };

  this.move = function(){//A function that moves the walls
    if(width>height){//check if its a "top/bottom" or "left/right" wall
      if(y>0){  //check if wall is at the top or bottom
        this.y-=this.speed;
      }
      this.height+=this.speed;
    }else{
      if(x>0){  //check if its left or right
        this.x-=this.speed;
      }
      this.width+=this.speed;
    }
  };

  this.isCenter = function(){//A function that checks if the wall has reached the center of canvas.
    if((this.height >= (canvas.height/2)-ball.radius && width>height) || (this.width >= (canvas.width/2)-ball.radius && height>width)){
      this.speed = 0;
      return true;
    }
    return false;
  };

  this.initWall = function(){
    if(width > height){ //check if its "top/bottom" or "left/right" wall
      this.height = height;
    }else{
      this.width = width;
    }
    this.x = x;
    this.y = y;
    this.speed *= this.incSpeed;
  };

	this.resetSpeed = function(){
		this.speed = speed;
	};
};


var wallThickness = 40;//Change this to change the initial thickness of the walls

/*Getter for the speed of top and bottom*/
function getSpeedTopBottom(){
  var speed = 1;
  if(canvas.width>canvas.height){
    speed = (canvas.height/2-(ball.radius+wallThickness))/(canvas.width/2-(ball.radius+wallThickness));
  }
  return speed;
}

/*Getter for the speed of the side walls*/
function getSpeedSide(){
  var speed = 1;
  if(canvas.height>canvas.width){
    speed = (canvas.width/2-(ball.radius+wallThickness))/(canvas.height/2-(ball.radius+wallThickness));
  }
  return speed;
}

var walls = []; //Initiate the walls into an array
walls.push(new Wall(0,0,wallThickness,canvas.height,colors[0],getSpeedSide())); //Left wall
walls.push(new Wall(canvas.width-wallThickness,0,wallThickness,canvas.height,colors[1],getSpeedSide())); //right wall
walls.push(new Wall(0,0,canvas.width,wallThickness,colors[2],getSpeedTopBottom())); //top wall
walls.push(new Wall(0,canvas.height-wallThickness,canvas.width,wallThickness,colors[3],getSpeedTopBottom())); //bottom wall

/*A function for giving the walls their initial positions*/
function initWalls(){
  for(var i = 0; i<=3; i++){
    walls[i].initWall();
  }
}

/*A functioned used to update the score and highscore after its game over.*/
function updateScore(){

		var scoreInArr = false;
		for(var i = 0; i<highscoreArr.length;i++){ //Check so that the a certain score isn't added twice
				if(currentScore == highscoreArr[i]){
					scoreInArr = true;
					break;
				}
		}

		if(!scoreInArr && currentScore !== 0){	//Only add score if it isn't already in the highscore Array or if its zero.
    	highscoreArr.push(currentScore);	//Add new score
		}

   	highscoreArr.sort(function(a,b){	//sort the highscoreArr
		    return b-a;
	  });

	if(highscoreArr.length > 10) {//Remove the last element if there are more than 10 highscores saved.
		highscoreArr.pop();
	}

	if(highscoreArr[0] !== undefined){	//Check so that there even is any first element in the array.
		highscoreElt.innerHTML = highscoreArr[0];//Display the new highest highscore
	}

	window.localStorage.highscores = JSON.stringify(highscoreArr);//Put a new highscore arr in the localstorage

	currentScore = 0;
	currentScoreElt.innerHTML = currentScore;
}

/*The function that is called from update.*/
function runGame(){
  ctx.clearRect(0,0,canvas.width,canvas.height);//Clear the canvas

	var collision = false;
  for(var i = 0; i<walls.length; i++){//calling each of the walls draw function
    walls[i].draw();
    walls[i].move();
    if(walls[i].isCenter()) {//Only updates score after the walls reached the middle and its a game over
			collision = true;
		}
    ball.isCollision(walls[i]);
  }

	if(collision){//Shows the game over menu if the walls have reached the middle
		showGameOver(true);
		updateScore();
		pauseTriggered = true;
	}

  ball.draw();
  ball.move();

}



/*The update function that is called every frame*/
function update(){
	var id = window.requestAnimationFrame(update);
  if(!pauseTriggered){//Check if game is paused
    runGame();
	}else{
		window.cancelAnimationFrame(id);//Remove the animation frame if the game is paused.
	}

}


/*Stuff to show the pause menu*/
var pauseButton = document.getElementById("pauseButton");
var pauseMenu = document.getElementById("pauseMenu");
var resumeButton = document.getElementById("resumeButton");

/*An eventlistener for if the pausebutton is clicked*/
pauseButton.addEventListener("click",pauseEvent);
resumeButton.addEventListener("click",pauseEvent);

function pauseEvent(){
	pauseTriggered = !pauseTriggered;
	if(pauseTriggered){
		pauseButton.className = "clicked";  //Add a css class to the pauseButton so that it changes shape
		pauseMenu.className = "showMenu";//show pausemenu
	}else{
		pauseButton.className = ""; //Remove the css class
    pauseMenu.className = "";	//Remove pausemenu
		update();
	}

}


var gameOverMenu = document.getElementById("gameOverMenu");

function showGameOver(gameOver){
	if(gameOver){
		document.getElementById("score").innerHTML = currentScore;
		gameOverMenu.className = "showMenu";//show pausemenu
		pauseTriggered = true;
	}else{
		gameOverMenu.className = "";
	}
}

var restartButton = document.getElementById("restartButton");
restartButton.addEventListener("click",newGame);

function newGame(){//A function for initiating a new game
	initWalls();
	for(var i = 0; i<walls.length; i++){
		walls[i].resetSpeed();
	}
	showGameOver(false);//Remove Game over screen
	pauseTriggered = false;
	update();
}

newGame();//Create the new a game

document.getElementById("menuButton1").addEventListener("click",function(){
	pauseTriggered = !pauseTriggered;
	getScreen("menu");
});

document.getElementById("menuButton2").addEventListener("click",function(){
	pauseTriggered = !pauseTriggered;
	getScreen("menu");
});

document.getElementById("highscoreButton").addEventListener("click",function(){
	pauseTriggered = !pauseTriggered;
  getScreen("highscore");
});

/*
* This function is for desktop if the window should have been resized.
* In that case, the canvas is resized to fit everything properly and avoid
* stretching anything in a weird way.
* This will not be a problem on mobile devices, since the screen size never
* changes mid use, but better safe than sorry :)
*/
window.onresize = function(event) {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  ball.x = canvas.width/2;  //Make sure the ball is centered in the middle
  ball.y = canvas.height/2;

  //Updating the width and height for the walls
  walls[0].height = canvas.height;  //left wall
  walls[1].x = canvas.width-walls[1].width;  //right wall
  walls[1].height = canvas.height;
  walls[2].width = canvas.width;  //top wall
  walls[3].y = canvas.height-walls[3].height; //bottom wall
  walls[3].width = canvas.width;
};
