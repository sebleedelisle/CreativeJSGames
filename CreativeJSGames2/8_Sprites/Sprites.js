
// game variables

var sprite, 
	spriteImage = new Image();

spriteImage.src = "Runner.png";

var canvas, 
	ctx,
	screenWidth, 
	screenHeight;; 

	
function setup(){
	initVars(); 
	initCanvas(); 
	initObjects(); 
	initListeners(); 

}

//---------------------- MAIN GAME LOOP ---------------------------------
function draw() { 

	ctx.clearRect(0,0,canvas.width, canvas.height); 
	checkKeys(); 
	sprite.update(); 
	
	// with(sprite) { 
	// 	if(pos.x<0) pos.x = screenWidth;  
	// 	else if(pos.x>screenWidth) pos.x = 0;  
	// 	if(pos.y<0) pos.y = screenHeight;  
	// 	else if(pos.y>screenHeight) pos.y = 0;  
	// }
	
	sprite.render(ctx); 
	
}	

function checkKeys() { 
	// if(KeyTracker.isKeyDown(Key.LEFT)) {
	// 	sprite.goLeft(); 
	// }
	// 
	// if(KeyTracker.isKeyDown(Key.RIGHT)) {
	// 	racer.steer(1); 
	// }
	// if(KeyTracker.isKeyDown(Key.UP)) { 
	// 	racer.accelerate(1); 
	// }
	// if(KeyTracker.isKeyDown(Key.DOWN)) { 
	// 	racer.accelerate(-1); 
	// }
	
}


function initVars() { 
	screenWidth = window.innerWidth; 
	screenHeight = window.innerHeight; 	
	frameRate = 30;

}

function initCanvas() { 

	canvas = document.createElement('canvas'); 
	ctx = canvas.getContext('2d'); 

	document.body.appendChild(canvas); 
	canvas.width = screenWidth; 
	canvas.height = screenHeight;
}

function initObjects() { 

	sprite = new Animation(spriteImage, 60, 68, 11); 
	sprite.play();
	
}

function initListeners() { 
	
	//KeyTracker.addKeyDownListener(Key.SPACE, firePressed); 

}


function Sprite() { 
	
	var pos = this.pos = new Vector2(100,100); 
	var vel = this.vel = new Vector2(0,0); 
	
	var forwardVel,
		forwardFriction = 0.97, 
		steeringStrength = 0.3, 
		normal = new Vector2(0,0), 
		newPos = new Vector2(0,0), 
		wheelRotation = 0,  // -1 to 1
		easedWheelRotation = 0, 
		enginePower = 0.6, 
		steering = false, 
		rotation = 0; 
		
		
	this.render = function(ctx) { 
		
		ctx.save(); 
		ctx.translate(pos.x, pos.y); 
		ctx.rotate(radians(rotation)); 
		ctx.fillStyle = 'white'; 
		ctx.fillRect(-20, -4, 40, 8); 
		
		// front wheels
		ctx.save(); 
		ctx.translate(14,0); 
		// 10 is the magic number - 10 degress max rotation of the wheels
		ctx.rotate(easedWheelRotation * radians(10)); 		
		ctx.fillRect(-6,-16, 12, 6); 
		ctx.fillRect(-6, 10, 12, 6); 
		
		ctx.restore(); 
		
		// back wheels
		ctx.save(); 
		ctx.translate(-14,0);
		ctx.fillRect(-6,-16, 12, 6); 
		ctx.fillRect(-6, 10, 12, 6); 
		ctx.restore(); 
		ctx.restore(); 
		
		
	}
	
	this.accelerate = function (amount) {
		
		var force = normal.clone(); 
		force.multiplyEq(amount * enginePower); 
		vel.plusEq(force); 
		
	} 
	
	this.steer = function(amount) { 
		wheelRotation+=(amount*0.1); 
		steering = true; 
	}
	
	this.update = function() { 
		
		friction = forwardFriction; 
		forwardVel = vel.dot(normal);
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
		
		if(!steering)
			wheelRotation*=0.4;
		else
		{
			if(wheelRotation>1) wheelRotation = 1; 
			else if (wheelRotation<-1) wheelRotation = -1; 
			
			steering = false; 		
		}
	
		
	}
	
		
}	
		
		
