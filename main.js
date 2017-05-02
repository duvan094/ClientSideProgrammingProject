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

/*
 * A help function to draw a grid while developing.
 */
function drawGrid(){
  ctx.fillStyle = "#000000";
  ctx.fillRect(0,canvas.height/2,canvas.width,1);
  ctx.fillRect(canvas.width/2,0,1,canvas.height);
}

var Ball = function(x,y,radius,color){//An object describing a ball
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.draw = function(){//function for drawing ball
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);//drawing a circle
    ctx.fill();
  };
  this.move = function(){//A move function to update the balls position when its in motion
    //TODO write code.
  };
};

var ball = new Ball(canvas.width/2,canvas.height/2,20,getRandomBallColor());


//TODO maybe add separate wall objects depending if its on the side or on the top or bottom.
var Wall = function(x,y,width,height,color,speed){//An object describing a wall
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.speed = speed;
  this.draw = function(){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x,this.y,this.width,this.height);
  };
  this.move = function(){//A function that moves the walls
    if(width>height){
      if(y>0){
        this.y-=this.speed;
      }
      this.height+=this.speed;
    }else{
      if(x>0){
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
  };
};


/*Getter for the speed of top and bottom*/
function getSpeedTopBottom(){
  var speedTop = 1;
  if(canvas.width>canvas.height){
    speedTop = (canvas.height-80)/canvas.width;
  }
  return speedTop;
}

/*Getter for the speed of the side walls*/
function getSpeedSide(){
  var speedSide = 1;
  if(canvas.height>canvas.width){
    speedSide = (canvas.width-40)/canvas.height;
  }
  return speedSide;
}

var wallThickness = 40;//Change this to change the initial thickness of the walls

var walls = []; //Initiate the walls into an array
walls.push(new Wall(0,0,wallThickness,canvas.height,colors[0],getSpeedSide())); //Left wall
walls.push(new Wall(canvas.width-wallThickness,0,wallThickness,canvas.height,colors[1],getSpeedSide())); //right wall
walls.push(new Wall(0,0,canvas.width,wallThickness,colors[2],getSpeedTopBottom())); //top wall
walls.push(new Wall(0,canvas.height-wallThickness,canvas.width,wallThickness,colors[3],getSpeedTopBottom())); //bottom wall


/*The update function that renders everything*/
function update(){
  ctx.clearRect(0,0,canvas.width,canvas.height);//Clear the canvas

  for(var i = 0; i<walls.length; i++){//calling each of the walls draw function
    walls[i].draw();
    walls[i].move();
    walls[i].isCenter();
  }

  ball.draw();//draw ball

  //drawGrid();


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
