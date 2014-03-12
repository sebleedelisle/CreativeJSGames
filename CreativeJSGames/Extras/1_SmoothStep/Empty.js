
var screenWidth, 
	screenHeight,

	pos = new Vector2(0,200), 
	target = new Vector2(600,200),
	vel = new Vector2(0,0),

	canvas, 
	ctx; 

// set up automatically called on load by creative.js
function setup(){
	initVars(); 
	initCanvas(); 
	initObjects(); 

}

// MAIN GAME LOOP
// draw automatically called by creative.js
function draw() { 

	ctx.clearRect(0,0,canvas.width, canvas.height); 
	
	// var diffx = target.x - pos.x; 
	// var diffy = target.y - pos.y; 
	// 
	// diffx *= 0.1; 
	// diffy *= 0.1; 
	// 
	// pos.x += diffx; 
	// pos.y += diffy; 
	
	target.x = mouseX; 
	target.y = mouseY;
	
	vel.multiplyEq(0.9); 
	
	var diff = target.clone(); 
	diff.minusEq(pos);
	
	diff.multiplyEq(0.05); 
	vel.plusEq(diff);
	pos.plusEq(vel); 
	
	ctx.fillStyle = 'white';
	ctx.fillCircle(pos.x, pos.y, 20); 
	
	
}	


function initObjects() { 

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

