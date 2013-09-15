function Panel(w) {
	this.world = w;
	this.panelWidth = 400;
	this.cockpitNumber = 0;
	this.panelPoints = [[0,0],[this.panelWidth,0],[this.panelWidth,gs.height],[0,gs.height]];
	this.row = 3;
	this.color=["#FF0000", "#00FF00", "#0000FF"];
	this.texts = ["Cockpit", "Fuel", "Engine"];
	
	this.draw = function(c, gs) {
		c.strokeStyle = "#000000";
		//c.fillStyle = "#FF0000";
		for(var i = 1 ; i <= this.row ; i++) {
			c.fillStyle = this.color[i-1];
			var points = [[0,(i-1)*gs.height/this.row],[this.panelWidth,(i-1)*gs.height/this.row],[this.panelWidth,i*gs.height/this.row],[0,i*gs.height/this.row]];
			gs.polygon(points, true);
			c.fillStyle  = "#000000";
			c.font="30px Arial";
			c.fillText(this.texts[i-1],50,(i-1)*gs.height/this.row+50);
		}
		
	};
	
	
	this.pointerBox = function() {
		return [0, 0, this.panelWidth, gs.height];
	};

	this.pointerDown = function(i) {
		if(gs.pointerPosition[1] < gs.height/3) {
			if(this.cockpitNumber < 1) {
				this.cockpitNumber++;
				var vessel = new Vessel();
				var cockpit = new Cockpit(500, gs.pointerPosition[1], this.world, vessel);
				vessel.cockpit = cockpit;
				vessel.addPiece(cockpit);
				this.world.aObjectCollide.push(cockpit);
				this.world.aVessel.push(vessel);
				gs.addEntity(vessel);
				gs.addEntity(cockpit);
			}
		} else if(gs.pointerPosition[1] < 2*gs.height/3 && gs.pointerPosition[1] > gs.height/3) {
			var color = "#aaaaaa";//'rgba('+ Math.floor(255*r.next())+', '+ Math.floor(255*r.next())+', '+ Math.floor(255*r.next())+', 1.0)';
			var fuelTank = new FuelTank(500, gs.pointerPosition[1], this.world, color);
			this.world.aObjectCollide.push(fuelTank);
			this.world.aVessel.push(fuelTank);
			gs.addEntity(fuelTank);
		} else {
			var engine = new Engine(500, gs.pointerPosition[1],w);
			gs.addEntity(engine);
		}
	};
}