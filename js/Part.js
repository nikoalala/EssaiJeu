function Part(x,y,w,c) {
	this.x = x || 500;
	this.y = y || 500;
	this.world = w;
	this.color = c;
	
	
	this.power = 10;
	this.fuelConsumption = 1;
	this.csd = 10;
	this.pere = null;
	this.fils = null;
	this.futurPere = null;
	this.points = [[this.x-this.csd,this.y+this.csd],[this.csd+this.x,this.csd+this.y],[this.csd+this.x,this.y-this.csd],[this.x-this.csd,this.y-this.csd]];
	this.poids = 1;
	
	this.pasAngle = PI/32;
	this.angle = PI/4;
	
	this.vessel = null;
	
	

	this.isFils = function(thing) {
		return false;
	};
	
	this.getBarycentre = function(aRes) {
			aRes.push({bx:this.x, by:this.y, p:this.poids});
			return aRes;
	};
	
	this.pointerPoly = function() {
		return this.points;
		//[this.x-this.csd, this.y-this.csd, this.x+this.csd, this.y+this.csd];
		//return [this.x-this.csd, this.x+this.csd, this.y+this.csd, this.y+this.csd];
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
		
		var cos = Math.cos(this.angle);
		var sin = Math.sin(this.angle);
		this.points = [[(this.x-this.csd*cos),(this.y+this.csd*sin)],
		               [(this.csd*sin+this.x),(this.csd*cos+this.y)],
		               [(this.csd*cos+this.x),(this.y-this.csd*sin)],
		               [(this.x-this.csd*sin),(this.y-this.csd*cos)]];
	};
	
	this.draw = function(c,gs) {
		c.strokeStyle = this.color;
    	c.fillStyle = this.color;
    	gs.polygon(this.points, true);
    	
    	
	};
}
