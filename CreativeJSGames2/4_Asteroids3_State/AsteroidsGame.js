
// states 

var STATE_WAITING = 0, 
 	STATE_PLAYING = 1, 
	STATE_RESTART_WAIT = 2, 
	STATE_GAME_OVER = 3;

var gameState = STATE_WAITING, 
	framesSinceStateChange = 0; 	

// game variables

var playerShip, 
	asteroids,
	bullets,
	lives, 
	
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

	initGame(); 
}

//---------------------- MAIN GAME LOOP ---------------------------------
function draw() { 

	ctx.clearRect(0,0,canvas.width, canvas.height); 
	
	if(gameState == STATE_PLAYING) { 
		checkKeys(); 
		updateAsteroids(); 
		updateBullets();
		playerShip.update(); 
	 
		checkCollisions(); 

		playerShip.render(ctx); 
		renderAsteroids(); 
		renderBullets(); 
		
	} else { 
		updateAsteroids(); 
		renderAsteroids(); 
	}
	
	if((gameState == STATE_WAITING) || (gameState == STATE_GAME_OVER)) { 
		if(KeyTracker.isKeyDown(Key.SPACE)) { 
			startGame(); 
		}
	} else if (gameState == STATE_RESTART_WAIT) { 
		if(framesSinceStateChange>60) { 
			resetShip();
			if(isSafe()) changeState(STATE_PLAYING); 
		}
	}
	
	// now do all the messaging
	ctx.fillStyle = 'white';
	ctx.fillText("lives = "+lives, 10,20);
	
	if(gameState == STATE_GAME_OVER) { 
		ctx.fillText("GAME OVER", screenWidth/2, screenHeight/2); 
	}
	
	framesSinceStateChange++; 
	
}	

function changeState (newstate) { 
	
	gameState = newstate; 
	framesSinceStateChange = 0; 
	
}


function startGame() { 
	changeState(STATE_RESTART_WAIT);
	resetAsteroids(); 
	resetShip();
	lives =3; 
	
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
		if(playerShip.pos.isCloseTo(asteroid.pos, asteroid.radius+12)) {
			// ship has exploded! 
			lives--; 
			if(lives>=0)
				changeState(STATE_RESTART_WAIT); 
			else
				changeState(STATE_GAME_OVER);
			break; 
		}

		// now check the asteroid with every bullet
		for(var j = 0; j<bullets.length; j++) { 
		
			var bullet = bullets[j]; 
		
			// if the bullet is too close to the asteroid, then 
			// we have a collision
			
			if(bullet.pos.isCloseTo(asteroid.pos, asteroid.radius)) { 
				
				// if the asteroid is big, then halve its size
				if(asteroid.radius>15) { 
					asteroid.radius/=2; 
					// and make a new asteroid in the same position
					var newasteroid = new Asteroid(asteroid.pos.x, asteroid.pos.y, asteroid.radius); 
					// add it on to the array
					asteroids.push(newasteroid); 
				} else { 
					// otherwise the asteroid is small, so we just destroy it
					asteroids.splice(i,1); 
					i--; // don't strictly need this as we're breaking out of this loop anyway
				} 
				// and then delete the bullet
				bullets.splice(j,1); 
				j--; 
				break; 
			}
		}
	}
	
	// if there are no asteroids, then reset the asteroid field. 
	if(asteroids.length == 0) { 
		resetAsteroids(); 	
	}
	
}

function isSafe() { 

	for (var i = 0; i<asteroids.length; i++) { 
		var asteroid = asteroids[i]; 
		if(playerShip.pos.isCloseTo(asteroid.pos, asteroid.radius+50)) {
			return false;
		}
	}
	return true;
	
}
	


function initGame() { 
	
	resetAsteroids(); 
	lives = 3; 
	
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
	
	if(gameState!=STATE_PLAYING) return; 
	
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
		
		// reset the thrustVector 
		thrustVector.reset(this.thrustPower,0); 
		
		// and rotate it in the direction of the ship
		thrustVector.rotate(this.angle); 
		
		//and add it to the velocity. 
		this.vel.plusEq(thrustVector); 
		
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
	
	// create a velocity that is moving to the right
	var vel = this.vel = new Vector2(2,0); 
	// and rotate it a random amount - this gives a fixed speed and a random direction
	vel.rotate(random(360));
	
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
	vel.rotate(direction); 
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