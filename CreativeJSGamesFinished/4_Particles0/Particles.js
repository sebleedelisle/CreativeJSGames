
var screenWidth, 
	screenHeight,
	canvas, 
	ctx, 
	particles = []; 

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
	
	var p = new Particle(screenWidth/2, screenHeight/2); 
	particles.push(p); 
	
	if(particles.length>600) { 
		particles.shift(); 
		
	}
	
	for(var i = 0; i<particles.length; i++) { 
		var p = particles[i]; 
		p.update(); 
		p.render(); 
		
		
	}
	
	
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


function Particle(x,y) { 

	this.pos = new Vector2(x, y); 
	this.vel = new Vector2(random(-5,5), random(-5,5));
	this.size = random(2,6); 
	
	this.update = function() { 
	//	this.size *= 0.96; 
		this.vel.multiplyEq(0.96); 
		//this.vel.y += 0.3; 
		this.pos.plusEq(this.vel); 
	}
	
	this.render = function() { 
		ctx.fillStyle = 'white';
		ctx.fillCircle(this.pos.x, this.pos.y, this.size); 
		
	}
	
}



