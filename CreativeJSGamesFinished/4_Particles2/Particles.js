
var screenWidth, 
	screenHeight,
	canvas, 
	ctx, 
	particles = [], 
	particleImage = new Image();
	
particleImage.src = "ParticleCyan.png"; 
 

// set up automatically called on load by creativejs.js
function setup(){
	initVars(); 
	initCanvas(); 
	initObjects(); 
	
	//window.addEventListener("mousedown", onMouseDown); 

}

function onMouseDown(e) { 
	makeParticle(100, mouseX, mouseY); 
}

// MAIN GAME LOOP
// draw automatically called by creativejs.js
function draw() { 

	ctx.clearRect(0,0,canvas.width, canvas.height); 
	
	//makeParticle(2, mouseX, mouseY); 
	
	while(particles.length>500) { 
		particles.shift();
	}
	
	for(var i = 0; i<particles.length; i++ ) { 
		var p = particles[i]; 
		p.update(); 
		p.render(); 		
	}
	
	
}	

function makeParticle(numParticles, x, y) { 
	
	for(var i = 0; i<numParticles; i++) { 
		var p = new Particle(particleImage, x, y); 
		p.vel.reset(random(0,5),0);
		p.vel.rotate(random(360));
		particles.push(p); 
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

//----------------------- PARTICLE -------------------------

function Particle(img, x, y) { 
	
	var pos = this.pos = new Vector2(x,y); 
	var vel = this.vel = new Vector2(); 
	this.size = random(1,3); 
	this.drag = 0.98; 
	this.shrink = 0.96; 
	this.img = img; 
	this.gravity = 0.05; 
	
	this.update = function() { 
		vel.multiplyEq(this.drag);
		vel.y+=this.gravity;
		pos.plusEq(vel); 
		this.size*=this.shrink;
	}
	
	this.render = function() { 
		ctx.save(); 
		ctx.globalCompositeOperation = 'lighter';
		ctx.translate(pos.x, pos.y); 
		ctx.scale(this.size, this.size); 
		ctx.drawImage(img, -img.width/2, -img.height/2); 
		ctx.restore();
	}
	
}

