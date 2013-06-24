
// game variables

var score1 = 0, 
	score2 = 0,
	playerPaddle, 
	player2, 
	arena, 
	ball, 
	screenWidth, 
	screenHeight;

var canvas, 
	ctx; 

	init(); 
	
	
function init(){
	initVars(); 
	initCanvas(); 
	initObjects(); 

	startGame(); 
}

// MAIN GAME LOOP

function draw() { 

	ctx.clearRect(0,0,canvas.width, canvas.height); 
	
	ball.update(); 
	moveAiPaddle(); 
	movePlayerPaddle(); 
	checkCollisions(); 

	arena.render(ctx); 
	ball.render(ctx); 
	
	playerPaddle.render(ctx); 
	aiPaddle.render(ctx);
	
}	


function checkCollisions() { 
	
	
	if(ball.vel.x<0) { 
		// ball is moving left so check for collision with left paddle
		
		// if the ball is left of the paddle AND the ball was right of the paddle in the last frame
		if((ball.getLeft()< playerPaddle.getRight())  && (ball.getLeft() - ball.vel.x >= playerPaddle.getRight()) ){  
			// ball has crossed over the threshold of the edge of the bat so now check verticals
			
			if(!((ball.getBottom() < playerPaddle.getTop()) || (ball.getTop() > playerPaddle.getBottom()))){
				// ball has hit paddle! 
				ball.x = playerPaddle.getRight(); 
				ball.vel.x*=-1; 
				
			}
			
		}
		
	}	else if(ball.vel.x>0) { 
		// ball is moving right so check for collision with right paddle
		
		// if the ball is right of the paddle AND the ball was left of the paddle in the last frame
		if((ball.getRight()> aiPaddle.getLeft()) && (ball.getRight()-ball.vel.x <= aiPaddle.getLeft())) { 
			
			// ball has crossed over the threshold of the edge of the bat so now check verticals
			if(!((ball.getBottom() < aiPaddle.getTop()) || (ball.getTop() > aiPaddle.getBottom()))){
				// ball has hit paddle! 
				ball.x = aiPaddle.getLeft(); 
				ball.vel.x*=-1; 

			}

		}

	}

	if(ball.pos.x<arena.getLeft()-300) {
		// ball has gone off the left of the screen - player 2 scores
		resetBallPos(); 
	} else if(ball.pos.x+ball.width>arena.getRight()+300) {
		// ball is off the right of the screen - player 1 scores
		resetBallPos(); 
	}
	
	// collision with the top 
	if(ball.pos.y<arena.getTop()) {
		// move ball back to the edge of the wall
		ball.pos.y = arena.getTop(); 
		// and reverse the y velocity
		ball.vel.y*=-1; 

	// and bottom
	} else if(ball.pos.y+ball.height>arena.getBottom()) {
		// move ball back to the edge of the wall
		ball.pos.y = arena.getBottom() - ball.height;
		// and reverse the y velocity
		ball.vel.y*=-1; 
	}

}

function movePlayerPaddle() { 
	playerPaddle.pos.y = mouseY - playerPaddle.height/2; 
}


function moveAiPaddle() { 
	
	// very simple AI for the computer controlled paddle. 
	if(ball.pos.y < aiPaddle.pos.y){
		aiPaddle.pos.y-=7;
		
	} else {
		aiPaddle.pos.y+=7;
	}

	
	
}

function startGame() { 

	resetBallPos();

}


function resetBallPos() {
	
	ball.pos.x = arena.getCentreX(); 
	ball.pos.y = arena.getCentreY(); 
	ball.vel.y = -8; 
	ball.vel.x = 8; 
	
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

function initObjects() { 
	
	arena = new Arena(10, 10, screenWidth-20, screenHeight-20);
	ball = new Ball(arena.getCentreX(), arena.getCentreY()); 
	ball.vel.reset(8,8); 
	playerPaddle = new Paddle(arena.getLeft()+20,0); 
	aiPaddle = new Paddle(arena.getRight()-20,0); 

}




function Ball(x, y) { 
	var pos = this.pos = new Vector2(x,y); 
	var vel = this.vel = new Vector2(0,0); 
	this.width = 20; 
	this.height = 20; 

	this.update = function() { 
		pos.plusEq(vel); 
	};

	this.render = function(context) { 
		context.fillStyle = 'white'; 
		context.fillRect(pos.x, pos.y, this.width, this.height); 
	}
	
	this.getLeft = function () { 
		return this.pos.x; 
	}
	this.getRight = function() { 
		return this.pos.x+this.width; 
	}
	this.getTop = function() { 
		return this.pos.y; 
	}
	this.getBottom = function() { 
		return this.pos.y+this.height; 
	}

}
function Paddle(x, y) { 
	this.width = 20; 
	this.height = 60; 
	
	// centre paddle on the position provided
	var pos = this.pos = new Vector2(x-this.width/2,y-this.height/2); 

	this.render = function(ctx) { 
		ctx.fillStyle = 'white'; 
		ctx.fillRect(pos.x, pos.y, this.width, this.height); 
		ctx.restore(); 
	}
	this.getLeft = function () { 
		return this.pos.x; 
	}
	this.getRight = function() { 
		return this.pos.x+this.width; 
	}
	this.getTop = function() { 
		return this.pos.y; 
	}
	this.getBottom = function() { 
		return this.pos.y+this.height; 
	}
	

}


function Arena(x, y, w,h) {
	this.x = x; 
	this.y = y; 
	this.w = w; 
	this.h = h; 
	this.lineThickness = 10; 
	
	this.render = function(c){		
		c.strokeStyle = 'white'; 
		c.lineWidth = this.lineThickness;
		
		c.beginPath(); 
		c.moveTo(this.x, this.y); 
		c.lineTo(this.x+this.w, this.y); 
		c.moveTo(this.x, this.y+this.h); 
		c.lineTo(this.x+this.w, this.y+this.h); 
		c.moveTo(this.x+this.w/2, this.y); 
		c.lineTo(this.x+this.w/2, this.y+this.h); 
		c.stroke();
		
		// c.lineWidth = 1;
		// 	c.strokeStyle = 'red'; 
		// 	c.strokeRect(this.x, this.y, this.w, this.h); 
		
	}
	var getLeft = this.getLeft = function() { 
		return this.x;
	}
	var getRight = this.getRight = function() { 
		return this.x+this.w;
	}
	var getTop = this.getTop = function() { 
		return this.y;
	}
	var getBottom = this.getBottom = function() { 
		return this.y+this.h;
	}
	var getCentreX = this.getCentreX = function() { 
		return this.x+this.w/2;
	}
	var getCentreY = this.getCentreY = function() { 
		return this.y+this.h/2;
	}	
	
}

