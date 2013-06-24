
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


	
}	


function checkCollisions() { 
	

}

function movePlayerPaddle() { 

}


function moveAiPaddle() { 
	
	
}

function startGame() { 

	resetBallPos();

}


function resetBallPos() {
	
	
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

}




function Ball(x, y) { 
	var pos = this.pos = new Vector2(x,y); 
	var vel = this.vel = new Vector2(0,0); 
	this.width = 20; 
	this.height = 20; 

	this.update = function() { 
		
		
		
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

