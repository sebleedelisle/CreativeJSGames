
var ball, 
	playerPaddle, 
	computerPaddle; 


var screenWidth, 
	screenHeight,
	canvas, 
	ctx; 

// set up automatically called on load by creativejs.js
function setup(){
	initVars(); 
	initCanvas(); 
	initObjects(); 

}

// MAIN GAME LOOP
// draw automatically called by creativejs.js
function draw() { 

	ctx.clearRect(0,0,canvas.width, canvas.height); 

	ball.update(); 
	playerPaddle.pos.y = mouseY - playerPaddle.height/2; 
	computerPaddle.pos.y = ball.pos.y;

	checkCollisions(); 
	
	ball.render(ctx); 
	playerPaddle.render(ctx); 
	computerPaddle.render(ctx); 
	
}	

function checkCollisions() {
	
	if(ball.pos.y + ball.height >screenHeight) {
		ball.pos.y = screenHeight - ball.height; 
		ball.vel.y *=-1; 
	}
	if(ball.pos.y < 0) { 
		ball.pos.y = 0; 
		ball.vel.y *=-1; 
	}
	if(ball.pos.x<0) { 


	}

	if (ball.pos.x + ball.width>screenWidth) { 
		ball.pos.x = screenWidth - ball.width; 
		ball.vel.x *=-1; 
	}


	// collision detection with the left paddle
	if((ball.pos.x < playerPaddle.pos.x + playerPaddle.width) 
			&& ((ball.pos.x - ball.vel.x) > playerPaddle.pos.x + playerPaddle.width) ) {
		if((ball.pos.y < playerPaddle.pos.y + playerPaddle.height) 
			&& (ball.pos.y + ball.height > playerPaddle.pos.y)) {
			
			ball.pos.x = playerPaddle.pos.x + playerPaddle.width;
			ball.vel.x *= -1; 
				
		}
			
	}

}

function initObjects() { 

	ball = new Ball(); 
	playerPaddle = new Paddle(0, screenHeight/2); 
	computerPaddle = new Paddle(screenWidth - 20, screenHeight/2); 
}

function initVars() { 
	screenWidth = window.innerWidth; 
	screenHeight = window.innerHeight; 	
}

function initCanvas() { 

	canvas = document.createElement('canvas'); 
	ctx = canvas.getContext('2d'); 

	document.body.appendChild(canvas); 
	canvas.width = screenWidth; 
	canvas.height = screenHeight;
}

//--------- BALL ----------------

function Ball() { 
	
 	var pos = this.pos = new Vector2(0,0); 
	var vel = this.vel = new Vector2(5,5);  
	
	this.width = 20; 
	this.height = 20; 
		
	
	this.update = function() {

		pos.plusEq(vel); 
	
	}
	
	this.render = function(ctx) { 
		
		ctx.fillStyle = 'white';
		ctx.fillRect(pos.x, pos.y, this.width, this.height); 	
	}
	
	
	
	
}

// ------------------- PADDLE --------------

function Paddle(x, y) {
	
	var pos = this.pos = new Vector2(x,y); 
	
	this.width = 20; 
	this.height = 80; 
	
	this.render = function(ctx) { 
		
		ctx.fillStyle = 'white';
		ctx.fillRect(pos.x, pos.y, this.width, this.height); 
		
	}
	
}
