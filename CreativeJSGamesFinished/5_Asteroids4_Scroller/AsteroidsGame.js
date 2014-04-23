
// game variables

var playerShip, 
	asteroids,
	bullets,
	stars, 
	screenWidth, 
	screenHeight,
	gameWidth, 
	gameHeight, 
	scrollOffset, 
	targetOffset, 
	backgroundImage = new Image();
	
backgroundImage.src = 'galaxy.jpg';

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
	
	var velocityOffset = playerShip.vel.clone(); 
	velocityOffset.multiplyEq(40); 
	  
	targetOffset.x = playerShip.pos.x + velocityOffset.x - screenWidth/2; 
	targetOffset.y = playerShip.pos.y + velocityOffset.y - screenHeight/2; 
	
	targetOffset.x = clamp(targetOffset.x, 0, gameWidth-screenWidth); 
	targetOffset.y = clamp(targetOffset.y, 0, gameHeight-screenHeight); 
	
	var diff = targetOffset.clone(); 
	diff.minusEq(scrollOffset); 
	diff.multiplyEq(0.05); 
	scrollOffset.plusEq(diff); 
	
	ctx.save(); 
	ctx.translate(-scrollOffset.x * 0.5, -scrollOffset.y*0.5); 
	
	ctx.drawImage(backgroundImage, 0,0); 
	ctx.restore();
	
	
	ctx.save(); 
	ctx.translate(-scrollOffset.x, -scrollOffset.y); 
	renderStars(); 
	playerShip.render(ctx); 
	renderAsteroids(); 
	renderBullets(); 
	ctx.restore();
	
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
		
		// check to see if the asteroid has collided with the wall 
		if(asteroid.pos.x-asteroid.radius<0) { 
			asteroid.pos.x = asteroid.radius; 
			asteroid.vel.x *=-1; 
		} else if(asteroid.pos.x+asteroid.radius>gameWidth) { 
			asteroid.pos.x = gameWidth - asteroid.radius; 
			asteroid.vel.x *=-1; 
		}
		if(asteroid.pos.y-asteroid.radius<0) { 
			asteroid.pos.y = asteroid.radius; 
			asteroid.vel.y *=-1; 
		} else if(asteroid.pos.y+asteroid.radius>gameHeight) { 
			asteroid.pos.y = gameHeight - asteroid.radius; 
			asteroid.vel.y *=-1; 
		}
			

		// first, check if the asteroid has hit the ship 
		if(playerShip.pos.isCloseTo(asteroid.pos, asteroid.radius+12)) {
			// ship has exploded! 
			resetAsteroids(); 
			resetShip(); 
			break; 
		}
		
		// collsions between ship and wall
		if(playerShip.pos.x-playerShip.radius<0) { 
			playerShip.pos.x = playerShip.radius; 
			playerShip.vel.x *=-0.5; 
		} else if(playerShip.pos.x+playerShip.radius>gameWidth) { 
			playerShip.pos.x = gameWidth - playerShip.radius; 
			playerShip.vel.x *=-0.5; 
		}
		if(playerShip.pos.y-playerShip.radius<0) { 
			playerShip.pos.y = playerShip.radius; 
			playerShip.vel.y *=-0.5; 
		} else if(playerShip.pos.y+playerShip.radius>gameHeight) { 
			playerShip.pos.y = gameHeight - playerShip.radius; 
			playerShip.vel.y *=-0.5; 
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


function startGame() { 
	
	resetAsteroids(); 
	
}

function updateBullets(){
	
	for(var i = 0 ; i<bullets.length; i++) { 
		
		var bullet = bullets[i]; 
		bullet.update(); 
		
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
		
	}
}

function renderStars() {
	
	ctx.beginPath();  
	ctx.lineWidth = 1; 
	ctx.lineCap = 'round';
	ctx.lineWidth = 2;
	ctx.strokeStyle = 'white';
	for(var i = 0; i<stars.length; i++) { 
		var s= stars[i]; 
		ctx.moveTo(s.x, s.y); 
		ctx.lineTo(s.x+random(), s.y+random()); 
		
	}
	ctx.stroke(); 
	
	ctx.strokeRect(0,0,gameWidth, gameHeight);
	
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
	
	for(var i = 0; i<40; i++) { 
		asteroids.push(new Asteroid(random(gameWidth), random(gameHeight), 50)); 
	}

}
function resetShip()  { 
	playerShip.pos.reset(gameWidth/2, gameHeight/2); 
	playerShip.vel.reset(0,0);
	playerShip.angle = 0; 
}


function initVars() { 
	screenWidth = window.innerWidth; 
	screenHeight = window.innerHeight; 	
	gameWidth = screenWidth * 4; 
	gameHeight = screenHeight * 4; 
	
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
	stars = []; 
	for(var i = 0; i<1000; i++) { 
		var s = {x : random(gameWidth), 
				 y : random(gameHeight)} 
		stars.push(s); 
		
	}
	
	scrollOffset = new Vector2(); 
	targetOffset = new Vector2(); 
	
}

function initListeners() { 
	
	KeyTracker.addKeyDownListener(Key.SPACE, firePressed); 

}

function firePressed() { 
	var b = new Bullet(playerShip.pos.x, playerShip.pos.y, playerShip.angle); 
	b.vel.plusEq(playerShip.vel); 
	bullets.push(b); 

}

//---------------- PLAYER SHIP -----------------

function PlayerShip() { 

	var pos = this.pos = new Vector2(gameWidth/2, gameHeight/2); 
	var vel = this.vel = new Vector2(0,0); 
	
	this.radius = 10;
	this.angle = 0; 
	this.rotateSpeed = 5; 
	this.thrustPower = 0.5; 
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
		
		vel.multiplyEq(0.96);
		// add the velocity to the position
		pos.plusEq(vel);
		
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