function PickUp(spritesheet,x, y) {

	this.width = 25; 
	this.height = 27;
	this.animation = new Animation(spritesheet, this.width, this.height);
	var domElement = this.domElement = this.animation.domElement;
	var pos = this.pos = new Vector2(0,0); 
	this.enabled = true ;
	
	this.reset = function( x, y ){
		this.enabled = true ;
		domElement.style.display = 'block' ;
		this.pos.x = x ;
		this.pos.y = y ;
	};
	
	this.reset( x, y ) ;
	
	this.render = function(c){
	
		this.animation.x = this.pos.x; 
		this.animation.y = this.pos.y-this.animation.height; 
		this.animation.update(); 
		
	};
	
	this.collect = function(){
	
		this.enabled = false ;
		domElement.style.display = 'none' ;
	
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