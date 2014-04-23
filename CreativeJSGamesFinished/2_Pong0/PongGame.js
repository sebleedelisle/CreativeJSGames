
var screenWidth, 
	screenHeight, 
	ball, 
	player1, 
	player2;

var canvas, 
	ctx; 
	
	
function setup(){
	initVars(); 
	initCanvas(); 
	initObjects(); 

}

// MAIN GAME LOOP

function draw() { 

	ctx.fillStyle = rgba(0,0,0,0.4); 
	ctx.fillRect(0,0,canvas.width, canvas.height); 
	
	// update everything
	ball.update();
	player1.y = mouseY - player1.h/2 ;
	player2.y = ball.y - player2.h/2;
	
	checkCollisions(); 
	
	// draw everything
	ball.render(); 
	player1.render();
	player2.render();
}	

function checkCollisions() { 
	
	// check collisions with the sides
	if(ball.x + ball.w > screenWidth+300) {
		resetBall(); 
	} else if(ball.x< -300) {
		resetBall(); 
	} 
	if(ball.y + ball.h > screenHeight) {
		ball.y = screenHeight-ball.h; 
		ball.velY *= -1; 
	} else if(ball.y< 0) {
		ball.y = 0; 
		ball.velY *= -1; 
	} 
	
	var ballLeft = ball.x,
		player1Right = player1.x + player1.w, 
		ballLastLeft = ball.x - ball.velX;
		
	if((ballLastLeft > player1Right) && (ballLeft <= player1Right)) {
		
		var ballTop = ball.y, 
			ballBottom = ball.y + ball.h, 
			player1Top = player1.y, 
			player1Bottom = player1.y + player1.h; 
			
		if((ballTop < player1Bottom) && (ballBottom > player1Top)) {
			ball.velX *= -1.0; 
			ball.x = player1Right; 
			console.log(ball.velX);
		}	
		
	}
	
	var ballRight = ball.x + ball.w, 
		player2Left = player2.x, 
		ballLastRight = ball.x + ball.w - ball.velX; 
		
	if((ballLastRight<player2Left) && (ballRight >=player2Left)) { 
		
		var ballTop = ball.y, 
			ballBottom = ball.y + ball.h, 
			player2Top = player2.y, 
			player2Bottom = player2.y + player2.h; 
	
		if((ballTop < player2Bottom) && ( ballBottom > player2Top)) { 
			ball.x = player2Left - ball.w; 
			ball.velX *= -1.0;
			
		}
		
	}
	
	
	
}

function resetBall() { 
	
	ball.x = screenWidth/2; 
	ball.y = screenHeight/2; 
	
	
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
	ball = new Ball(); 
	player1 = new Paddle(0,0); 
	player2 = new Paddle(screenWidth, 0); 
	player2.x -= player2.w; 
	
}

function Ball() { 
	this.x = screenWidth/2; 
	this.y = screenHeight/2;
	this.velX = 6; 
	this.velY = 2; 
	this.w = 20; 
	this.h = 20; 
	
	this.update = function() { 
		this.x+=this.velX; 
		this.y+=this.velY; 
		
	}
	this.render = function() { 
		
		ctx.fillStyle ='#0f0'; 
		ctx.fillRect(this.x, this.y, this.w, this.h); 
	}
	
}

function Paddle(x, y) { 
	this.x = x; 
	this.y = y; 
	this.w = 20; 
	this.h = 100; 
	
	
	this.render = function() { 
		
		ctx.fillStyle ='#0f0'; 
		ctx.fillRect(this.x, this.y, this.w, this.h); 
	}
	
}
