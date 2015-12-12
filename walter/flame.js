Flame.prototype = new Component();
Flame.prototype.constructor = Flame;

Flame.type = "flame";

Flame.minLife = 0.2;
Flame.lifeRandom = 0.6;

function Flame(scale) {
	Component.call(this, Flame.type);

	this.startingScale = scale;
	this.randomLife();
}

Flame.prototype.randomLife = function() {
	this.life = Flame.minLife + Math.random() * Flame.lifeRandom;
	this.maxLife = this.life;
}
