
var screenWidth, 
	screenHeight, 
	playerShip, 
	asteroids = [], 

	bullets = [];

var canvas, 
	ctx; 
	
	
function setup(){
	initVars(); 
	initCanvas(); 
	initObjects(); 
	KeyTracker.addKeyDownListener(' ', firePressed); 

}


// MAIN GAME LOOP

function draw() { 

	ctx.clearRect(0,0,canvas.width, canvas.height); 
	
	playerShip.update(); 
	updateBullets(); 
	updateAsteroids(); 

	checkKeys(); 
	checkCollisions(); 
	
	renderBullets(); 
	renderAsteroids();
	playerShip.render(); 

}	

function checkCollisions() { 

	for(var i = 0; i<asteroids.length; i++) { 
		var asteroid = asteroids[i]; 
		for(var j = 0; j<bullets.length; j++) {
			var bullet = bullets[j]; 
			
			if(asteroid.hitTest(bullet.pos.x, bullet.pos.y)) { 
				bullets.splice(j, 1); 
				j--; 
				
				if(asteroid.radius<15) { 
				 	asteroids.splice(i, 1); 
				 	i--; 
				} else { 
					asteroid.radius /= 2;
					var newasteroid = new Asteroid(asteroid.pos.x, asteroid.pos.y);
					newasteroid.radius = asteroid.radius;  
					newasteroid.vel.copyFrom(asteroid.vel); 
					
					newasteroid.vel.rotate(20); 
					asteroid.vel.rotate(-20); 
					
					asteroids.push(newasteroid); 
				}
				
				break; 
				
				
			}
			
			
		}
	}
	
	
	
	
}



function checkKeys() { 
	
	if(KeyTracker.isKeyDown(Key.LEFT)) { 
		playerShip.rotateLeft(); 
	}
	if(KeyTracker.isKeyDown(Key.RIGHT)) { 
		playerShip.rotateRight();
	}
	if(KeyTracker.isKeyDown(Key.UP)) { 
		playerShip.thrust();
	}	
	
}

function updateBullets() { 
	for(var i = 0; i<bullets.length; i++) { 
		bullets[i].update();
	}
}

function renderBullets() { 
	for(var i = 0; i<bullets.length; i++) { 
		bullets[i].render();
	}
}


function updateAsteroids() { 
	for(var i = 0; i<asteroids.length; i++) { 
		asteroids[i].update();
	}
}

function renderAsteroids() { 
	for(var i = 0; i<asteroids.length; i++) { 
		asteroids[i].render();
	}
}

function firePressed() { 
	
	var b = new Bullet(playerShip.pos.x, playerShip.pos.y, playerShip.angle); 
	b.vel.plusEq(playerShip.vel); 
	bullets.push(b); 
	
	
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
	playerShip = new PlayerShip(); 
	
	for(var i = 0; i<5; i++) { 
		
		var asteroid = new Asteroid(random(screenWidth), random(screenHeight)); 
		asteroids.push(asteroid); 
		
		
	}
	
}

//---------------------------- PLAYER SHIP -------------------

function PlayerShip() { 
	
	var pos = this.pos = new Vector2(screenWidth/2, screenHeight/2); 
	var vel = this.vel = new Vector2(0, 0); 
	
	this.angle = 0; 
	var rotateSpeed = 2, 
		thrustPower = 0.1; 
	
	this.update = function() { 
		pos.plusEq(vel); 
		
		if(pos.x<0) pos.x = screenWidth; 
		else if(pos.x>screenWidth) pos.x = 0; 
		if(pos.y<0) pos.y = screenHeight; 
		else if(pos.y>screenHeight) pos.y = 0; 
	}
	
	this.rotateLeft = function() { 
		this.angle -= rotateSpeed; 
	}
	
	this.rotateRight = function() { 
		this.angle += rotateSpeed;
	}
	
	this.thrust = function() { 
		
		var thrustVector = new Vector2(thrustPower, 0); 
		thrustVector.rotate(this.angle); 
		
		vel.plusEq(thrustVector); 
		
		
	}
	
	this.render = function() { 
		
		ctx.save(); 
		ctx.strokeStyle = 'white'; 
		ctx.lineWidth = 2; 
		ctx.translate(pos.x, pos.y);
		ctx.rotate(radians(this.angle));  
		ctx.beginPath(); 
		ctx.moveTo(15, 0);
		ctx.lineTo(-13, 9); 
		ctx.lineTo(-13,-9); 
		ctx.closePath(); 
		
		ctx.stroke(); 
		ctx.restore(); 
		
	}
	
}

//----------------------------- BULLET -----------------------------

function Bullet (x, y, angle){ 
	var pos = this.pos = new Vector2(); 
	var vel = this.vel = new Vector2();
	
	
	this.update = function() { 
		pos.plusEq(vel); 
		
	}
	this.render = function() {
		ctx.strokeStyle = 'white'; 
		ctx.lineWidth = 2; 
		ctx.strokeCircle(pos.x, pos.y, 2); 
	}
	
	this.reset = function(x, y, angle) { 
		pos.reset(x,y); 
		vel.reset(5,0); 
		vel.rotate(angle); 
		
		var offset = new Vector2(15,0); 
		offset.rotate(angle); 
		pos.plusEq(offset); 
		
	} 

	this.reset(x, y, angle);
	
}


// --------------------------- ASTEROID --------------------- 

function Asteroid(x,y) { 
	
	var pos = this.pos = new Vector2(x,y); 
	var vel = this.vel = new Vector2(2, 0); 
	vel.rotate(random(360)); 
	
	this.radius = 50; 
	
	this.update = function() { 
		pos.plusEq(vel); 
		
		if(pos.x<-this.radius) pos.x = screenWidth+this.radius; 
		else if(pos.x>screenWidth+this.radius) pos.x = -this.radius; 
		if(pos.y<-this.radius) pos.y = screenHeight+this.radius; 
		else if(pos.y>screenHeight+this.radius) pos.y = -this.radius; 
		
		
	}
	
	this.render = function() { 
		
		ctx.strokeStyle = 'white'; 
		ctx.lineWidth = 2; 
		ctx.strokeCircle(pos.x, pos.y, this.radius); 
		
		
	}
	
	this.hitTest = function(x, y) { 
		var diff = pos.clone(); 
		diff.x -= x; 
		diff.y -= y; 
		
		return diff.isMagLessThan(this.radius); 
		
	}
	
	
	
}


