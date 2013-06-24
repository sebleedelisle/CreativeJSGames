function Enemy( spritesheet ) {

	var navNodes = [] ;
	var vectors = [];
	var mags = [];
	var currentNodeIndex = 0 ;
	var forwards = true; 
	this.pos = new Vector2(0,0); 

	this.speed = 2 ;
	this.width = 30; 
	this.height = 40 ;
	this.animation = new Animation( spritesheet, 45, 53);	
	
	var domElement = this.domElement = this.animation.domElement;
	
	this.progress = 0; 
	this.pathLength = 0;
	
	this.reset = function() {
		this.progress = 0 ;
	};
	
	this.reset() ;
	
	this.registerNavNode = function( node ) {		
		
		if(navNodes.length>0) {
			var v = node.minusNew(navNodes[navNodes.length -1]); 
			
			vectors.push(v);
			var mag= v.magnitude();
			mags.push(mag);  
			
			this.pathLength+=mag; 
			//console.log(mag, this.pathLength, v); 
			 
		}
		navNodes.push( node ) ;
	};
	
	this.update = function () {

		var i = 0; 
		distance = 0; 
		
		if((forwards) && (this.progress>=this.pathLength))
		{
			forwards = false; 
			this.progress = this.pathLength-1;
			this.animation.scaleX = 1; 
		}
		if((!forwards) && (this.progress<=0))
		{
			forwards = true; 
			this.progress = 0;
			this.animation.scaleX = -1; 
		}	
	
		
		while(distance<=this.progress) {
			distance += mags[i]; 
			i++;
		}
		
		var index = i-1; 
		var v = vectors[index]; 
		
		var minDistance = distance - mags[index];
		
		var currentprogress = this.progress - minDistance; 
		
		currentprogress /= mags[index]; 
		
		this.pos.copyFrom(v); 
		this.pos.multiplyEq(currentprogress);  
		this.pos.plusEq(navNodes[index]); 
		
		this.progress = this.progress + (forwards ? this.speed : -this.speed); 

		//console.log(forwards, this.progress, this.pathLength); 
	
		
	}; 
	
	this.render = function(c){
		
		this.animation.x = this.pos.x; 
		this.animation.y = this.pos.y-this.animation.height; 
		this.animation.update();
		
		// c.save(); 
		// 		
		// 		c.fillStyle = "red"; 
		// 		c.fillRect(this.getLeft(), this.getTop(), this.width, this.height); 
		// 		
		// 		c.restore(); 
	};
	
	this.getLeft = function() { 
		return this.pos.x; 
	};
	
	this.getRight = function() { 
		return this.pos.x+this.width; 
	};

	this.getTop = function() {
		return this.pos.y-this.height; 
	};
	
	this.getBottom = function () {
		return this.pos.y; 
	};

}