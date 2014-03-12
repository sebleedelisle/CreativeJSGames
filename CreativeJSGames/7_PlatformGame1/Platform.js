var edges = [], 
	player; 

var screenWidth, 
	screenHeight,
	canvas, 
	ctx; 

// set up automatically called on load by creative.js
function setup(){
	initVars(); 
	initCanvas(); 
	initObjects(); 
	initListeners(); 

}

// MAIN GAME LOOP
// draw automatically called by creative.js

function draw() { 
	ctx.clearRect(0,0,canvas.width, canvas.height); 
	
	drawEdges(); 

	checkKeys(); 	
	player.update(); 

	checkCollisions(); 
	
	player.render(ctx); 

}	

function drawEdges() { 
	
	for(var i = 0; i<edges.length; i++){	
		var edge = edges[i]; 
		edge.render(ctx); 
	} 
	
}


function checkKeys() { 
	
	if(KeyTracker.isKeyDown(Key.LEFT)) player.moveLeft(); 
	else if(KeyTracker.isKeyDown(Key.RIGHT)) player.moveRight(); 
	
	
}


function checkCollisions(){
	
	if(player.pos.x < 0) player.pos.x = 0; 
	else if(player.getRight()>screenWidth) player.pos.x = screenWidth-player.width; 
	
	if(player.pos.y < 0) player.pos.y = 0; 
	else if(player.getBottom()>screenHeight) player.pos.y = screenHeight;
	
}

function initObjects() { 
	
	// bottom edge
	edges.push(new Edge(0,screenHeight-1, screenWidth)); 
	edges.push(new Edge( 10, 415, 190 )); 
	edges.push(new Edge( 10, 244, 190 ));
	edges.push(new Edge( 238, 328, 190 ));
	edges.push(new Edge( 297, 153, 190 ));
	edges.push(new Edge( 196, 64, 190 ));
	edges.push(new Edge( 560, 200, 168 ));
	edges.push(new Edge( 505, 40, 120 ));

	player = new Player(20,50); 
	
}

function initListeners() { 
	KeyTracker.addKeyDownListener(Key.UP, jumpPressed); 
}

function jumpPressed() { 
	player.jump();		
}

function initVars() { 
	screenWidth = 800; 
	screenHeight = 480; 
	frameRate = 40;

	
}

function initCanvas() { 

	canvas = document.createElement('canvas'); 
	ctx = canvas.getContext('2d'); 

	document.body.appendChild(canvas); 
	canvas.width = screenWidth; 
	canvas.height = screenHeight;
}



// ----------- PLAYER-------------

function Player(x, y) {

	var pos = this.pos = new Vector2(x,y); 
	var vel = this.vel = new Vector2(0,0); 
	var drag = this.drag = new Vector2(0.4, 0.95); 
	
	this.gravity = 3;
	
	this.width = 24; 
	this.height = 43; 
	
	
	this.connectedEdge = null; 
	
	this.update = function (){
	
		vel.x *= drag.x; 
		vel.y *= drag.y; 
		
		if(!this.connectedEdge){ 
			vel.y+=this.gravity; 
		}
			
		pos.plusEq(vel); 

	}; 
	
	this.render = function(c){
		c.save(); 
		c.fillStyle = "rgba(255,255,255,1)"; 
		c.fillRect(this.getLeft(), this.getTop(), this.width, this.height); 
		c.restore(); 
	
	};
	
	this.moveLeft = function() {
		this.vel.x-=16; 
		
	};
	
	this.moveRight = function() {
		
		this.vel.x+=16; 
		
	};
	
	this.jump = function() {
		vel.y = -30; 
	
	};
	
	this.fall = function(){
	};
	

	
	this.getLeft = function() { 
		return pos.x; 
	};
	
	this.getRight = function() { 
		
		return pos.x+this.width; 
		
	};

	this.getTop = function() {
		return pos.y-this.height; 
		
	};
	
	this.getBottom = function () {
		
		return pos.y; 
		
	};

}
// ---------- EDGE ---------------

function Edge(x, y, w)
{
	var pos = this.pos = new Vector2(x, y);

	this.width = w; 
	this.getLeft = function(){
		return this.pos.x; 
	
	};

	this.getRight = function(){
		return this.pos.x+this.width; 
		
	};

	this.getTop = function(){
		return this.pos.y; 
		
	};

	this.render = function(c){
		
		c.save(); 
		c.fillStyle = "white";
		c.translate(pos.x, pos.y); 
		c.fillRect(0,0,this.width, 10);
		
		c.restore(); 
		
		
	};

}
