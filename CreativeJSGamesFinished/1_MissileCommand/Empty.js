
var screenWidth, 
	screenHeight,
	bullets, 
	explosions,
	hue = 0,
	 
	canvas, 
	ctx; 

// set up automatically called on load by creative.js
function setup(){
	initVars(); 
	initCanvas(); 
	initObjects(); 
	frameRate = 30;
}

// MAIN GAME LOOP
// draw automatically called by creative.js
function draw() { 

	ctx.clearRect(0,0,canvas.width, canvas.height);
	ctx.strokeStyle = 'white'; 
	ctx.strokeRect(0,0,screenWidth, screenHeight); 
	
	
	updateBullets(); 
	updateExplosions(); 
	
	renderBullets(); 
	renderExplosions(hue); 
	hue+=30;
	
	
}	

function onMouseDown() { 
	var bullet = new Bullet(400,550,mouseX, mouseY); 
	bullets.push(bullet); 
	
}

function updateBullets() { 
	for(var i = 0; i<bullets.length; i++) { 
		var b = bullets[i]; 
		b.update(); 
		if(b.lifeExpectancy<=0) { 
			
			var explosion = new Explosion(b.pos.x, b.pos.y); 
			explosions.push(explosion); 
			bullets.splice(i,1); 
			i--; 
			
			
		}
		
	}
	
}

function renderBullets() { 
	for(var i = 0; i<bullets.length; i++) { 
		bullets[i].render(); 
		
	}
}

function updateExplosions() { 
	for(var i = 0; i<explosions.length; i++) { 
		var e = explosions[i]; 
		e.update(); 
		if(!e.enabled) {
			explosions.splice(i,1); 
			i--; 
		} 
		
	}
	
}


function renderExplosions(hue) { 
	for(var i = 0; i<explosions.length; i++) { 
		explosions[i].render(hue); 
		
	}
}


function initObjects() { 
	bullets = []; 
	explosions = []; 
}

function initVars() { 
	screenWidth = 800; // window.innerWidth; 
	screenHeight = 600; // window.innerHeight; 	
}

function initCanvas() { 

	canvas = document.createElement('canvas'); 
	ctx = canvas.getContext('2d'); 

	document.body.appendChild(canvas); 
	canvas.width = screenWidth; 
	canvas.height = screenHeight;
}

function Bullet(startx, starty, targetx, targety) {
	
	var pos = this.pos = new Vector2(startx, starty); 
	var vel = this.vel = new Vector2(targetx, targety); 
	
	vel.minusEq(pos); 
	var speed = 4;
	this.lifeExpectancy = vel.magnitude()/speed
	vel.divideEq(this.lifeExpectancy); 
	
	this.update = function() { 
		pos.plusEq(vel); 
		this.lifeExpectancy--; 
	}
	this.render = function() { 
		ctx.fillStyle = 'white';
		ctx.fillCircle(pos.x, pos.y, 2); 
	}
	
	
}



function Explosion(x, y) { 
	
	var pos = this.pos = new Vector2(x,y); 
	var counter = 0; 
	this.radius = 0; 
	this.enabled = true; 
	
	this.update = function() { 
		if(!this.enabled) return; 
		if(counter<100) this.radius++; 
		else this.radius--; 
		if(this.radius<0) { 
			this.enabled = false; 
			
		}
		
		counter++;
	}
	
	this.render = function(hue) { 
		if(!this.enabled) return; 
		
		ctx.fillStyle = hsl(hue, 100,50); 
		ctx.fillCircle(pos.x, pos.y, this.radius); 
		
	}
	
	
	
	
}











