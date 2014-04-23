
var screenWidth, 
	screenHeight,
	canvas, 
	caterpillar, 
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
	var speed = 3; 
	
	if(KeyTracker.isKeyDown(Key.LEFT)) { 
		caterpillar.vel.reset(-speed, 0); 
	} else if(KeyTracker.isKeyDown(Key.RIGHT)){ 
		caterpillar.vel.reset(speed, 0); 
	}
	if(KeyTracker.isKeyDown(Key.UP)) { 
		caterpillar.vel.reset(0, -speed); 
	} else if(KeyTracker.isKeyDown(Key.DOWN)){ 
		caterpillar.vel.reset(0, speed); 
	}
	caterpillar.update(); 
	caterpillar.render(); 
}	


function initObjects() { 
	caterpillar = new Caterpillar(); 
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

function Caterpillar() { 
	
	var pos = this.pos = new Vector2(300,300); 
	var vel = this.vel = new Vector2(); 
	this.radius = 10; 
	var positions = []; 
	this.segmentNumber = 20; 
	this.skipNumber = 5; 
	
	
	this.update = function () {
		 
		pos.plusEq(vel); 
		positions.push(pos.clone()); 
		
		if(positions.length>this.segmentNumber * this.skipNumber) positions.shift();
		
		
	}
	this.render = function() { 
		
		
		ctx.fillStyle = 'white'; 
		for(var i = 0; i<positions.length; i+=this.skipNumber) { 
			var p = positions[i]; 
			ctx.fillCircle(p.x, p.y, this.radius); 
		
		}
		
	}
}


