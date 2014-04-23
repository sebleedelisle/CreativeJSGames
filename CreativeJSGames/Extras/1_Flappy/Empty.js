
var screenWidth, 
	screenHeight,
	canvas, 
	ctx, 
	bird, 
	pipes, 
	bottom, 
	currentFrame; 

// set up automatically called on load by creative.js
function setup(){
	initVars(); 
	initCanvas(); 
	initObjects(); 
	
	KeyTracker.addKeyDownListener(" ", spacePressed); 

}

function spacePressed() { 
	bird.velY -= 10;
	
}

// MAIN GAME LOOP
// draw automatically called by creative.js
function draw() { 

	ctx.clearRect(0,0,canvas.width, canvas.height); 
	
	if(currentFrame % 80 == 0) {
		var pipe =  new Pipe(screenWidth); 
		pipes.push(pipe); 
	}
	
	for(var i = 0; i<pipes.length; i++) { 
		pipes[i].update(); 
	}
	bird.update(); 
	
	for(var i = 0; i<pipes.length; i++) { 
		pipes[i].draw(); 
	}
	bird.draw(); 
	
	
	currentFrame++;
}	


function initObjects() { 
	bird = new Bird(); 
	pipes = []; 
	
	
}

function initVars() { 
	screenWidth = window.innerWidth; 
	screenHeight = window.innerHeight; 	
	
	bottom = screenHeight * 0.9; 
	currentFrame = 0; 
	
}

function initCanvas() { 

	canvas = document.createElement('canvas'); 
	ctx = canvas.getContext('2d'); 

	document.body.appendChild(canvas); 
	canvas.width = screenWidth; 
	canvas.height = screenHeight;
}


function Bird() { 
	this.x = screenWidth*0.4; 
	this.y = 0;//bottom; 
	this.velY = 0;
	this.radius = 30; 
	
	this.update = function () { 
		this.y+=this.velY;	
		this.velY += 1; 
		
		this.velY*=0.96;
		 
		if(this.y + this.radius > bottom) { 
			this.velY *=-0.5; 
			this.y = bottom - this.radius; 
		}
		
		
	}
	
	this.draw = function () { 
		ctx.save(); 
		ctx.fillStyle = 'yellow';
		ctx.translate(this.x, this.y); 
		
		ctx.rotate(radians(this.velY*3));
		 
		ctx.scale(1,0.6); 
		ctx.fillCircle(0, 0, this.radius); 
		ctx.restore(); 
	}
	
	
}


function Pipe(x) { 
	this.x = x; 
	this.gapY = bottom/2; 
	this.gapSize = 50; 
	
	
	this.update = function () { 
		this.x -= 4; 
		
		
	}
	
	this.draw = function () { 
		
		ctx.fillStyle = 'green'; 
		ctx.fillRect(this.x, 0, 40, this.gapY-this.gapSize); 
		ctx.fillRect(this.x, this.gapY+this.gapSize, 40, bottom - this.gapY - this.gapSize); 
		
		
	}


	
}
