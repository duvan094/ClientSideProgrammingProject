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

var Wall = function(x,y,width,height,color){//An object describing a wall
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.draw = function(){
    ctx.fillStyle = this.color;
    ctx.fillRect(x,y,width,height);
  };
};

//TODO a nicer looking way of initiating the walls, preferably with a for-loop
var wall1 = new Wall(0,0,40,canvas.height,colors[0]);
var wall2 = new Wall(canvas.width-40,0,40,canvas.height,colors[1]);
var wall3 = new Wall(0,0,canvas.width,40,colors[2]);
var wall4 = new Wall(0,canvas.height-40,canvas.width,40,colors[3]);


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
};




var ball = new Ball(canvas.width/2,canvas.height/2,20,getRandomBallColor());

/*The update function that renders everything*/
function update(){
  ctx.clearRect(0,0,canvas.width,canvas.height);//Clear the canvas

  //TODO a nicer way of drawing all the walls.
  wall1.draw();
  wall2.draw();
  wall3.draw();
  wall4.draw();
  ball.draw();//draw ball



  window.requestAnimationFrame(update);
}

update();


/*
* This function is mainly for desktop if the window should have been resized.
* In that case, the canvas is resized to fit everything properly and avoid
* stretching anything in a weird way.
*/
window.onresize = function(event) {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  ball.x = canvas.width/2;  //Make sure the ball is centered in the middle
  ball.y = canvas.height/2;
};
