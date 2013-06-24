
var screenWidth, 
	screenHeight,
	canvas, 
	ctx; 

var hue= 0; 

// set up automatically called on load by creativejs.js
function setup(){
	initVars(); 
	initCanvas(); 
	initObjects(); 

}

// MAIN GAME LOOP
// draw automatically called by creativejs.js
function draw() { 

	//ctx.clearRect(0,0,canvas.width, canvas.height); 
	

	ctx.fillStyle = hsl(hue,50,50); 

	ctx.fillRect(0,0,100,100); 
	hue++;
	
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

