SceneManager = function() {
	
	this.currentScene = undefined; 
	

	
}

SceneManager.prototype = {
	
	gotoScene : function(nextscene) { 
		
		if(this.currentScene) {
			this.currentScene.stop(); 
		}
		nextscene.start(); 
		
		this.currentScene = nextscene; 
		
	},
	render : function(ctx) {
		if((typeof(this.currentScene)!='undefined') && (typeof(this.currentScene.render)=='function')) { 
			this.currentScene.render(ctx);
		}
		
		
	}
	
};


Scene = function() { 	
	
}

Scene.prototype = {
	
	start : function() { 
		
	}, 
	
	stop : function() { 
		
	}, 
	render : function() { 
		
	}
}



/*
DOMScene = function(domElement) { 

	this.parentNode = undefined; 
	this.domElement = undefined;
	
	this.setDomElement(domElement);  
	
	Scene.call(this); 
	
	
}

DOMScene.prototype = Object.create(Scene.prototype); 

DOMScene.prototype.setDomElement = function(domElement) { 
	this.domElement = domElement;
	this.parentNode = domElement.parentNode;  
}
DOMScene.prototype.start = function() { 

	
}
*/

// add more functions here : 
