var edges = [], 
	pickUps = [],
	player; 

var screenWidth, 
	screenHeight,
	canvas, 
	ctx; 

// set up automatically called on load by creativejs.js
function setup(){
	initVars(); 
	initCanvas(); 
	initObjects(); 
	initListeners(); 

}

// MAIN GAME LOOP
// draw automatically called by creativejs.js
function draw() { 
	ctx.clearRect(0,0,canvas.width, canvas.height); 
	
	for(var i = 0; i<edges.length; i++){	
		var edge = edges[i]; 
		edge.render(ctx); 
	} 
	
	for(var i = 0; i< pickUps.length; i++){	
		var pickup = pickUps[i]; 
		
		if( pickup.enabled ){
			
			pickup.render(ctx); 
		}
	}
	
	player.update(); 
	
	if(player.pos.x < 0) player.pos.x = 0; 
	else if(player.getRight()>screenWidth) player.pos.x = screenWidth-player.width; 
	
	if(player.pos.y < 0) player.pos.y = 0; 
	else if(player.getBottom()>screenHeight) player.pos.y = screenHeight; 

	if(KeyTracker.isKeyDown(Key.LEFT)) player.moveLeft(); 
	else if(KeyTracker.isKeyDown(Key.RIGHT)) player.moveRight(); 
	
	
	checkCollisions(); 
	
	player.render(ctx); 

}	
function checkCollisions(){
	
	if(player.connectedEdge){
		var edge = player.connectedEdge; 
		if((player.getLeft()>edge.getRight()) || (player.getRight()<edge.getLeft()))
			player.fall();

	}
	
	
	for (var i= 0; i<edges.length; i++){
		var edge = edges[i]; 
		
		if((player.pos.y > edge.getTop()) && (player.pos.y - player.vel.y < edge.getTop())) {
			if((player.getLeft() < edge.getRight()) && (player.getRight()> edge.getLeft())) {
				player.connectedEdge = edge; 
				player.pos.y = edge.pos.y; 
				player.vel.y = 0; 	
			}
		}	
		
	}
	
	
	for (var i= 0; i< pickUps.length; i++){
	
		var pickup = pickUps[i];
		
		if( checkHorizCollision( player , pickup ) ){
			if( checkVertCollision( player, pickup ) ){
				if( pickup.enabled ){
					pickupsCollected++;
					
				}
					
				pickup.collect() ;
			}
		}
	}
	
}
	
	
	
function checkVertCollision( obj1 , obj2 ){

	if(((obj1.pos.y > obj2.getTop()) && (obj1.pos.y <= obj2.pos.y) ) || (( obj1.getTop() < obj2.pos.y) && ( obj1.getTop() > obj2.getTop() ))) return true ;
	return false ;
}

function checkHorizCollision( obj1 , obj2 ){

	if((obj1.getLeft() < obj2.getRight()) && (obj1.getRight()> obj2.getLeft())) return true ;
	return false ;

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
	
	// PICKUPS
	for( var i = 0 ; i < edges.length ; i ++ ){
			var pickup = new PickUp( random( edges[i].getLeft() + edges[i].width / 4 , edges[i].getRight() -  edges[i].width / 4 ) ,  edges[i].getTop() ) ;
			pickUps.push( pickup ) ;		
	}

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
	pickupsCollected = 0;
	totalPickups = pickUps.length;
	
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
			
		if(this.connectedEdge) {
			vel.y -= 30; 
			this.connectedEdge = null; 
		}

	};
	
	this.fall = function(){
		this.connectedEdge = null;
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

//-------------- PICKUP ----------------

function PickUp(x, y) {

	var pos = this.pos = new Vector2(x,y); 
	this.width = 25; 
	this.height = 27; 
	this.enabled = true ;
	
	this.render = function(c){
		c.save(); 
		c.fillStyle = "blue"; 
		c.fillRect(this.getLeft(), this.getTop(), this.width, this.height); 
		c.restore();
	};
	
	this.collect = function(){
		this.enabled = false ;
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