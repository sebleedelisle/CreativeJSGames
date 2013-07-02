function TouchController() { 
	
	document.body.addEventListener( 'touchstart', onTouchStart, false );
	document.body.addEventListener( 'touchmove', onTouchMove, false );
	document.body.addEventListener( 'touchend', onTouchEnd, false );
	
	var leftTouch = new TouchData(), 
		rightTouch = new TouchData(); 
	
	
	function onTouchStart(e) {  
		
		e.preventDefault(); 
		
		for(var i = 0; i<e.changedTouches.length; i++){
			var touch =e.changedTouches[i]; 
			
			if((!leftTouch.touching) && (touch.clientX<SCREEN_WIDTH/2)) {
				// set up left touch
			} else if((!rightTouch.touching) && (touch.clientX>SCREEN_WIDTH/2)){
				// set up right touch
			}
			
		}
		
	}
	
	function onTouchMove(e) { 
		e.preventDefault(); 

		for(var i = 0; i<e.changedTouches.length; i++){
			var touch =e.changedTouches[i]; 

			if(leftTouch.ID == touch.identifier) {
				// update leftTouch
			} else if(rightTouch.ID == touch.identifier) {
				// update right touch
			}

		}
	}
	
	function onTouchEnd(e) { 
		e.preventDefault(); 

		for(var i = 0; i<e.changedTouches.length; i++){
			var touch =e.changedTouches[i]; 

			if(leftTouch.ID == touch.identifier) {
				// end leftTouch
			} else if(rightTouch.ID == touch.identifier) {
				// end right touch
			}

		}	
		
	}
	
}

function TouchData() { 
	
	this.touchID = -1; 
	this.touching = false; 
	this.touchStartPos = new Vector2(); 
	this.touchVector = new Vector2(); 
	this.touchPos = new Vector2(); 
	
}

TouchData.prototype = { 
	startTouch : function(x,y,ID) { 
		this.touchID = ID; 
		this.touching = true; 
		this.touchStartPos.reset(x,y); 
		this.touchVector.reset(0,0);
		this.touchPos.reset(x,y); 
	}, 
	updateTouch : function(x,y) { 
		this.touchPos.reset(x,y); 
		this.touchVector.reset(x,y); 
		this.touchVector.minusEq(this.touchStartPos); 
	}, 
	endTouch : function() { 
		this.touching = false; 
		this.touchID = -1; 
	}
				
};