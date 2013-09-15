function World() {
	this.x = 0;
	this.y = 0;
	this.vitesse = 0.1;
	this.clickedObj = null;
	
	
	this.aObjectCollide = [];
	this.bx = [];
	this.by = [];
	this.aVessel = [];
	
	var panel = new Panel(this);
	
	this.pDown = false;
	this.init = function() {
		
		gs.addEntity(panel);
	};
	
	
	this.pointerBox = function() {
		return [400, 0, gs.width, gs.height];
	};
	
	/*
	this.pointerDown = function(i) {
		this.pDown = true;
	}
	*/
	
	this.pointerUp = function(i) {
		if(this.clickedObj != null) {
			this.clickedObj.pointerUpHdl(i);
			this.clickedObj.pDown = false;
		}
		this.clickedObj = null;
	};
	
	this.pointerMove = function() {
		if(this.clickedObj != null) {
			var x = gs.pointerPosition[0];
			var y = gs.pointerPosition[1];
			
			this.clickedObj.setCoord(x, y);
		}
	};
	/*
	this.keyHeld_37 = function() {	//left
		if(this.aVessel != null)
			this.aVessel.vx-=this.vitesse;
	}
	
	this.keyHeld_38 = function() {	//up
		if(this.aVessel != null)
			this.aVessel.vy-=this.vitesse;
	}
	
	this.keyHeld_39 = function() {	//right
		if(this.aVessel != null)
			this.aVessel.vx+=this.vitesse;
	}					
	
	this.keyHeld_40 = function() {	//down
		if(this.aVessel != null)
			this.aVessel.vy+=this.vitesse;
	}
	//*/
	
	this.keyDown_107 = function() {
		this.vitesse+=0.1;
	};
	
	this.keyDown_109 = function() {
		this.vitesse-=0.1;
	};
	
	this.update = function() {
		if(this.clickedObj != null) {
			this.clickedObj.collision(this.aObjectCollide);
		}
		/*
		this.bx = [];
		this.by = [];
		for(var v = 0 ; v < this.aVessel.length ; v++) {
			while(this.aVessel[v].pere != null) {
				this.aVessel[v] = this.aVessel[v].pere;
			}
			var aBary = [];
			this.aVessel[v].getBarycentre(aBary);

			var numx = 0;
			var numy = 0;
			var denom = 0;
			
			for(var i = 0 ; i < aBary.length ; i++) {
				numx+=(aBary[i].bx * aBary[i].p);
				numy+=(aBary[i].by * aBary[i].p);
				denom+=aBary[i].p;
			}
			
			this.bx.push(numx/denom);
			this.by.push(numy/denom);
		}
		//*/
	};
	
	this.draw = function(c,gs) {
		gs.clear();
		gs.background('rgba(255, 255, 255, 1.0)');
	
		/*
		c.beginPath(); 
		c.lineWidth="2";
		c.strokeStyle="green"; // Green path
		
		for(var i = 0 ; i < this.bx.length ; i++) {
			c.moveTo(this.bx[i],this.by[i]);
			c.lineTo(this.bx[i]+20,this.by[i]);
			c.lineTo(this.bx[i]-20,this.by[i]);
			c.stroke(); // Draw it
		}
		*/
		
	};
}



