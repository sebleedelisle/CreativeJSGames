function Ladder(x,y,h, image)
{
	
	var image = image ;
	var scale = 0.5; 
	
	this.height = h; 
	this.width = image.width * scale ;
	var pos = this.pos = new Vector2(x, y + this.height); 
	
	this.getCenterX = function()
	{
		return pos.x + this.width * 0.5;
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
	
	this.update = function() {
		
	};
		
	this.render = function(c){
		/*
		c.fillStyle = "rgba(255,255,255,0.5)"; 
		c.lineWidth = 20; 
		c.beginPath(); 
		c.fillRect(pos.x, pos.y-this.height, this.width, this.height); 
		*/
		c.save(); 
		
		var currentHeight = 0; 
	
		while(currentHeight<this.height)
		{
			var imageHeight = Math.min(image.height*scale, this.height-currentHeight); 
			
			c.drawImage(image, 0,0,image.width, imageHeight/scale,  pos.x, pos.y-this.height+currentHeight, image.width*scale, imageHeight);
			currentHeight+=imageHeight; 
			//console.log(currentWidth, this.width);
		}
		
		c.restore(); 
		
		
		
		
		/*
		
		c.save(); 
		
		
		
		c.translate(pos.x,pos.y-this.height);
		
		
		
		var repeat = Math.ceil( this.height / image.height );
		if( image )for( var i= repeat; i >= 0 ; i-- )
		{
			var h = image.height;
			if( image.height*(i) > this.height )
			{
				h = image.height*(i) - this.height; 
			}
			try{
				c.drawImage(image, 0, 0, image.width, h, 0,image.height*i, this.width, h )
			}catch(e)
			{
				//console.log('could not draw part of ladder');
			}
		}
		c.restore(); */
		
		
	};

	
}