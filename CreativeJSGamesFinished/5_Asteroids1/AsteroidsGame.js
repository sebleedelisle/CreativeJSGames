
// game variables

var playerShip, 
	asteroids,
	bullets,
	
	screenWidth, 
	screenHeight;

var canvas, 
	ctx; 

	init(); 
	
	
function init(){
	initVars(); 
	initCanvas(); 
	initObjects(); 
	initListeners(); 

	startGame(); 
}

// MAIN GAME LOOP

function draw() { 

	ctx.clearRect(0,0,canvas.width, canvas.height); 
	
	checkKeys(); 
	updateAsteroids(); 
	updateBullets();
	playerShip.update(); 
	 
	checkCollisions(); 

	playerShip.render(ctx); 
	renderAsteroids(); 
	renderBullets(); 
	
}	

function checkKeys() { 
	if(KeyTracker.isKeyDown(Key.LEFT)) {
		playerShip.goLeft(); 
	}
	
	if(KeyTracker.isKeyDown(Key.RIGHT)) {
		playerShip.goRight(); 
	}
	if(KeyTracker.isKeyDown(Key.UP)) { 
		playerShip.thrust(); 
		
	}
	
}

function checkCollisions() { 
	
	// We're checking every asteroid with every bullet
	// outside loop iterates through the asteroids, 
	// inner loop iterates through bullets
	
	for (var i = 0; i<asteroids.length; i++) { 
	
		var asteroid = asteroids[i]; 

		// first, check if the asteroid has hit the ship 
		
		// now check the asteroid with every bullet
		for(var j = 0; j<bullets.length; j++) { 
		
			var bullet = bullets[j]; 
		
			// if the bullet is too close to the asteroid, then 
			// we have a collision

			// CHECK HERE BETWEEN BULLET AND ASTEROID


		}
	}
	
	// if there are no asteroids, then reset the asteroid field. 
	if(asteroids.length == 0) { 
		resetAsteroids(); 	
	}
	
}


function startGame() { 
	
	resetAsteroids(); 
	
}

function updateBullets(){
	
	for(var i = 0 ; i<bullets.length; i++) { 
		
		var bullet = bullets[i]; 
		bullet.update(); 
		
		// if the bullet has gone off the edge of the screen, 
		// wrap it around
		with(bullet) { 
			if(pos.x<0) pos.x = screenWidth; 
			else if(pos.x>screenWidth) pos.x = 0;
			if(pos.y<0) pos.y = screenHeight; 
			else if (pos.y>screenHeight) pos.y = 0;	
		}
		
		if(bullet.life>50) {
			bullets.splice(i,1); 
			i--; 
		}

	}
	
}


function updateAsteroids() { 
	
	for(var i = 0; i<asteroids.length; i++) { 
		var asteroid = asteroids[i]; 
		
		asteroid.update();
		
		// if the asteroid has gone off the edge of the screen, 
		// wrap it around
		
		with(asteroid) { 
			if(pos.x+radius<0) pos.x = screenWidth+radius;  
			else if(pos.x-radius>screenWidth) pos.x = -radius;  
			if(pos.y+radius<0) pos.y = screenHeight+radius;  
			else if(pos.y-radius>screenHeight) pos.y = -radius;  
		}
		
	}
}

function renderBullets() { 
	for(var i = 0; i<bullets.length; i++) { 
		bullets[i].render(ctx); 
	}
}

function renderAsteroids() { 
	for(var i = 0; i<asteroids.length; i++) { 
		asteroids[i].render(ctx); 
	}
}

function resetAsteroids() { 

	asteroids = []; 
	
	for(var i = 0; i<5; i++) { 
		asteroids.push(new Asteroid(random(screenWidth), random(screenHeight), 50)); 
	}

}
function resetShip()  { 
	playerShip.pos.reset(screenWidth/2, screenHeight/2); 
	playerShip.vel.reset(0,0);
	playerShip.angle = 0; 
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
	bullets = []; 
	asteroids = []; 
	
}

function initListeners() { 
	
	KeyTracker.addKeyDownListener(Key.SPACE, firePressed); 

}

function firePressed() { 
	bullets.push(new Bullet(playerShip.pos.x, playerShip.pos.y, playerShip.angle)); 

}

//---------------- PLAYER SHIP -----------------

function PlayerShip() { 

	var pos = this.pos = new Vector2(screenWidth/2, screenHeight/2); 
	var vel = this.vel = new Vector2(0,0); 

	this.angle = 0; 
	this.rotateSpeed = 5; 
	this.thrustPower = 0.1; 
	var thrustVector = new Vector2(0,0); 
	
	
	this.render = function(c) { 
		c.fillStyle = 'white';
		
		c.save(); 

		// translate to the centre of the ship
		c.translate(pos.x, pos.y); 
		// and rotate the coordinate system before
		// you draw the triangle
		c.rotate(radians(this.angle)); 
	
		//DRAW TRIANGLE
		c.lineWidth = 3; 
		
		c.beginPath();
		c.moveTo(-14, -10); 
		c.lineTo(14, 0); 
		c.lineTo(-14, 10);
		c.closePath();
		c.stroke(); 

		c.restore(); 
	}	

	this.update = function() { 
		// add the velocity to the position
		pos.plusEq(vel);
		
		// check the boundaries of the screen and wrap where necessary
		if(pos.x<0) pos.x = screenWidth; 
		else if(pos.x>screenWidth) pos.x = 0;
		if(pos.y<0) pos.y = screenHeight; 
		else if (pos.y>screenHeight) pos.y = 0;
		
	}
	
	this.thrust = function() { 
		
	}
	this.goLeft = function() { 
		this.angle-=this.rotateSpeed;
	}
	
	this.goRight = function() { 
		this.angle+=this.rotateSpeed;
	}
	
}

// ----------------- ASTEROID --------------------------

function Asteroid(x,y,r)  {

	var pos = this.pos = new Vector2(x,y); 
	var vel = this.vel = new Vector2(random(-4,4),random(-4,4)); 
	
	this.radius = r; 
	
	this.update = function() { 
		// add the velocity to the position
		pos.plusEq(vel);
	}
	
	this.render = function (c) { 
		c.strokeStyle = 'white';
		c.lineWidth = 3;
		c.strokeCircle(this.pos.x, this.pos.y, this.radius);	
	}
	
}

//------------------ BULLET ------------------------------

function Bullet(x, y, direction) { 
	
	var pos = this.pos = new Vector2(x,y); 
	// create a velocity vector that is moving to the right
	var vel = this.vel = new Vector2(8,0);
	// and rotate it by the specified amount to point it in the right direction
	
	
	// life gets incremented every update, so we can tell how old it is
	this.life = 0; 
	this.radius = 2; 
	
	this.update = function() {
		// add velocity to position
		pos.plusEq(vel); 
		// and increment the life
		this.life++;
	}
	
	this.render = function(c) { 
		c.strokeStyle = 'white'; 
		c.lineWidth = 3;
		c.strokeCircle(this.pos.x, this.pos.y,this.radius);	
	}
	
}