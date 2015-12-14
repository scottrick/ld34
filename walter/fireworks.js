Fireworks.prototype = new Component();
Fireworks.prototype.constructor = Fireworks;

Fireworks.type = "fireworks";

function Fireworks() {
	Component.call(this, Fireworks.type);

	this.min = 0.1;
	this.delay = 0.4;
	this.currentTime = this.delay;
}
