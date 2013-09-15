function Engine(x,y,w) {
	this.x = x || 500;
	this.y = y || 500;
	this.power = 10;
	this.fuelConsumption = 0.1;
	this.csd = 10;
	this.pere = null;
	this.fils = null;
	this.futurPere = null;
	this.points = [[this.x-this.csd,this.y+this.csd],[this.csd+this.x,this.csd+this.y],[this.csd+this.x,this.y-this.csd],[this.x-this.csd,this.y-this.csd]];
	this.poids = 1;
	this.world = w;
	this.pasAngle = PI/32;
	this.angle = PI/4;
	
	this.vessel = null;
	
	this.fire = function(percent) {	//up //percent : pourcentage de poussee
		if(this.pere != null) {
			 if(this.pere.getFuel(this.fuelConsumption) != 0) {
			 
				 var smoke = new Smoke(this.x, this.y , this.angle, 3, this.world);
				 gs.addEntity(smoke);
			 }
		}
	};
	
	/*
	this.keyHeld_37 = function() {	//left
		this.angle+=this.pasAngle;
	};
	
	
	this.keyHeld_38 = function() {	//up
		if(this.pere != null) {
			 if(this.pere.getFuel(this.fuelConsumption) != 0) {
				 var smoke = new Smoke(this.x, this.y + this.csd, 2, this.world);
				 gs.addEntity(smoke);
			 }
		}
	};

	
	this.keyHeld_39 = function() {	//right
		this.angle-=this.pasAngle;
	};				
	
	this.keyHeld_40 = function() {	//down
		
	};
	*/

	this.isFils = function(thing) {
		return false;
	};
	
	this.getBarycentre = function(aRes) {
			aRes.push({bx:this.x, by:this.y, p:this.poids});
			return aRes;
	};
	
	this.pointerBox = function() {
		return [this.x-this.csd, this.y-this.csd, this.x+this.csd, this.y+this.csd];
		//return [this.x-this.csd, this.x+this.csd, this.y+this.csd, this.y+this.csd];
	};
	
	this.pointerDown = function(i) {
		this.pDown = true;
		if(this.pere != null) {
			this.pere.fils = null;
			this.pere = null;
		}
		this.changeVessel(null);	
		this.world.clickedObj = this;
		//console.log("en pdown", this.vessel);
	};
	
	this.pointerUpHdl = function() {
		if(this.futurPere != null) {
			this.pere = this.futurPere;
			this.pere.fils = this;
			this.futurPere = null;
			this.changeVessel(this.pere.vessel);
		}
		//console.log("en pup", this.vessel);
	};
	
	this.changeVessel = function(vess) {
		if(this.vessel != null) {
			this.vessel.removeEngine(this);
			this.vessel.removePiece(this);
		}
		
		this.vessel = vess;
		if(this.vessel != null) {
			this.vessel.addEngine(this);
			this.vessel.addPiece(this);
			if(this.pere) {
				this.xVess = this.pere.xVess;
				this.yVess = this.pere.yVess+this.pere.csd+this.csd;
				
				this.x = this.vessel.cockpit.x+this.xVess;
				this.y = this.vessel.cockpit.y+this.yVess;
			}
		} else if(this.pere != null) {
			
		}
		//console.log("engine change vessel", vess);
		
	};
	
	this.collision = function(aWho) {
		for(var i = 0 ; i < aWho.length ; i++) {
			if(aWho[i] != this) {
				for(var j = 0 ; j < this.points.length ; j++) {
					if(pointInPoly(this.points[j], aWho[i].points)) {
						if(aWho[i].fils == null) {
							this.futurPere = aWho[i];
							return;
						}
					}
				}
			}
		}
		this.futurPere = null;

	
	};
	
	this.setCoord = function(x,y) {
		this.x = x;
		this.y = y;
	};
	
	this.update = function() {
		
		
		if(this.vessel) {
			//this.x = this.vessel.cockpit.x+this.xVess;
			//this.y = this.vessel.cockpit.y+this.yVess;
		} else if(this.pere!=null) {
			this.x = this.pere.x;//+this.pere.csd+this.csd;
			this.y = this.pere.y+this.pere.csd+this.csd;
		}
		
		var cos = Math.sqrt(2)*this.csd*Math.cos(this.angle);
		var sin = Math.sqrt(2)*this.csd*Math.sin(this.angle);
		this.points = [
		               [(this.x-cos),(this.y-sin)],
		               [(this.x+sin),(this.y-cos)],
		               [(this.x+cos),(this.y+sin)],
		               [(this.x-sin),(this.y+cos)]
		               ];
		
		
		
		//this.points = [[this.x-this.csd,this.y+this.csd],[this.csd+this.x,this.csd+this.y],[this.csd+this.x,this.y-this.csd],[this.x-this.csd,this.y-this.csd]];
		
		/*
		this.points = [[(this.x-this.csd*cos),(this.y+this.csd*sin)],
		               [(this.csd*sin+this.x),(this.csd*cos+this.y)],
		               [(this.csd*cos+this.x),(this.y-this.csd*sin)],
		               [(this.x-this.csd*sin),(this.y-this.csd*cos)]];
		//*/
	};
	
	this.draw = function(c,gs) {
		c.strokeStyle = "#0f0f0f";
    	c.fillStyle = "#0f0f0f";
    	gs.polygon(this.points, true);
    	
    	
	};
}
