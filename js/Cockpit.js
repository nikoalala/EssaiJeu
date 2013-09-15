function Cockpit(x,y,w,v) {
	this.x = x || 500;
	this.y = y || 500;

	this.csd = 10;
	this.points = [[this.x-this.csd,this.y+this.csd],[this.csd+this.x,this.csd+this.y],[this.csd+this.x,this.y-this.csd],[this.x-this.csd,this.y-this.csd]];
	this.poids = 1;
	this.world = w;
	
	this.xVess = 0;
	this.yVess = 0;
	this.fils = null;
	
	this.vessel = v;
	
	this.angle = PI/4;
	
	this.getFuel = function(val) {
		return 0;
	};
	//*
	this.keyHeld_37 = function() {	//left
		//this.x--;
	};
	
	this.keyHeld_39 = function() {	//right
		//this.x++;
	};	
	
	this.keyHeld_38 = function() {	//up
	//this.y--;
	};

	
	this.keyHeld_40 = function() {	//down
	//	this.y++;
	};
	//*/

	this.isFils = function(thing) {
		return false;
	};
	
	this.getBarycentre = function(aRes) {
			aRes.push({bx:this.x, by:this.y, p:this.poids});
			//if(this.fils != null) return this.fils.getBarycentre(aRes);
			return aRes;
	};
	
	this.pointerBox = function() {
		return [this.x-this.csd, this.y-this.csd, this.x+this.csd, this.y+this.csd];
	};
	
	this.pointerDown = function(i) {
		this.pDown = true;
	
		this.world.clickedObj = this;
	};
	
	this.pointerUpHdl = function() {
		
	};
	
	this.collision = function(aWho) {
		
	};
	
	this.setCoord = function(x,y) {
		this.x = x;
		this.y = y;
	};
	
	this.update = function() {
		var cos = Math.sqrt(2)*this.csd*Math.cos(this.angle);
		var sin = Math.sqrt(2)*this.csd*Math.sin(this.angle);
		this.points = [
		               [(this.x-cos),(this.y-sin)],
		               [(this.x+sin),(this.y-cos)],
		               [(this.x+cos),(this.y+sin)],
		               [(this.x-sin),(this.y+cos)]
		               ];
		
	//	this.points = [[this.x-this.csd,this.y+this.csd],[this.csd+this.x,this.csd+this.y],[this.csd+this.x,this.y-this.csd],[this.x-this.csd,this.y-this.csd]];
		/*
		this.points = [[(this.x-this.csd*cos),(this.y+this.csd*sin)],
		               [(this.csd*sin+this.x),(this.csd*cos+this.y)],
		               [(this.csd*cos+this.x),(this.y-this.csd*sin)],
		               [(this.x-this.csd*sin),(this.y-this.csd*cos)]];
		//*/
		if(this.fils != null) {
			//this.fils.x = this.x;
			//this.fils.y = this.y + this.csd + this.fils.csd;
		}
		
	};
	
	this.draw = function(c,gs) {
		c.strokeStyle = "#dddddd";
    	c.fillStyle = "#5050dd";
    	gs.polygon(this.points, true);
	};
}
