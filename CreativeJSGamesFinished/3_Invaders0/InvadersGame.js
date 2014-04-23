
var screenWidth, 
	screenHeight, 
	player, 
	aliens = [], 
	bullets = [],
	spareBullets = [],
	stars = [],   
	leftDown = false, 
	rightDown = false, 
	alienImage = new Image();

alienImage.src = "alien.png"; 


var canvas, 
	ctx; 
	
	
function setup(){
	initVars(); 
	initCanvas(); 
	initObjects(); 
	
	KeyTracker.addKeyDownListener(' ', fireBullet); 
	
}


// MAIN GAME LOOP

function draw() { 

	ctx.clearRect(0,0,canvas.width, canvas.height); 
	checkKeys(); 
	updateBullets(); 
	
	checkCollisions(); 
	
	renderStars(); 
	player.render();
	renderBullets(); 
	renderAliens(); 
	
	
	ctx.fillText(bullets.length, 50,50);
	
}	

function checkCollisions() { 
	
	for(var i = 0; i<bullets.length; i++) { 
		var bullet = bullets[i]; 
		if(!bullet.enabled) continue; 
		
		for(var j = 0; j<aliens.length; j++) { 
			var alien = aliens[j]; 
			
			if((bullet.x >alien.x) && ( bullet.x < alien.x + alien.w)
				&& (bullet.y > alien.y) && (bullet.y< alien.y + alien.h)){
				deleteBullet(bullet); 
				
				aliens.splice(j,1); 
				break;	
			}	
		}
	}
}



function updateBullets() {
	for(var i = 0; i<bullets.length; i++) { 		
		var bullet = bullets[i];
		
		if(bullet.enabled) { 
		
			bullet.update();
		
			if(bullet.y < 200) { 
				// bullets.splice(i, 1); 
				// 			i--;
				deleteBullet(bullet); 
			}
		}
	}
}
function deleteBullet(bullet) { 
	bullet.enabled = false;
	spareBullets.push(bullet);
}

function renderBullets() { 	
	for(var i = 0; i<bullets.length; i++) { 		
		var bullet = bullets[i]; 
		
		if(!bullet.enabled) continue; 
		  
		bullets[i].render();
	}
}

function renderAliens() { 
	for(var i = 0; i< aliens.length; i++) { 
		aliens[i].render();
		
	}
	
}

function checkKeys() { 
	if(KeyTracker.isKeyDown(Key.LEFT)) player.moveLeft(); 
	if(KeyTracker.isKeyDown(Key.RIGHT)) player.moveRight();	
}




function fireBullet() { 
	if(spareBullets.length>0) { 
		var bullet = spareBullets.pop(); 
		bullet.x = player.x; 
		bullet.y = player.y; 
		bullet.enabled =true; 
		
	} else { 
		bullets.push(new Bullet(player.x, player.y)); 
	}
}

function initVars() { 
	screenWidth = window.innerWidth; 
	screenHeight = window.innerHeight; 	
}

function initCanvas() { 

	canvas = document.createElement('canvas'); 
	ctx = canvas.getContext('2d'); 

	document.body.appendChild(canvas); 
	canvas.width = screenWidth; 
	canvas.height = screenHeight;
}

function initObjects() { 
	player = new Player();
	
	for(var x = 100; x < screenWidth-100; x+=60) { 		
		aliens.push(new Alien(alienImage, x, 300)); 
	}
	
	for(var i = 0; i<100; i++) {  
		
		var z = random(200, 2000); 
		
		var star = {x : random(screenWidth), 
					y : random(screenHeight), 
					scale : 250/(250+z)
			}; 
		
		stars.push(star); 		
	}

}

function renderStars() { 
	
	for(var i = 0; i<stars.length; i++) { 
		
		var star = stars[i]; 
		
		star.y += star.scale*5; 
		if(star.y>screenHeight) star.y -= screenHeight; 
		ctx.fillStyle = '#7799cc'; 
		ctx.fillCircle(star.x, star.y, star.scale*3); 
		
		
	}
	
	
	
}



// ------------------------- PLAYER ------------------ 

function Player() { 
	
	this.x = screenWidth/2; 
	this.y = screenHeight - 100; 
	this.w = 40; 
	this.h = 20; 
	
	var moveSpeed = 5; 
	
	this.moveLeft = function() { 
		this.x-=moveSpeed;
		
	}
	
	this.moveRight = function() { 
		this.x+=moveSpeed;
		
	}
	
	this.render = function() { 
		ctx.fillStyle = "#ff0099";
		ctx.fillRect(this.x - this.w/2, this.y, this.w, this.h); 
	}	
}

//--------------------------- BULLET ----------------------------

function Bullet(x, y) { 
	this.x = x; 
	this.y = y; 
	this.w = 3; 
	this.h = 10; 
	this.enabled = true; 
	
	var speed = -6; 
	
	this.update = function() { 
		
		this.y += speed; 
		
	}
	
	this.render = function() { 
		
		ctx.fillStyle = '#00ccee'; 
		ctx.fillRect(this.x - this.w/2, this.y, this.w, this.h); 
		
		
	}
	
	
}

// ---------------------------- ALIEN ----------------------- 

function Alien(img, x, y) { 
	
	this.img = img; 
	this.x = x; 
	this.y = y; 
	this.w = img.width; 
	this.h = img.height; 
	
	this.render = function() { 
		
		// ctx.fillStyle = '#fc0'; 
		// ctx.fillRect(this.x, this.y, this.w, this.h); 
		ctx.drawImage(this.img, this.x, this.y); 
		
	}
	
	
	
	
	
}






















