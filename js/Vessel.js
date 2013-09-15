function Vessel(w) {
	this.cockpit = null;
	this.nom = "";
	this.angle = -3*PI/4;
	this.vAngle = 0;
	this.attAngle = 0; //attenuation de l'angle, implementation simple d'un SAS. ajouter asservissement plus tard
	this.world = w;
	this.bx = 0;
	this.by = 0;
	this.vx=0;
	this.vy=0;
	//this.vitesse = 0.1;
	//this.clickedObj = null;
	
	this.angleClicked = false;
	
	this.FuelTanks = [];
	this.aEngines = [];
	this.aPieces = [];
	//this.bx = [];
	//this.by = [];
	
	this.updatePiecesPosition = function() {
		var ref = {x:this.cockpit.x, y:this.cockpit.y};
		var refBar = {x:ref.x-this.bx,y:this.by-ref.y};
		
		for(var i = 0 ; i < this.aPieces.length ; i++) {
			var piece =  this.aPieces[i];
			//console.log(piece);
			
			var rho = 0;
			var theta = 0;
			
			//var x = piece.xVess;
			//var y = piece.yVess;
			
			var x = refBar.x - piece.xVess;
			var y = refBar.y - piece.yVess;
		//	//console.log(ref, refBar, x, y,  piece.xVess,  piece.yVess);
			
			if(x == 0 && y == 0) {
			} else {
				rho = Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
				//theta = 2*Math.atan(x,y);
			}
			theta = this.angle+PI/4;

		//	//console.log(this.bx, this.by, piece.xVess, piece.yVess, x, y, rho, theta, piece);
			var cos = Math.floor(rho*Math.cos(theta));
			var sin = Math.floor(rho*Math.sin(theta));
			piece.x = this.bx - cos
			piece.y = this.by - sin

			
			
			////console.log(this.vAngle);
			piece.angle = this.angle;
		}
		
			this.angle+=this.vAngle;
		if(!this.angleClicked) {
			if(this.vAngle > PI/10000)
				this.vAngle-= PI/10240;
			else if(this.vAngle < -PI/10240)
				this.vAngle+= PI/10000;
			else
				this.vAngle = 0;
		}
	};
	
	this.init = function() {
		
	};
	
	this.addPiece = function(piece) {
		this.aPieces.push(piece);
	};
	
	this.removePiece = function(piece) {
		this.aPieces.destroy(piece);
	};
	
	this.addEngine = function(engine) {
		this.aEngines.push(engine);
	};
	
	
	this.removeEngine = function(engine) {
		this.aEngines.destroy(engine);
	};
	
	
	
	/*
	this.pointerBox = function() {
		return [400, 0, gs.width, gs.height];
	};
	
	this.pointerDown = function(i) {
		this.pDown = true;
	}
	
	
	this.pointerUp = function(i) {
		if(this.clickedObj != null)
			this.clickedObj.pDown = false;
		this.clickedObj = null;
	};
	
	this.pointerMove = function() {
		if(this.clickedObj != null) {
			var x = gs.pointerPosition[0];
			var y = gs.pointerPosition[1];
			
			this.clickedObj.setCoord(x, y);
		}
	};
	*/
	//*
	this.keyHeld_39 = function() {	//left
		if(this.vAngle < PI/64)
			this.vAngle += PI/10240;
		
		this.angleClicked = true;
	};
	
	this.keyHeld_37 = function() {	//right
		if(this.vAngle > -PI/64)
			this.vAngle += -PI/10240;
		
		this.angleClicked = true;
	};
	
	this.keyUp_39 = function() {	//right
		this.angleClicked = false;
		
	};
	this.keyUp_37 = function() {	//right
		this.angleClicked = false;
		
	};
	
	this.keyHeld_38 = function() {	//up
	if(this.v < 1) {
		this.v += 0.01;
	}
	
	if(this.cockpit) {
		var cos, sin;
		cos = Math.cos(this.angle+PI/4);
		sin = Math.sin(this.angle+PI/4);
		
		this.vx += 0.01*cos;
		this.vy += 0.01*sin;
	}	
		
		for(var i = 0 ; i < this.aEngines.length ; i++) {
			this.aEngines[i].fire(100);
		}
	};
	
	this.keyHeld_40 = function() {	//down
		
	
	};
	//*/
	
	this.keyDown_107 = function() {
		this.vitesse+=0.1;
	};
	
	this.keyDown_109 = function() {
		this.vitesse-=0.1;
	};
	
	this.update = function() {
				
		if(this.cockpit) {
			
			this.cockpit.x += this.vx;
			this.cockpit.y += this.vy;
		}	
		
			var aBary = [];
			if(this.cockpit != null)
				this.cockpit.getBarycentre(aBary);

			var numx = 0;
			var numy = 0;
			var denom = 0;
			 
			for(var i = 0 ; i < aBary.length ; i++) {
				numx+=(aBary[i].bx * aBary[i].p);
				numy+=(aBary[i].by * aBary[i].p);
				denom+=aBary[i].p;
			}
			
			this.bx = (numx/denom);
			this.by = (numy/denom);
			
			
			
			this.updatePiecesPosition();
			//this.bx.push(numx/denom);
			//this.by.push(numy/denom);
	};
	
	this.draw = function(c,gs) {
		
		/* ligne du barycentre */
		c.beginPath(); 
		c.lineWidth="2";
		c.strokeStyle="green"; // Green path
		
		c.moveTo(this.bx,this.by);
		c.lineTo(this.bx+20,this.by);
		c.lineTo(this.bx-20,this.by);
		c.stroke(); // Draw it
			
		
		/*  vecteur vitesse */
		
		c.beginPath(); 
		c.lineWidth="4";
		c.strokeStyle="blue"; // Green path
		
		c.arc(this.bx+100*this.vx,this.by+100*this.vy,4,0,2*Math.PI);
		c.fill(); // Draw it
		
		
	};
}



