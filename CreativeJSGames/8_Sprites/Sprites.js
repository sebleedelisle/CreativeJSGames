
// game variables

var sprite, 
	spriteImage = new Image();

spriteImage.src = "Runner.png";

var canvas, 
	ctx,
	screenWidth, 
	screenHeight;

	
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
	checkKeys(); 
	sprite.update(); 

	if(sprite.x<0) sprite.x = screenWidth;  
	else if(sprite.x>screenWidth) sprite.x = 0;  
	if(sprite.y<0) sprite.y = screenHeight;  
	else if(sprite.y>screenHeight) sprite.y = 0;  
	
	sprite.render(ctx); 

	
}	

function checkKeys() { 
	if(KeyTracker.isKeyDown(Key.LEFT)) {
		sprite.x-=10; 
		sprite.play();
		sprite.scaleX = -Math.abs(sprite.scaleX); 
	}
	else if(KeyTracker.isKeyDown(Key.RIGHT)) {
		sprite.x+=10;  
		sprite.scaleX = Math.abs(sprite.scaleX); 
		sprite.play();
	} else { 
		sprite.stop(); 
	}

	
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
	
		
