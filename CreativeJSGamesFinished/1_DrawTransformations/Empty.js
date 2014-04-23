
var screenWidth, 
	screenHeight,
	angle = 0,
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
	
	ctx.save(); 
	ctx.strokeStyle = 'white';
	ctx.lineWidth = 1; 
	ctx.translate(400,400);
	
	for(var i = 0;i<60; i++) {  
		ctx.rotate(angle); 
		ctx.scale(0.96,0.96); 
		
		ctx.strokeRect(-100,-100,200,200); 
	}
	
	ctx.restore(); 
	angle+=0.0001;
	
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

