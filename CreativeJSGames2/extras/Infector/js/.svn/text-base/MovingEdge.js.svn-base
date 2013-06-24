function MovingEdge(x, y, w, dist, startVel, edgeImg)
{
	var pos = this.pos = new Vector2(x, y); 
	var img = this.img = edgeImg ;
	this.width = w; 
	this.moveDistance = dist;
	this.startY = y;
	
	this.vel = new Vector2(0,startVel); 
	
	var domElement = this.domElement = document.createElement('div');
	domElement.style.background = 'url('+img.src+')';

	domElement.style.position = 'absolute';
	domElement.style.display = 'block'; 
	domElement.style.width = this.width+"px"; 
	domElement.style.height = img.height+"px";
	domElement.style.top = "0px"; 
	domElement.style.left = "0px"; 	

	this.getLeft = function(){
		return this.pos.x; 
	};

	this.getRight = function(){
		return this.pos.x+this.width; 
	};

	this.getTop = function(){
		return this.pos.y; 
	};
	
	this.getUpperBounds = function(){
		return this.startY + this.moveDistance;
	};
	
	this.getLowerBounds = function(){
		return this.startY - this.moveDistance;
	};

	this.render = function(){
		
		var dom = domElement;
		styleStr = "translate("+Math.round(this.pos.x)+"px, "+Math.round(this.pos.y-8)+"px)"; 
	
		dom.style.webkitTransform = dom.style.MozTransform = dom.style.OTransform = dom.style.transform = styleStr; 
	 	
		
	};
	
	this.update = function(){
		this.pos.plusEq(this.vel);
	};

}