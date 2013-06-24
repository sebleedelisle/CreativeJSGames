function Edge(x, y, w, edgeImg)
{
	var pos = this.pos = new Vector2(x, y);
	
	var img = this.img = edgeImg ;
	
	//console.log("Edge constructor", this.img, edgeImg); 

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
		
		var currentWidth = 0; 
		var scale =1.5; 
		while(currentWidth<this.width)
		{
			var imageWidth = Math.min(img.width/scale, this.width-currentWidth); 
			
			c.drawImage(img, 0,0,imageWidth*scale, img.height,  currentWidth+pos.x, pos.y-8, imageWidth, img.height/scale);
			currentWidth+=imageWidth; 
			//console.log(currentWidth, this.width);
		}
		
		c.restore(); 
		
		
	};










}