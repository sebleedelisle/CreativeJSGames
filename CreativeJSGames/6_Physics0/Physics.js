var player; 

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
	
	player.update(); 
	
	if(player.pos.x < 0) player.pos.x = 0; 
	else if(player.getRight()>screenWidth) player.pos.x = screenWidth-player.width; 
	
	if(player.pos.y < 0) player.pos.y = 0; 
	else if(player.getBottom()>screenHeight) player.pos.y = screenHeight; 

	if(KeyTracker.isKeyDown(Key.LEFT)) player.moveLeft(); 
	else if(KeyTracker.isKeyDown(Key.RIGHT)) player.moveRight(); 
	else player.vel.x = 0; 
	
	if(KeyTracker.isKeyDown(Key.UP)) player.moveUp(); 
	else if(KeyTracker.isKeyDown(Key.DOWN)) player.moveDown(); 
	else player.vel.y = 0; 

	player.render(ctx); 
	
}	
	


function initObjects() { 
	
	player = new Player(20,50); 
}

function initListeners() { 

}


function initVars() { 
	screenWidth = window.innerWidth; 
	screenHeight = window.innerHeight; 
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
	var drag = this.drag = new Vector2(1, 1); 
	
	this.gravity = 0;
	
	this.width = 24; 
	this.height = 43; 
		
	var moveSpeed = 12; 
		
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
		this.vel.x=-moveSpeed; 
		
	};
	
	this.moveRight = function() {
		
		this.vel.x=moveSpeed; 
		
	};
	
	this.moveUp = function() {
		this.vel.y=-moveSpeed; 
		
	};
	
	this.moveDown = function() {
		
		this.vel.y=moveSpeed; 
		
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