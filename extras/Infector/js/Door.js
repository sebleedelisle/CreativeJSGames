function Door( x, y, spriteSheet, isEndDoor, enabled )
{
	
	this.isEndDoor = isEndDoor || false;
	
	this.width = 132;
	this.height = 140;
	this.enabled = enabled || false;
	var pos = this.pos = new Vector2(x, y + this.height ); 

	this.animation = new Animation(spriteSheet, this.width, this.height);
	this.animation.x = this.pos.x; 
	this.animation.y = this.pos.y-this.animation.height; 
	
	this.animation.looping = false;	
	this.animation.update(); 
		
	if( !this.enabled ) this.animation.playing = false;
	
	var domElement = this.domElement = this.animation.domElement;
	
	this.reset = function(){
		this.disable() ;
	};
	
	this.enable = function()
	{
		this.animation.playing = true;
		this.enabled = true;
	};

	this.disable = function()
	{
		this.animation.gotoAndStop( this.animation.numFrames - 1 ) ;
		this.animation.playing = false;
		this.enabled = false;
	};
	
	this.update = function()
	{
		//
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
	
	this.render = function()
	{
		this.animation.x = this.pos.x; 
		this.animation.y = this.pos.y-this.animation.height; 
		this.animation.update(); 
	
	};

}