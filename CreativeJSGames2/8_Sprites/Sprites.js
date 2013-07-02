
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
//******* check keyboard input on this example

//---------------------- MAIN GAME LOOP ---------------------------------
function draw() { 

	ctx.clearRect(0,0,canvas.width, canvas.height); 
	//checkKeys(); 
	sprite.update(); 
	
	// with(sprite) { 
	// 	if(pos.x<0) pos.x = screenWidth;  
	// 	else if(pos.x>screenWidth) pos.x = 0;  
	// 	if(pos.y<0) pos.y = screenHeight;  
	// 	else if(pos.y>screenHeight) pos.y = 0;  
	// }
	ctx.save(); 
	ctx.translate(200,200); 
	//ctx.rotate(radians(180));
	ctx.scale(-1,1);
	sprite.render(ctx); 
	
	ctx.restore(); 
	/ctx.drawImage(spriteImage, 800,0,60,89,0,30,60,89);
	
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
	//sprite.stop();
	
	// NOTE TO SELF : implement stop :) ****** 
}

function initListeners() { 
	
	//KeyTracker.addKeyDownListener(Key.SPACE, firePressed); 

}
	
		
