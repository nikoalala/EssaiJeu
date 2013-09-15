var smokeStrength = [];
for (var r=0; r<50; r++) {
	smokeStrength[r] = 'rgba(204, 50, 50, ' + (r/50) + ')';
}
	
function Smoke(x, y, a, s, w) {
	this.x = x;
	this.y = y;
	this.angle = a;
	this.world = w;
	this.life = 5.0;
	this.speed = s;
	
	
	
	this.draw = function(c) {
		c.strokeStyle = smokeStrength[Math.floor(this.life * 10)];
		c.beginPath();
		c.arc(this.x, this.y, 2, 0, 2*Math.PI, true);
		c.closePath();
		c.stroke();
	}
	
	this.update = function() {
		this.life -= 0.08;
		if (this.life < 0)
		{
			gs.delEntity(this);
			this.life = 0.01;
		} else {
		
			cos = Math.cos(this.angle-3*PI/4);
			sin = Math.sin(this.angle-3*PI/4);

			this.x+=cos*this.speed
			this.y+=sin*this.speed;
		}
	}
}











