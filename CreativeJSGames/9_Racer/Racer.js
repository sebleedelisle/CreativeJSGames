	

// game variables

var racer;

var canvas, 
	ctx,
	screenWidth, 
	screenHeight;; 

init(); 
	
function init(){
	initVars(); 
	initCanvas(); 
	initObjects(); 
	initListeners(); 

}

//---------------------- MAIN GAME LOOP ---------------------------------
function draw() { 

	ctx.clearRect(0,0,canvas.width, canvas.height); 
	checkKeys(); 
	racer.update(); 
	
	with(racer) { 
		if(pos.x<0) pos.x = screenWidth;  
		else if(pos.x>screenWidth) pos.x = 0;  
		if(pos.y<0) pos.y = screenHeight;  
		else if(pos.y>screenHeight) pos.y = 0;  
	}
	
	racer.render(ctx); 
	
}	

function checkKeys() { 
	if(KeyTracker.isKeyDown(Key.LEFT)) {
		racer.steer(-1); 
	}
	
	if(KeyTracker.isKeyDown(Key.RIGHT)) {
		racer.steer(1); 
	}
	if(KeyTracker.isKeyDown(Key.UP)) { 
		racer.accelerate(1); 
	}
	if(KeyTracker.isKeyDown(Key.DOWN)) { 
		racer.accelerate(-1); 
	}
	
}

function checkCollisions() { 
	

	
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
	racer = new RacingCar(); 
}

function initListeners() { 
	
}

function RacingCar() { 
	
	var pos = this.pos = new Vector2(100,100); 
	var vel = this.vel = new Vector2(0,0); 
	
	var forwardVel,
		friction = 0.97, 
		steeringStrength = 0.3, 
		normal = new Vector2(0,0), 
		newPos = new Vector2(0,0), 
		wheelRotation = 0,  // -1 to 1
		easedWheelRotation = 0, 
		enginePower = 0.6, 
		steering = false, 
		rotation = 0; 
		
		
	this.render = function(ctx) { 
		
		// draw the car!
		ctx.save(); 
		
		// move the origin to the car position
		ctx.translate(pos.x, pos.y); 
		
		// and rotate the coordinate system around
		ctx.rotate(radians(rotation)); 
		
		// draw the central rectangle for the car
		ctx.fillStyle = 'white'; 
		ctx.fillRect(-20, -4, 40, 8); 
		
		// front wheels
		ctx.save(); 
		// move the origin forward to the centre front of the care
		ctx.translate(14,0); 
		// rotate the coordinate system to match the direction of the wheels
		// 10 is the magic number - 10 degress max rotation of the wheels
		ctx.rotate(easedWheelRotation * radians(10)); 		
		// and draw them!
		ctx.fillRect(-6,-16, 12, 6); 
		ctx.fillRect(-6, 10, 12, 6); 
		
		ctx.restore(); 
		
		// same for the back wheels
		ctx.save(); 
		ctx.translate(-14,0);
		ctx.fillRect(-6,-16, 12, 6); 
		ctx.fillRect(-6, 10, 12, 6); 
		ctx.restore(); 
		ctx.restore(); 
		
		
	}
	
	this.accelerate = function (amount) {
		// clone the normal - a unit vector pointing in the
		// direction the car is facing
		var force = normal.clone(); 
		// then multiply it by the amount of force to get a 
		// thrust vector pointing forward
		force.multiplyEq(amount * enginePower); 
		// then add that force vector to the velocity
		vel.plusEq(force); 
		
	} 
	
	this.steer = function(amount) { 
		// move the wheels by the specified amount
		wheelRotation+=(amount*0.1); 
		// and set the steering flag. We use this to
		// automatically reset the steering wheel when we
		// are not actively changing it.
		steering = true; 
	}
	
	this.update = function() { 
		
		// find out how fast we're moving in the direction of the car
		// by getting the dot product of the velocity with the normal
		forwardVel = vel.dot(normal);
		// then multiply it by friction to apply drag
		forwardVel *= friction; 
		
		// speedadjustment makes the steering stickier when you're going fast
		var speedadjustment = 1 - (Math.min(1,(vel.magnitude()/45)));
		easedWheelRotation = wheelRotation * speedadjustment;
		
		rotation += (easedWheelRotation*forwardVel*steeringStrength);
		
		// update normal (unit vector in the direction of the car)
		normal.reset(1,0); 
		normal.rotate(rotation); 
	
		// velocity = normal * forwardVel
		
		vel.copyFrom(normal); 
		vel.multiplyEq(forwardVel); 
	
		pos.plusEq(vel);
		
		// if we're not actively steering then make the steering wheel ease
		// back to 0
		if(!steering) {
			wheelRotation*=0.4;
		} else {
			
			// otherwise make sure we're not steering too far
			if(wheelRotation>1) wheelRotation = 1; 
			else if (wheelRotation<-1) wheelRotation = -1; 
			
			steering = false; 		
		}
	
		
	}
	
		
}	
		
		
