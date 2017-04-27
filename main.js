var canvas = document.getElementById("stage");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
var ctx = canvas.getContext("2d");

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


//TODO maybe add separate wall objects depending if its on the side or on the top or bottom.
var Wall = function(x,y,width,height,color){//An object describing a wall
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.draw = function(){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x,this.y,this.width,this.height);
  };
  this.move = function(){
    //TODO some code that should make the walls wider or higher depending if its on the side or on the top.
  };
};


var wallThickness = 40;//Change this to change the initial thickness of the walls

var walls = []; //Initiate the walls into an array
walls.push(new Wall(0,0,wallThickness,canvas.height,colors[0]));
walls.push(new Wall(canvas.width-wallThickness,0,wallThickness,canvas.height,colors[1]));
walls.push(new Wall(0,0,canvas.width,wallThickness,colors[2]));
walls.push(new Wall(0,canvas.height-wallThickness,canvas.width,wallThickness,colors[3]));


var Ball = function(x,y,radius,color){//An object describing a ball
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.draw = function(){//function for drawing ball
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);//drawing a circle
    ctx.fill();
  };
  this.move = function(){//A move function to update the balls position when its in motion
    //TODO write code.
  };
};




var ball = new Ball(canvas.width/2,canvas.height/2,20,getRandomBallColor());

/*The update function that renders everything*/
function update(){
  ctx.clearRect(0,0,canvas.width,canvas.height);//Clear the canvas

  for(var i = 0; i<walls.length; i++){//calling each of the walls draw function
    walls[i].draw();
  }

  ball.draw();//draw ball



  window.requestAnimationFrame(update);
}

update();


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
  walls[1].x = canvas.width-wallThickness;  //right wall
  walls[1].height = canvas.height;
  walls[2].width = canvas.width;  //top wall
  walls[3].y = canvas.height-wallThickness; //bottom wall
  walls[3].width = canvas.width;
};
