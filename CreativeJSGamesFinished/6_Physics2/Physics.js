
var screenWidth, 
	screenHeight,
	canvas, 
	ctx, 
	player; 

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
	
	checkKeys(); 
	checkCollisions(); 
	
	player.update(); 
	player.render();
	
	
}	

function checkKeys() { 
	var speed = 0.3; 
	
	if(KeyTracker.isKeyDown(Key.LEFT)) { 
		player.rotateLeft(); 
	} 
	if(KeyTracker.isKeyDown(Key.RIGHT)) { 
		player.rotateRight(); 	
	}
	if(KeyTracker.isKeyDown(Key.UP)) { 
		player.thrust(); 
	} 
	// if(KeyTracker.isKeyDown(Key.DOWN)) { 
	// 	player.vel.y +=speed; 	
	// }	
	
}
function checkCollisions() { 
	if(player.pos.y > screenHeight - player.h) { 
		player.pos.y = screenHeight - player.h; 
		player.vel.y = 0; 
		
	}
	
	
}

function initObjects() { 
	player = new Player(screenWidth/2, screenHeight/2); 
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

// -------------------- PLAYER-------------------------

function Player(x, y) {
	var pos = this.pos = new Vector2(x,y); 
	var vel = this.vel = new Vector2(0,0);
	this.w = 20; 
	this.h = 30; 
	this.angle = 270; 
	
	var rotateSpeed = 5; 
	
	this.update = function() { 
		
		pos.plusEq(vel); 
		
		vel.multiplyEq(0.999); 
		vel.y += 0.02; 
		
	}
	
	this.render = function() { 
		ctx.fillStyle = 'white'; 
		//ctx.fillRect(pos.x, pos.y, this.w, this.h); 
		ctx.save(); 
		ctx.translate(pos.x, pos.y); 
		ctx.rotate(radians(this.angle));
		ctx.beginPath(); 
		ctx.moveTo(10,0); 
		ctx.lineTo(-10,10); 
		ctx.lineTo(-10,-10); 
		ctx.closePath(); 
		ctx.fill();
		ctx.restore(); 
		
	}
	
	this.thrust = function () { 
		var speed = 0.1; 
		var thrustVector = new Vector2(speed, 0); 
		thrustVector.rotate(this.angle); 
		vel.plusEq(thrustVector);
		
	}
	
	
	
	this.rotateLeft = function() { 
		this.angle -= rotateSpeed;
	}
	
	this.rotateRight = function() { 
		this.angle += rotateSpeed;
		
	}
	
	
}
	
	

