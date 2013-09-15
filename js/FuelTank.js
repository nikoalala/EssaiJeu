 function FuelTank(x, y, w, color) {
	/*const*/ this.fuelMax = 1000;
	/*const*/ this.csd = 10;
	/*const*/ this.poidsVide = 0.1;
	this.x = x || 500;
	this.y = y || 100;
	
	//this.valChanged = false;
	
	this.xVess = 0;
	this.yVess = 0;
	
	this.world = w;
	
	this.angle = PI/4;
	this.vessel;
	
	this.color = color;
	this.pDown = false;
	
	this.vx = 0;
	this.vy = 0;
	
	this.pere = null;
	
	this.fils = null;
	this.barycentre = {bx:0,by:0,p:0};
	
	this.fuelFlow = 1;//r.next()*2;
	this.fuel = 100;
	this.poidsActuel = 1.1;
	
	this.points = [[this.x-this.csd,this.y+this.csd],[this.csd+this.x,this.csd+this.y],[this.csd+this.x,this.y-this.csd],[this.x-this.csd,this.y-this.csd]];
	
	this.getBarycentre = function(aRes) {
		var fuelInst = this.fuel/this.fuelMax;
		var byfuel = (this.y+((1-fuelInst)*this.csd)); //barycentre du fuel
		var byVide = this.y; //barycentre du fueltank vide
		
		
		this.barycentre = {bx:this.x,
				by:(byVide*this.poidsVide + byfuel * fuelInst)/(fuelInst+this.poidsVide), 
				p:this.poidsActuel}//barycentre entre fuel et fueltank
	
		this.poidsActuel = fuelInst + this.poidsVide;
		
		aRes.push(this.barycentre);

		if(this.fils != null)
			return this.fils.getBarycentre(aRes);

		return aRes;
	};
	
	this.getFuel = function(val) {
		if(this.pere != null) {
			this.fuel+=this.pere.getFuel(val);
		}
		
		if(this.fuel >= val) {
			this.fuel-=val;
			return val;
		}
		
		return 0;
	};
	
	this.update = function() {
		
		
		if(this.vessel && !this.valChanged) {
			//this.x = this.vessel.cockpit.x+this.xVess;
			//this.y = this.vessel.cockpit.y+this.yVess;
		} else if(this.pere!=null) {
			this.x = this.pere.x;//+this.pere.csd+this.csd;
			this.y = this.pere.y+this.pere.csd+this.csd;
		}
		
	//	this.points = [[this.x-this.csd,this.y+this.csd],[this.csd+this.x,this.csd+this.y],[this.csd+this.x,this.y-this.csd],[this.x-this.csd,this.y-this.csd]];
		
		//*
	
		var cos = Math.sqrt(2)*this.csd*Math.cos(this.angle);
		var sin = Math.sqrt(2)*this.csd*Math.sin(this.angle);
		this.points = [
		               [(this.x-cos),(this.y-sin)],
		               [(this.x+sin),(this.y-cos)],
		               [(this.x+cos),(this.y+sin)],
		               [(this.x-sin),(this.y+cos)]
		               ];
	//	console.log(this.angle);
		
		//*/
    	//this.x+=this.vx;
    	//this.y+=this.vy;
		//this.points = [[this.x-this.csd,this.y+this.csd],[this.csd+this.x,this.csd+this.y],[this.csd+this.x,this.y-this.csd],[this.x-this.csd,this.y-this.csd]];
		if(this.fils != null) {
			//this.fils.x = this.x;
			//this.fils.y = this.y + this.csd + this.fils.csd;
		}
	};

	
	this.pointerBox = function() {
		return [this.x-this.csd, this.y-this.csd, this.x+this.csd, this.y+this.csd];
	};
	
	this.pointerDown = function(i) {
		this.pDown = true;
		if(this.pere != null) {
			this.pere.fils = null;
			this.pere = null;
		}
		this.world.clickedObj = this;
		console.log("ft pdown", this.vessel);
	};
	
	this.pointerUpHdl = function() {
		if(this.futurPere != null) {
			this.pere = this.futurPere;
			this.pere.fils = this;
			this.futurPere = null;
			
			this.changeVessel(this.pere.vessel);
			
			//if(this.world.aVessel.indexOf(this) != -1)
			//	this.world.aVessel.splice(this.world.aVessel.indexOf(this),1); //a refaire avec debris
		} else {
			//if(this.world.aVessel.indexOf(this) == -1)
			//	this.world.aVessel.push(this);
			
			
			this.changeVessel(null);
		}
		console.log("ft pup", this.vessel);
	};
	
	this.changeVessel = function(vess) {
		if(this.vessel != null) {
			this.vessel.removePiece(this);
			console.log("fuel remove piece")
		}
		
		this.vessel = vess;
		if(this.vessel != null) {
			this.vessel.addPiece(this);
			if(this.pere) {
				this.xVess = this.pere.xVess;
				this.yVess = this.pere.yVess+this.pere.csd+this.csd;
				
				this.x = this.vessel.cockpit.x+this.xVess;
				this.y = this.vessel.cockpit.y+this.yVess;
			}
			console.log("fuel add piece")
		}
		if(this.fils != null) this.fils.changeVessel(vess);
	};
	
	this.isFils = function(thing) {
		if(this.fils == null)
			return false;
		if(thing == this.fils)
			return true;
		return this.fils.isFils(thing);
	};
	
	this.collision = function(aWho) {
		for(var i = 0 ; i < aWho.length ; i++) {
			if(aWho[i] != this) {
				for(var j = 0 ; j < this.points.length ; j++) {
					if(pointInPoly(this.points[j], aWho[i].points)) {
						if(aWho[i].fils == null) {
							if(this.pere == null && this.isFils(aWho[i]) == false) {
								this.futurPere = aWho[i];
								return;
							}
						}
					}
				}
			}
		}
	};
	
	this.setCoord = function(x,y) {
		this.x = x;
		this.y = y;
	};
	
    this.draw = function(c, gs) {
    	c.strokeStyle = "#101010";//this.color;
    	c.fillStyle = this.color;
    	gs.polygon(this.points, true);

    	c.strokeStyle = "#ff0000";
    	c.fillStyle = "#ff0000";
    	gs.polygon([[this.barycentre.bx-1,this.barycentre.by+1],[1+this.barycentre.bx,1+this.barycentre.by],[1+this.barycentre.bx,this.barycentre.by-1],[this.barycentre.bx-1,this.barycentre.by-1]], true);
    	
    };
}